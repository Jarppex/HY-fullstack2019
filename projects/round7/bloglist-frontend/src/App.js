import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router, Route
} from 'react-router-dom'

import { setNotification } from './reducers/notificationReducer'
import { logout, loginWithLocalStorage } from './reducers/userReducer'
import { getBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/usersReducer'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogsView from './components/BlogsView'
import BlogView from './components/BlogView'
import UsersView from './components/UsersView'
import UserView from './components/UserView'

const App = (props) => {

  useEffect(() => {
    props.loginWithLocalStorage()
    props.getBlogs()
    props.getUsers()
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

  const findById = (array, id) => {
    return array.find(element => element.id === id)
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
            <Route exact path="/blogs/:id" render={({ match }) =>
              <BlogView blog={findById(props.blogs, match.params.id)} />} />
            <Route exact path="/users" render={() => <UsersView />} />
            <Route exact path="/users/:id" render={({ match }) =>
              <UserView user={findById(props.users, match.params.id)} />} />
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
    blogs: state.blogs,
    user: state.user,
    users: state.users
  }
}

const mapDispatchToProps = {
  setNotification,
  getBlogs,
  getUsers,
  logout,
  loginWithLocalStorage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)