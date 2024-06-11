import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [isExtended, setIsExtended] = useState(false)

  const updateLikes = () => {
    const updatedBlog = {...blog, likes: blog.likes + 1}
    updateBlog(blog.id, updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        {!isExtended && <button onClick={() => (setIsExtended(!isExtended))}>view</button>}
      </div>
      {isExtended && 
        <div>
          {blog.url}
          <br />
          likes {blog.likes}
          <button onClick={updateLikes}>like</button>
          <br />
          {blog.user?.name}
          <br />
          <button onClick={() => (setIsExtended(!isExtended))}>hide</button>
        </div>
      }
    </div>
  )
}

export default Blog