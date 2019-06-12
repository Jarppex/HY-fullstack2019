import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import { setNotification } from './reducers/notificationReducer'
import { logout, loginWithLocalStorage } from './reducers/userReducer'
import { getBlogs } from './reducers/blogReducer'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsView from './components/BlogsView'
import UsersView from './components/UsersView'

const App = (props) => {

  useEffect(() => {
    props.loginWithLocalStorage()
    props.getBlogs()
  }, [])

  const handleLogOut = async () => {
    console.log('logging out..')
    try {
      await props.logout()
      props.setNotification('logged out succesfully!', 'green', 5)
    } catch (exception) {
      props.setNotification('logging out failed!', 'red', 5)
    }
  }

  if (props.user) {
    return (
      <div>
        <Router>
          <div>
            <Notification />
            <p>{props.user.name} logged in</p>
            <button onClick={handleLogOut}>Logout</button>
            <Route exact path="/" render={() => <BlogsView />} />
            <Route exact path="/users" render={() => <UsersView />} />
          </div>
        </Router>
      </div>
    )
  }
  return (
    <div>
      <Notification />
      <LoginForm />
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
  getBlogs,
  logout,
  loginWithLocalStorage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)