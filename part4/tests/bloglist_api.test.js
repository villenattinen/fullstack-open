const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        author: "kirjoittaja1",
        likes: 1,
        title: "blogi1",
        url: "https://www.blogi1.fi/"
    },
    {
        author: "kirjoittaja2",
        likes: 2,
        title: "blogi2",
        url: "https://www.blogi2.fi/"
    },
    {
        author: "kirjoittaja3",
        likes: 3,
        title: "blogi3",
        url: "https://www.blogi3.fi/"
    },
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()
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

        expect(response.body).toHaveLength(initialBlogs.length)
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
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(initialBlogs.length + 1)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})