import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const NavigationMenu = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setNotification(`Bye, ${user.name}!`, 'success', 5))
  }

  const styleNavigationMenu = {
    backgroundColor: 'lightgray',
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={styleNavigationMenu}>
      <Link style={{ marginRight: 5 }} to="/">
        blogs
      </Link>
      <Link style={{ marginRight: 5 }} to="/users">
        users
      </Link>
      {user.name} logged in
      <button style={{ marginLeft: 5 }} onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default NavigationMenu
