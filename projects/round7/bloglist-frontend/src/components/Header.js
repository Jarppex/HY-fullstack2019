import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Button } from 'semantic-ui-react'
import { setNotification } from '../reducers/notificationReducer'
import { logout } from '../reducers/userReducer'

const Header = (props) => {

  const handleLogOut = async () => {
    console.log('logging out..')
    try {
      await props.logout()
      props.setNotification('logged out succesfully!', 'green', 5)
    } catch (exception) {
      props.setNotification('logging out failed!', 'red', 5)
    }
  }

  const headerStyle = {
    marginBottom: 20,
  }
  const buttonStyle = {
    marginLeft: 10,
  }

  return (
    <div style={headerStyle}>
      <Menu inverted>
        <Menu.Item>
          <Link to='/blogs'>Blogs</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to='/users'>Users</Link>
        </Menu.Item>
        <Menu.Item position='right'>
          {props.user.name} logged in
          <Button style={buttonStyle} onClick={handleLogOut}>Logout</Button>
        </Menu.Item>
      </Menu>
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)