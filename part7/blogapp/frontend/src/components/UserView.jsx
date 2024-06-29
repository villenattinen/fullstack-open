import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Card } from '@blueprintjs/core'

const UserView = () => {
  const users = useSelector((state) => state.users)
  const userId = useParams().id

  if (!users) {
    return null
  }

  const user = users.find((user) => user.id === userId)

  return (
    <Card>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <Card>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))}
        </ul>
      </Card>
    </Card>
  )
}

export default UserView
