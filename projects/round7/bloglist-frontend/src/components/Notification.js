import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = (props) => {

  const message = props.notification.message
  const color = props.notification.color

  if (!message) {
    return null
  }

  const notificationStyle = {
    marginBottom: 20,
    marginTop: 10,
  }

  if (color === 'green')
  {
    return (
      <div>
        {(message &&
          <Message success style={notificationStyle}>
            {message}
          </Message>
        )}
      </div>
    )
  }
  if (color === 'red')
  {
    return (
      <div>
        {(message &&
          <Message negative success style={notificationStyle}>
            {message}
          </Message>
        )}
      </div>
    )
  }

  return (
    <div>
      {(message &&
        <Message success style={notificationStyle}>
          {message}
        </Message>
      )}
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