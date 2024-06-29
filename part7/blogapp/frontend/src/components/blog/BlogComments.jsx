import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button, H3 } from '@blueprintjs/core'
import styled from 'styled-components'
import { commentBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const BlogComments = ({ blog }) => {
  const [comment, setComment] = useState('')
  const isCommentEmpty = comment === ''
  const dispatch = useDispatch()

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    dispatch(setNotification(`You commented ${comment}`, 'success', 5))
    setComment('')
  }

  return (
    <DivWithMargin>
      <H3>Comments</H3>
      <form onSubmit={handleCommentSubmit}>
        <input value={comment} onChange={handleCommentChange} />
        <Button type="submit" disabled={isCommentEmpty} icon="comment">
          Add comment
        </Button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </DivWithMargin>
  )
}

const DivWithMargin = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`

export default BlogComments
