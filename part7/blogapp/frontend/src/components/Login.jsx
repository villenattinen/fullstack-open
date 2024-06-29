import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Card, InputGroup } from '@blueprintjs/core'
import { loginUser } from '../reducers/loginReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = (event) => {
    event.preventDefault()
    dispatch(loginUser({ username, password }))
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <Card>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <InputGroup
            placeholder="Username"
            type="text"
            data-testid="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <InputGroup
            placeholder="Password"
            type="password"
            value={password}
            data-testid="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button type="submit" text="Login" style={{ marginTop: 10 }} />
      </form>
    </Card>
  )
}

export default Login
