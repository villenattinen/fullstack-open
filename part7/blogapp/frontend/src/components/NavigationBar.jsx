import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Alignment, Button, Navbar } from '@blueprintjs/core'
import { logoutUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const NavigationBar = () => {
  const user = useSelector((state) => state.login)
  const dispatch = useDispatch()
  const isLoggedIn = user !== null

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(setNotification(`Bye, ${user.name}!`, 'success', 5))
  }

  if (!isLoggedIn) {
    return (
      <MarginUnderNavigationBar>
        <StyledNavbar fixedToTop>
          <Navbar.Group align={Alignment.LEFT}>
            <Navbar.Heading>Blog app</Navbar.Heading>
          </Navbar.Group>
        </StyledNavbar>
      </MarginUnderNavigationBar>
    )
  }

  return (
    <MarginUnderNavigationBar>
      <StyledNavbar fixedToTop>
        <Navbar.Group align={Alignment.LEFT}>
          <Navbar.Heading>Blog app</Navbar.Heading>
          <Navbar.Divider />
          <Link to="/">
            <Button minimal icon="git-repo" text="Blogs" />
          </Link>
          <Link to="/users">
            <Button minimal icon="people" text="Users" />
          </Link>
          <Navbar.Divider />
          {user.name} logged in
          <Button
            minimal
            style={{ marginLeft: 5 }}
            onClick={handleLogout}
            icon="log-out"
            text="Logout"
          />
        </Navbar.Group>
      </StyledNavbar>
    </MarginUnderNavigationBar>
  )
}

const StyledNavbar = styled(Navbar)`
  background-color: lightblue;
`

const MarginUnderNavigationBar = styled.div`
  margin: 60px;
`

export default NavigationBar
