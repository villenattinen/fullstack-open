import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import storage from '../services/storage'
import { setNotification } from './notificationReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
    clearUser() {
      return null
    },
    getUser(state) {
      return state
    },
  },
})

export const { getUser, setUser, clearUser } = userSlice.actions

export const initializeUser = () => {
  return async (dispatch) => {
    const user = storage.loadUser()
    if (user) {
      dispatch(setUser(user))
    }
  }
}

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials)
      storage.saveUser(user)
      dispatch(setUser(user))
      dispatch(setNotification(`Welcome, ${user.name}!`, 'success', 5))
    } catch (error) {
      dispatch(setNotification('Wrong credentials', 'error', 5))
    }
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    storage.removeUser()
    dispatch(clearUser())
  }
}

export default userSlice.reducer
