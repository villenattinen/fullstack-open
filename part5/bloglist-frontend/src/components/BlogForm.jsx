import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    })
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            value={newBlogTitle}
            onChange={({ target }) => setNewBlogTitle(target.value)}
            name='title'
          />
        </div>
        <div>
          author:
          <input
            value={newBlogAuthor}
            onChange={({ target }) => setNewBlogAuthor(target.value)}
            name='author'
          />
        </div>
        <div>
          url:
          <input
            value={newBlogUrl}
            onChange={({ target }) => setNewBlogUrl(target.value)}
            name='url'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm