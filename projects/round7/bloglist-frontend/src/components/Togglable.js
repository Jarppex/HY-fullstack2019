import React, { useState } from 'react'
import { Button, Icon } from 'semantic-ui-react'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const iconStyle = {
    paddingLeft: 5,
  }
  const buttonStyle = {
    marginBottom: 10,
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button  style={buttonStyle} primary size='small' onClick={toggleVisibility}>
          <Icon style={iconStyle} name='plus'/>
        </Button>
      </div>
      <div style={showWhenVisible}>
        <Button  style={buttonStyle} primary size='small' onClick={toggleVisibility}>
          <Icon style={iconStyle} name='minus'/>
        </Button>
        {props.children}
      </div>
    </div>
  )
}

export default Togglable