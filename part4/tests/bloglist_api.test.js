const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('API operations', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there is the right number of blogs', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs have \'id\' as identifier', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach((body) => {
            expect(body.id).toBeDefined()
        })
    })

    test('blogs can be added through POST', async () => {
        const newBlogObject = new Blog(
            {
                author: "kirjoittaja4",
                likes: 4,
                title: "blogi4",
                url: "https://www.blogi4.fi/"
            }
        )
        await api
            .post('/api/blogs')
            .send(newBlogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('blogs are given default likes of 0', async () => {
        const newBlogObject = new Blog(
            {
                author: "kirjoittajaX",
                title: "blogiX",
                url: "https://www.blogiX.fi/"
            }
        )
        await api
            .post('/api/blogs')
            .send(newBlogObject)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd[helper.initialBlogs.length].likes).toEqual(0)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})