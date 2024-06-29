import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, Card } from '@blueprintjs/core'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const NewBlog = () => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const isSubmittable = title && url && author

  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createBlog({ title, url, author }))
    dispatch(setNotification(`Blog created: ${title}, ${author}`, 'success', 5))
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <Card>
      <h2>Create a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            data-testid="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label>URL:</label>
          <input
            type="text"
            data-testid="url"
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            data-testid="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <Button
          type="submit"
          intent="success"
          icon="add"
          disabled={!isSubmittable}
        >
          Create
        </Button>
      </form>
    </Card>
  )
}

export default NewBlog
