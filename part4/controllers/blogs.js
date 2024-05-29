const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { requestLogger } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    try {
        const blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: request.body.likes,
            user: request.body.user._id,
        })

        const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
        response.status(201).json(savedBlog)
    } catch(exception) {
        response.status(400).end()
    }
	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET)
		if (!decodedToken.id) {
			return response.status(401).json({ error: 'token invalid' })
		}

		const user = await User.findById(decodedToken.id)
		const blog = new Blog(
			{
				title: request.body.title,
				author: request.body.author,
				url: request.body.url,
				likes: request.body.likes,
				user: user._id,
			}
		)
		const savedBlog = await blog.save()

		response.status(201).json(savedBlog)
	} catch(exception) {
		response.status(400).json({ error: exception }).end()
	}
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body
    const updatedPerson = await Blog
        .findByIdAndUpdate(
            request.params.id,
            { title, author, url, likes },
            { new: true, runValidators: true, context: 'query' }
        )
    response.json(updatedPerson)
})

module.exports = blogsRouter
