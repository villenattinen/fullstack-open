const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        author: "kirjoittaja1",
        likes: 1,
        title: "blogi1",
        url: "https://www.blogi1.fi/",
    },
    {
        author: "kirjoittaja2",
        likes: 2,
        title: "blogi2",
        url: "https://www.blogi2.fi/",
    },
    {
        author: "kirjoittaja3",
        likes: 3,
        title: "blogi3",
        url: "https://www.blogi3.fi/",
    },
]

const initialUsers = [
    {
        username: "käyttäjä1",
        name: "matti",
        password: "salasana"
    },
    {
        username: "käyttäjä2",
        name: "mikko",
        password: "salis"
    }
]

const expiredToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJvb3QiLCJpZCI6IjY2NWUwOWNjNDY1ZmM0NDg3N2Q0NDllMiIsImlhdCI6MTcxNzQzODkyNSwiZXhwIjoxNzE3NDQyNTI1fQ.D4jZKXSc7vq6kJ7efKba4K0sH-OsHjuDQ_xM25Utzm4"

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

module.exports = {
    initialBlogs, initialUsers, expiredToken, blogsInDb, usersInDb
}