import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { getBlogs, createBlog, removeBlog } from './reducers/blogReducer'

import  { useField } from './hooks'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

import loginService from './services/login'

const App = (props) => {
  const [user, setUser] = useState(null)

  const username = useField('text')
  const password = useField('password')

  const resetFields = () => {
    username.reset()
    password.reset()
  }

  useEffect(() => {
    loginWithLocalStorage()
    props.getBlogs()
  }, [])

  const loginWithLocalStorage = () => {
    const userString = localStorage.getItem('lastLoggedUser')
    const user = JSON.parse(userString)
    if (user) {
      setUser(user)
      props.setNotification('logged in successfully!', 'green', 5)
    }
  }

  const handleLogIn = async (event) => {
    event.preventDefault()
    console.log('logging in..')
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      localStorage.setItem('lastLoggedUser', JSON.stringify(user))
      setUser(user)
      resetFields()
      props.setNotification('logged in successfully!', 'green', 5)
    } catch (exception) {
      props.setNotification('wrong username or password!', 'red', 5)
    }
  }

  const handleLogOut = async () => {
    console.log('logging out..')
    try {
      localStorage.removeItem('lastLoggedUser')
      setUser(null)
      props.setNotification('logged out succesfully!', 'green', 5)
    } catch (exception) {
      props.setNotification('logging out failed!', 'red', 5)
    }
  }

  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>{user.name} logged in</p>
        <button onClick={handleLogOut}>Logout</button>
        <Togglable buttonLabel='create new blog'>
          <BlogForm user={user} />
        </Togglable>
        {props.sortedBlogs.map(blog => {
          return (
            <Blog key={blog.id} blog={blog} user={user} />
          )}
        )}
      </div>
    )
  }
  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <LoginForm username={username} password={password}
        handleSubmit={handleLogIn}
      />
    </div>
  )
}

const sortBlogsByLikes = (state) => {
  return state.blogs.sort((first, second) => second.likes - first.likes)
}

const mapStateToProps = (state) => {
  return {
    sortedBlogs: sortBlogsByLikes(state)
  }
}

const mapDispatchToProps = {
  setNotification,
  getBlogs,
  createBlog,
  removeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)