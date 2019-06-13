import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
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
    padding: 5,
    marginBottom: 5,
    backgroundColor: 'lightgrey',
  }

  return (
    <div className='header' style={headerStyle}>
      <Link to='/blogs'>blogs  </Link>
      <Link to='/users'>users  </Link>
      {props.user.name} logged in
      <button onClick={handleLogOut}>Logout</button>
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