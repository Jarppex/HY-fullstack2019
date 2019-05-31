import React, { useState, useEffect } from 'react'
import  { useField } from './hooks'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogcreationForm from './components/BlogcreationForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [message, setMessage ] = useState('')
  const [messageColor, setMessageColor ] = useState('')

  const username = useField('text')
  const password = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const resetFields = () => {
    username.reset()
    password.reset()
    title.reset()
    author.reset()
    url.reset()
  }

  useEffect(() => {
    loginWithLocalStorage()
    renderBlogs()
  }, [])

  const loginWithLocalStorage = () => {
    const userString = localStorage.getItem('lastLoggedUser')
    const user = JSON.parse(userString)
    if (user) {
      setUser(user)
      showMessage('logged in successfully!', 'green')
    }
  }

  const renderBlogs = async () => {
    const newBlogs = await blogService.getAll()
    newBlogs.sort((first, second) => second.likes - first.likes)
    setBlogs(newBlogs)
  }

  const showMessage = (message, color) => {
    console.log(message)
    setMessage(message)
    setMessageColor(color)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
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
      showMessage('logged in successfully!', 'green')
    } catch (exception) {
      showMessage('wrong username or password!', 'red')
    }
  }

  const handleLogOut = async () => {
    console.log('logging out..')
    try {
      localStorage.removeItem('lastLoggedUser')
      setUser(null)
      showMessage('logged out succesfully!', 'green')
    } catch (exception) {
      showMessage('logging out failed!', 'red')
    }
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    console.log('creating blog..')
    try {
      await blogService.create({
        title: title.value, author: author.value, url: url.value,
        user: user.id, token: user.token
      })
      renderBlogs()
      resetFields()
      showMessage('blog created successfully!', 'green')
    } catch (exception) {
      showMessage('blog creation failed!', 'red')
    }
  }

  const handleBlogUpdate = async (blog) => {
    console.log('updating blog..')
    try {
      await blogService.update(blog.id, {
        title: blog.title, author: blog.author, url: blog.url,
        likes: blog.likes, user: blog.user.id
      })
      renderBlogs()
      showMessage('blog updated successfully!', 'green')
    } catch (exception) {
      showMessage('blog update failed!', 'red')
    }
  }

  const handleBlogRemove = async (blog) => {
    console.log('removing blog..')
    try {
      const message = `Are you sure you want to remove ${blog.title} by ${blog.author}?`
      const result = window.confirm(message)
      if (result) {
        await blogService.remove(blog.id)
        renderBlogs()
        showMessage('blog remove successfully!', 'green')
      }
    } catch (exception) {
      showMessage('blog remove failed!', 'red')
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} color={messageColor} />
        <LoginForm username={username} password={password}
          handleSubmit={handleLogIn}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} color={messageColor} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogOut}>Logout</button>
      <Togglable buttonLabel='create new blog'>
        <BlogcreationForm title={title} author={author} url={url}
          handleSubmit={handleBlogCreation}
        />
      </Togglable>
      {blogs.map(blog => {
        return (
          <Blog key={blog.id} blog={blog} user={user}
            handleBlogUpdate={handleBlogUpdate}
            handleBlogRemove={handleBlogRemove}
          />
        )}
      )}
    </div>
  )
}

export default App