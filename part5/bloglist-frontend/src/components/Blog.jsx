import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogObject, setBlogObject] = useState(blog)
  const [isExtended, setIsExtended] = useState(false)

  const updateLikes = () => {
    const updatedBlog = ({...blogObject, likes: blogObject.likes + 1})
    updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blogObject.title} {blogObject.author}
        {!isExtended && <button onClick={() => (setIsExtended(!isExtended))}>view</button>}
      </div>
      {isExtended && 
        <div>
          {blogObject.url}
          <br />
          likes {blogObject.likes}
          <button onClick={updateLikes}>like</button>
          <br />
          {blogObject.user?.name}
          <br />
          <button onClick={() => (setIsExtended(!isExtended))}>hide</button>
        </div>
      }
    </div>
  )
}

export default Blog