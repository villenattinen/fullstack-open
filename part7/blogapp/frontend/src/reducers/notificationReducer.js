import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return null
    },
  },
})

export const { createNotification, clearNotification } =
  notificationSlice.actions

export const setNotification = (message, type, timeShownInSeconds) => {
  return async (dispatch) => {
    dispatch(createNotification({ message, type }))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeShownInSeconds * 1000)
  }
}

export default notificationSlice.reducer
