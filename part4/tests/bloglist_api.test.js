const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('there is the right number of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(3)
})

test('blogs have \'id\' as identifier', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((body) => {
        expect(body.id).toBeDefined()
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})