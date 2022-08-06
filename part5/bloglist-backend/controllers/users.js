const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', { url: 1, title: 1, author: 1 })

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const body = request.body

    if (body.password.length < 3) {
        return response.status(400).json({ error: 'password too short, minimum size = 3' })
    } else {
        const saltRounds = bcrypt.genSaltSync(10)
        const passwordHash = await bcrypt.hashSync(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })

        const savedUser = await user.save()
        response.json(savedUser)
    }
})

module.exports = usersRouter