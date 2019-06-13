import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router, Route, Redirect
} from 'react-router-dom'
import { Container } from 'semantic-ui-react'

import { setNotification } from './reducers/notificationReducer'
import { logout, loginWithLocalStorage } from './reducers/userReducer'
import { getBlogs } from './reducers/blogReducer'
import { getUsers } from './reducers/usersReducer'

import Notification from './components/Notification'
import Header from './components/Header'
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

  const findById = (array, id) => {
    return array.find(element => element.id === id)
  }

  if (props.user) {
    return (
      <div>
        <Container>
          <Router>
            <div>
              <Header />
              <Notification />
              <Route exact path="/" render={() =>
                <Redirect to="/blogs" />} />
              <Route exact path="/blogs" render={() => <BlogsView />} />
              <Route exact path="/blogs/:id" render={({ match }) =>
                <BlogView blog={findById(props.blogs, match.params.id)} />} />
              <Route exact path="/users" render={() => <UsersView />} />
              <Route exact path="/users/:id" render={({ match }) =>
                <UserView user={findById(props.users, match.params.id)} />} />
            </div>
          </Router>
        </Container>
      </div>
    )
  }
  return (
    <div>
      <Container>
        <Notification />
        <LoginForm />
      </Container>
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