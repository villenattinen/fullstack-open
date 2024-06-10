import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationClassName, setNotificationClassName] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const createBlog = (event) => {
    event.preventDefault()
    try {
      const blogObject = {
        title: newBlogTitle,
        author: newBlogAuthor,
        url: newBlogUrl,
      }

      blogService
        .create(blogObject)
        .then(data => {
          setNotificationMessage(`New blog ${newBlogTitle} by ${newBlogAuthor} created`)
          setNotificationClassName('success')
          setBlogs(blogs.concat(data))
          setNewBlogTitle('')
          setNewBlogAuthor('')
          setNewBlogUrl('')
        })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage('Error creating blog')
      setNotificationClassName('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong username or password')
      setNotificationClassName('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleBlogChange = (event) => {
    if (event.target.name === 'title') {
      setNewBlogTitle(event.target.value)
    } else if (event.target.name === 'author') {
      setNewBlogAuthor(event.target.value)
    } else if (event.target.name === 'url') {
      setNewBlogUrl(event.target.value)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input 
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input 
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            value={newBlogTitle}
            onChange={handleBlogChange}
            name='title'
          />
        </div>
        <div>
        author:
        <input
          value={newBlogAuthor}
          onChange={handleBlogChange}
          name='author'
        />
        </div>
        <div>
        url:
        <input
          value={newBlogUrl}
          onChange={handleBlogChange}
          name='url'
        />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

  return (
    <div>
      <Notification message={notificationMessage} className={notificationClassName} />

      {!user && loginForm()}

      {user &&
        <div>
          <h2>blogs</h2>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>
              logout
            </button>
          </div>
          <div>
            {blogForm()}
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App