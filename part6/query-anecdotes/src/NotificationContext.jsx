import { createContext, useReducer, useContext, useEffect } from "react"

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notificationValue, notificationDispatch] = useReducer(notificationReducer, '')

  useEffect(() => {
    if (notificationValue !== '') {
      const timeout = setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)

      return () => clearTimeout(timeout)
    }
  }, [notificationValue])

  return (
    <NotificationContext.Provider value={[notificationValue, notificationDispatch]}>
      {/* eslint-disable react/prop-types */}
      {props.children}
    </NotificationContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationValue = () => {
  const notificationValueAndDispatch = useContext(NotificationContext)
  return notificationValueAndDispatch[0]
}

// eslint-disable-next-line react-refresh/only-export-components
export const useNotificationDispatch = () => {
  const notificationValueAndDispatch = useContext(NotificationContext)
  return notificationValueAndDispatch[1]
}

export default NotificationContext