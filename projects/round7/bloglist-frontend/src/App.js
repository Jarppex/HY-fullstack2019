import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { login, logout, loginWithLocalStorage } from './reducers/userReducer'
import { getBlogs, createBlog, removeBlog } from './reducers/blogReducer'

import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

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
        <h2>blogs</h2>
        <Notification />
        <p>{props.user.name} logged in</p>
        <button onClick={handleLogOut}>Logout</button>
        <Togglable buttonLabel='create new blog'>
          <BlogForm />
        </Togglable>
        {props.sortedBlogs.map(blog => {
          return (
            <Blog key={blog.id} blog={blog} />
          )}
        )}
      </div>
    )
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <LoginForm />
    </div>
  )
}

const sortBlogsByLikes = (state) => {
  return state.blogs.sort((first, second) => second.likes - first.likes)
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    sortedBlogs: sortBlogsByLikes(state)
  }
}

const mapDispatchToProps = {
  setNotification,
  getBlogs,
  createBlog,
  removeBlog,
  logout,
  login,
  loginWithLocalStorage
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)