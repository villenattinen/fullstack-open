import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    login: loginReducer,
    notification: notificationReducer,
    users: userReducer,
  },
})

export default store
