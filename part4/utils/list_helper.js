const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((summedLikes, currentBlog) => summedLikes + currentBlog.likes, 0)
}

module.exports = {
    dummy,
    totalLikes
}
