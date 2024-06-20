import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  console.log('blogs', blogs)

  const dispatch = useDispatch()

  const handleVote = async (blog) => {
    console.log('updating', blog)
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    })

    dispatch(setNotification(`You liked ${updatedBlog.title}`, 'success', 5))
    setBlogs(blogs.map((b) => (b.id === blog.id ? updatedBlog : b)))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter((b) => b.id !== blog.id))
      dispatch(
        setNotification(
          `Blog ${blog.title}, by ${blog.author} removed`,
          'success',
          5
        )
      )
    }
  }

  const byLikes = (a, b) => b.likes - a.likes

  return (
    <div>
      {[...blogs].sort(byLikes).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleVote={handleVote}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}

export default BlogList
