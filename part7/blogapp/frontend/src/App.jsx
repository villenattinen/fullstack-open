import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeLoggedInUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import Blog from './components/Blog'
import Login from './components/Login'
import MainPage from './components/MainPage'
import NavigationMenu from './components/NavigationMenu'
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

  if (!user) {
    return (
      <div>
        <h2>blog app</h2>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <NavigationMenu />
      <h2>blog app</h2>
      <Notification />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserView />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>
  )
}

export default App
