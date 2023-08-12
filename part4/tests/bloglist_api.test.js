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
    describe('fetching blogs with GET', () => {
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
    })

    describe('adding blogs through POST', () => {
        test('blogs can be added through POST', async () => {
            const newBlogObject = {
                title: "blogi4",
                author: "kirjoittaja4",
                url: "https://www.blogi4.fi/",
                likes: 4
            }

            await api
                .post('/api/blogs')
                .send(newBlogObject)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDB()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        })

        test('blogs are given default likes of 0', async () => {
            const newBlogObject = {
                author: "kirjoittajaX",
                title: "blogiX",
                url: "https://www.blogiX.fi/"
            }

            await api
                .post('/api/blogs')
                .send(newBlogObject)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDB()
            expect(blogsAtEnd[helper.initialBlogs.length].likes).toEqual(0)
        })

        test('blog missing title value is not added', async () => {
            const newBlogObject = {
                author: "kirjoittaja4",
                likes: 4,
                url: "https://www.blogi4.fi/"
            }

            await api
                .post('/api/blogs')
                .send(newBlogObject)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDB()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })

        test('blog missing url value is not added', async () => {
            const newBlogObject = {
                author: "kirjoittaja5",
                likes: 5,
                title: "blogi5",
            }

            await api
                .post('/api/blogs')
                .send(newBlogObject)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDB()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})