const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((summedLikes, currentBlog) => summedLikes + currentBlog.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((previousBlog, currentBlog) => {
        return (previousBlog.likes > currentBlog.likes) ? previousBlog : currentBlog
    }, blogs[0])
}

const mostBlogs = (blogs) => {
    const counter = {}

    blogs.forEach(blog => {
        if (counter[blog.author]) {
            counter[blog.author] += 1
        } else {
            counter[blog.author] = 1
        }
    })

    const value = Math.max(...Object.values(counter))
    const key = Object.keys(counter).find(key => counter[key] === value)
    return {
        author: key,
        numberOfBlogs: value,
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}
