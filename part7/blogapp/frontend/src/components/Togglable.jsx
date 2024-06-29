import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@blueprintjs/core'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button onClick={toggleVisibility} text={props.buttonLabel} />
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          onClick={toggleVisibility}
          text="Cancel"
          style={{ marginTop: 10 }}
        />
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
