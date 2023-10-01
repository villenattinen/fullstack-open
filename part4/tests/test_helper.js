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

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
  }

module.exports = {
    initialBlogs, initialUsers, blogsInDb, usersInDb
}