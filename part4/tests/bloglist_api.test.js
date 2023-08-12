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
            expect(blogsAtEnd).not.toContain(newBlogObject)
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
            expect(blogsAtEnd).not.toContain(newBlogObject)
        })
    })

    describe('deleting blogs', () => {
        test('a blog can be deleted', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToDelete = blogsAtStart[0]
          
            await api
              .delete(`/api/blogs/${blogToDelete.id}`)
              .expect(204)
          
            const blogsAtEnd = await helper.blogsInDB()
          
            expect(blogsAtEnd).toHaveLength(
              helper.initialBlogs.length - 1
            )
            expect(blogsAtEnd).not.toContain(blogToDelete)
          })
    })

    describe('mutating blogs', () => {
        test('title of a blog can be edited', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToEdit = blogsAtStart[0]

            const editedBlogObject = {
                title: "muutettu title",
            }

            await api
              .put(`/api/blogs/${blogToEdit.id}`)
              .send(editedBlogObject)
              .expect(200)
          
            const blogsAtEnd = await helper.blogsInDB()

            expect(blogsAtEnd[0].title).not.toEqual(blogToEdit.title)
            expect(blogsAtEnd[0].title).toEqual(editedBlogObject.title)
        })

        test('url of a blog can be edited', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToEdit = blogsAtStart[0]

            const editedBlogObject = {
                url: "uusimuutettuurl.fi/",
            }

            await api
              .put(`/api/blogs/${blogToEdit.id}`)
              .send(editedBlogObject)
              .expect(200)
          
            const blogsAtEnd = await helper.blogsInDB()

            expect(blogsAtEnd[0].url).not.toEqual(blogToEdit.url)
            expect(blogsAtEnd[0].url).toEqual(editedBlogObject.url)
        })

        test('author of a blog can be edited', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToEdit = blogsAtStart[0]

            const editedBlogObject = {
                author: "eri kirjoittaja",
            }

            await api
              .put(`/api/blogs/${blogToEdit.id}`)
              .send(editedBlogObject)
              .expect(200)
          
            const blogsAtEnd = await helper.blogsInDB()

            expect(blogsAtEnd[0].author).not.toEqual(blogToEdit.author)
            expect(blogsAtEnd[0].author).toEqual(editedBlogObject.author)
        })

        test('likes of a blog can be edited', async () => {
            const blogsAtStart = await helper.blogsInDB()
            const blogToEdit = blogsAtStart[0]

            const editedBlogObject = {
                likes: blogToEdit.likes + 1,
            }

            await api
              .put(`/api/blogs/${blogToEdit.id}`)
              .send(editedBlogObject)
              .expect(200)
          
            const blogsAtEnd = await helper.blogsInDB()

            expect(blogsAtEnd[0].likes).not.toEqual(blogToEdit.likes)
            expect(blogsAtEnd[0].likes).toEqual(editedBlogObject.likes)
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})