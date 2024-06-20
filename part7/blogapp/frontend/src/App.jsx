import { useState, useEffect, createRef } from 'react'
import { useDispatch } from 'react-redux'
import loginService from './services/login'
import storage from './services/storage'
import Login from './components/Login'
import BlogList from './components/BlogList'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const user = storage.loadUser()
    if (user) {
      setUser(user)
    }
  }, [])

  const blogFormRef = createRef()

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials)
      setUser(user)
      storage.saveUser(user)
      dispatch(setNotification(`Welcome back, ${user.name}`, 'success', 5))
    } catch (error) {
      dispatch(setNotification('Wrong credentials', 'error', 5))
    }
  }

  const handleLogout = () => {
    setUser(null)
    storage.removeUser()
    dispatch(setNotification(`Bye, ${user.name}!`, 'success', 5))
  }

  if (!user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <Login doLogin={handleLogin} />
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
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <NewBlog />
      </Togglable>
      <BlogList />
    </div>
  )
}

export default App
