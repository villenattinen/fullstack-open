import { useState } from 'react'

const Blog = ({ blog, username, updateBlog, deleteBlog }) => {
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

  const removeBlog = () => {
    deleteBlog(blogObject)
  }

  const toggleVisibility = () => {
    setIsExtended(!isExtended)
  }

  const buttonLabel = isExtended ? 'hide' : 'view'

  return (
    <div style={blogStyle}>
      <div>
        {blogObject.title} {blogObject.author}
        {<button onClick={toggleVisibility}>{buttonLabel}</button>}
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
          {username === blogObject.user?.username && 
            <button style={{backgroundColor:"red"}} onClick={removeBlog}>remove</button>
          }
        </div>
      }
    </div>
  )
}

export default Blog