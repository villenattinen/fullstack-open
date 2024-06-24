import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLoggedInUser, logoutUser } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/userReducer'
import Login from './components/Login'
import MainPage from './components/MainPage'
import Notification from './components/Notification'
import UserList from './components/UserList'
import UserView from './components/UserView'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initializeLoggedInUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setNotification(`Bye, ${user.name}!`, 'success', 5))
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <div>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserView />} />
      </Routes>
    </div>
  )
}

export default App
