import { useDispatch } from 'react-redux'
import { Button } from '@blueprintjs/core'
import styled from 'styled-components'
import { updateBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const BlogLikes = ({ blog }) => {
  const dispatch = useDispatch()

  const handleVote = async (blog) => {
    console.log('updating', blog)
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(updateBlog(blog.id, updatedBlog))
    dispatch(setNotification(`You liked ${updatedBlog.title}`, 'success', 5))
  }

  return (
    <DivWithMargin>
      {blog.likes} likes
      <Button
        icon="thumbs-up"
        text="Like"
        style={{ marginLeft: 3 }}
        onClick={() => handleVote(blog)}
      />
    </DivWithMargin>
  )
}

const DivWithMargin = styled.div`
  margin-top: 5px;
  margin-bottom: 5px;
`

export default BlogLikes
