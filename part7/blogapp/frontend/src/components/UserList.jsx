import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Card } from '@blueprintjs/core'

const UserList = () => {
  const users = useSelector((state) => state.users)

  if (!users) {
    return null
  }

  return (
    <div>
      <Card>
        <h2>Users</h2>
        <Card>
          <table>
            <thead>
              <tr>
                <th />
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </Card>
    </div>
  )
}

export default UserList
