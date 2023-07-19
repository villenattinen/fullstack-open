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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}
