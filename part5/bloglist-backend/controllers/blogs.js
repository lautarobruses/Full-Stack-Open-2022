const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })

    response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog ({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes ? body.likes : 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id)

    if (!blogToDelete ) {
        return response.status(204).end()
    }

    const user = request.user

    if (blogToDelete.user.toString() !== user.id.toString()) {
        return response.status(401).json({ error: 'only the creator can delete a blog' })
    }

    await Blog.findByIdAndRemove(request.params.id)
    user.blogs = await user.blogs.filter(blog => blog._id.toString() !== request.params.id)
    await user.save()

    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true, runValidators: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter