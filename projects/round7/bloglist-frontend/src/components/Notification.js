import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const message = props.notification.message
  const color = props.notification.color
  let messageStyle = {}

  if (color === 'green')
  {
    messageStyle = {
      color: 'green',
      borderColor: 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }
  if (color === 'red')
  {
    messageStyle = {
      color: 'red',
      borderColor: 'red',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }

  if (message === null) {
    return null
  }

  return (
    <div style={messageStyle}>
      {message}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(
  mapStateToProps
)(Notification)