import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)
  const blogs = useSelector((state) => state.blogs)
  const id = useParams().id
  const blog = blogs.find((blog) => blog.id === id)

  if (!user || !blog) {
    return null
  }

  const handleVote = async (blog) => {
    console.log('updating', blog)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(blog.id, updatedBlog))
    dispatch(setNotification(`You liked ${updatedBlog.title}`, 'success', 5))
  }

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog.id))
      dispatch(
        setNotification(
          `Blog ${blog.title}, by ${blog.author} removed`,
          'success',
          5
        )
      )
    }
  }

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const canRemove = blog.user ? blog.user.username === user.username : true

  console.log(blog.user, user.username, canRemove)

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes
          <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
            like
          </button>
        </div>
        <div>added by {nameOfUser}</div>
        {canRemove && (
          <button onClick={() => handleDelete(blog)}>remove</button>
        )}
      </div>
      {blog.comments.length > 0 && (
        <div>
          <h3>comments</h3>
          <ul>
            {blog.comments?.map((comment, index) => (
              <li key={index}>{comment}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Blog
