import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    }
  }, [notification, dispatch])

  const style = {
    border: 'solid',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    display: notification ? '' : 'none',
  }

  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification