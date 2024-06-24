import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogStyle = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle} className="blog">
          <Link
            to={`/blogs/${blog.id}`}
          >{`${blog.title} by ${blog.author}`}</Link>
        </div>
      ))}
    </div>
  )
}

export default BlogList
