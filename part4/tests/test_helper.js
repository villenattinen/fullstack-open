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

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDB
}