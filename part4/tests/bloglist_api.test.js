const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog))
    const promiseArrayBlogs = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArrayBlogs)
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
          const usersAtStart = await helper.usersInDb()
            const newBlogObject = {
                title: "blogi4",
                author: "kirjoittaja4",
                url: "https://www.blogi4.fi/",
                likes: 4,
                user: usersAtStart[0]
            }

            await api
                .post('/api/blogs')
                .send(newBlogObject)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        })

        test('blogs are given default likes of 0', async () => {
          const usersAtStart = await helper.usersInDb()
            const newBlogObject = {
                author: "kirjoittajaX",
                title: "blogiX",
                url: "https://www.blogiX.fi/",
                user: usersAtStart[0]
            }

            await api
                .post('/api/blogs')
                .send(newBlogObject)
                .expect(201)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd[helper.initialBlogs.length].likes).toEqual(0)
        })

        test('blog missing title value is not added', async () => {
          const usersAtStart = await helper.usersInDb()
            const newBlogObject = {
                author: "kirjoittaja4",
                likes: 4,
                url: "https://www.blogi4.fi/",
                user: usersAtStart[0]
            }

            await api
                .post('/api/blogs')
                .send(newBlogObject)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
            expect(blogsAtEnd).not.toContain(newBlogObject)
        })

        test('blog missing url value is not added', async () => {
          const usersAtStart = await helper.usersInDb()
            const newBlogObject = {
                author: "kirjoittaja5",
                likes: 5,
                title: "blogi5",
                user: usersAtStart[0]
            }

            await api
                .post('/api/blogs')
                .send(newBlogObject)
                .expect(400)

            const blogsAtEnd = await helper.blogsInDb()
            expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
            expect(blogsAtEnd).not.toContain(newBlogObject)
        })
    })

    describe('deleting blogs', () => {
        test('a blog can be deleted', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToDelete = blogsAtStart[0]
          
            await api
              .delete(`/api/blogs/${blogToDelete.id}`)
              .expect(204)
          
            const blogsAtEnd = await helper.blogsInDb()
          
            expect(blogsAtEnd).toHaveLength(
              helper.initialBlogs.length - 1
            )
            expect(blogsAtEnd).not.toContain(blogToDelete)
          })
    })

    describe('mutating blogs', () => {
        test('title of a blog can be edited', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToEdit = blogsAtStart[0]

            const editedBlogObject = {
                title: "muutettu title",
            }

            await api
              .put(`/api/blogs/${blogToEdit.id}`)
              .send(editedBlogObject)
              .expect(200)
          
            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd[0].title).not.toEqual(blogToEdit.title)
            expect(blogsAtEnd[0].title).toEqual(editedBlogObject.title)
        })

        test('url of a blog can be edited', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToEdit = blogsAtStart[0]

            const editedBlogObject = {
                url: "uusimuutettuurl.fi/",
            }

            await api
              .put(`/api/blogs/${blogToEdit.id}`)
              .send(editedBlogObject)
              .expect(200)
          
            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd[0].url).not.toEqual(blogToEdit.url)
            expect(blogsAtEnd[0].url).toEqual(editedBlogObject.url)
        })

        test('author of a blog can be edited', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToEdit = blogsAtStart[0]

            const editedBlogObject = {
                author: "eri kirjoittaja",
            }

            await api
              .put(`/api/blogs/${blogToEdit.id}`)
              .send(editedBlogObject)
              .expect(200)
          
            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd[0].author).not.toEqual(blogToEdit.author)
            expect(blogsAtEnd[0].author).toEqual(editedBlogObject.author)
        })

        test('likes of a blog can be edited', async () => {
            const blogsAtStart = await helper.blogsInDb()
            const blogToEdit = blogsAtStart[0]

            const editedBlogObject = {
                likes: blogToEdit.likes + 1,
            }

            await api
              .put(`/api/blogs/${blogToEdit.id}`)
              .send(editedBlogObject)
              .expect(200)
          
            const blogsAtEnd = await helper.blogsInDb()

            expect(blogsAtEnd[0].likes).not.toEqual(blogToEdit.likes)
            expect(blogsAtEnd[0].likes).toEqual(editedBlogObject.likes)
        })
    })

    describe('when there is initially one user at db', () => {
        beforeEach(async () => {
          await User.deleteMany({})
      
          const passwordHash = await bcrypt.hash('sekret', 10)
          const user = new User({ username: 'root', passwordHash })
      
          await user.save()
        })
      
        test('creation succeeds with a fresh username', async () => {
          const usersAtStart = await helper.usersInDb()
      
          const newUser = {
            username: 'kayttaja',
            name: 'Etunimi Sukunimi',
            password: 'huippu_salainen',
          }
      
          await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
      
          const usersAtEnd = await helper.usersInDb()
          expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
      
          const usernames = usersAtEnd.map(user => user.username)
          expect(usernames).toContain(newUser.username)
        })

        test('creation fails with proper statuscode and message if username already taken', async () => {
            const usersAtStart = await helper.usersInDb()
        
            const newUser = {
              username: 'root',
              name: 'Superuser',
              password: 'salainen',
            }
        
            const result = await api
              .post('/api/users')
              .send(newUser)
              .expect(400)
              .expect('Content-Type', /application\/json/)
        
            expect(result.body.error).toContain('expected `username` to be unique')
        
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test('creation fails with proper statuscode if username is missing', async () => {
            const usersAtStart = await helper.usersInDb()
        
            const newUser = {
              name: 'name',
              password: 'pass',
            }
        
            const result = await api
              .post('/api/users')
              .send(newUser)
              .expect(400)
              .expect('Content-Type', /application\/json/)
        
            expect(result.body.error).toContain('User validation failed: username: Path `username` is required.')
        
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test('creation fails with proper statuscode if password is missing', async () => {
            const usersAtStart = await helper.usersInDb()
        
            const newUser = {
              username: 'user',
              name: 'name',
            }
        
            const result = await api
              .post('/api/users')
              .send(newUser)
              .expect(400)
              .expect('Content-Type', /application\/json/)
        
            expect(result.body.error).toContain('password must be at least 3 characters long')
        
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })

        test('creation fails with proper statuscode if password is too short', async () => {
            const usersAtStart = await helper.usersInDb()
        
            const newUser = {
              username: 'user',
              name: 'name',
              password: '12',
            }
        
            const result = await api
              .post('/api/users')
              .send(newUser)
              .expect(400)
              .expect('Content-Type', /application\/json/)
        
            expect(result.body.error).toContain('password must be at least 3 characters long')
        
            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length)
        })
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})