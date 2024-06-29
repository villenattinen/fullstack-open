import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Classes, H5, Intent, Popover } from '@blueprintjs/core'
import { deleteBlog } from '../../reducers/blogReducer'
import { setNotification } from '../../reducers/notificationReducer'

const BlogDelete = ({ blog, user }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const canRemove = blog.user ? blog.user.username === user.username : true

  const handleDelete = async () => {
    dispatch(deleteBlog(blog.id))
    dispatch(
      setNotification(
        `Blog ${blog.title}, by ${blog.author} removed`,
        'success',
        5
      )
    )
    navigate('/')
  }

  const PopoverContent = () => {
    return (
      <div key="text" style={{ margin: 15 }}>
        <H5>Confirm deletion</H5>
        <p>{`Remove blog ${blog.title} by ${blog.author}`}</p>
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 15 }}
        >
          <Button
            className={Classes.POPOVER_DISMISS}
            style={{ marginRight: 10 }}
            text="Cancel"
          />
          <Button intent={Intent.DANGER} text="Delete" onClick={handleDelete} />
        </div>
      </div>
    )
  }

  console.log(blog.user, user.username, canRemove)
  return (
    <div>
      {canRemove && (
        <Popover content={PopoverContent()} style={{ padding: 10 }} hasBackdrop>
          <Button intent={Intent.DANGER} icon="trash" text="Remove" />
        </Popover>
      )}
    </div>
  )
}

export default BlogDelete
