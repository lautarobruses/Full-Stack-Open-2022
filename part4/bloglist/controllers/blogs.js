const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const blog = new Blog ({
        tittle: body.tittle,
        author: body.author,
        url: body.url,
        likes: body.likes
    })

    const savedBlog = blog.save()
    response.json(savedBlog)
})

module.exports = blogsRouter