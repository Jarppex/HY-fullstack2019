import React, { useState, useEffect } from 'react'
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
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('')
  const [message, setMessage ] = useState('')
  const [messageColor, setMessageColor ] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs => {
      //console.log(blogs)
      setBlogs(blogs)
    })
  }, [])

  //const blogRef = React.createRef()

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
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
      showMessage('logged in successfully!', 'green')
    } catch (exception) {
      showMessage('wrong username or password!', 'red')
    }
  }

  const handleLogOut = async (event) => {
    console.log('logging out..')
    try {
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
      const blog = await blogService.create({
        title, author, url, user: user.id, token: user.token
      })
      const newBlogs = blogs.concat(blog)
      setBlogs(newBlogs)
      setTitle('')
      setAuthor('')
      setUrl('')
      showMessage('blog created successfully!', 'green')
    } catch (exception) {
      showMessage('blog creation failed!', 'red')
    }
  }

  

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} color={messageColor} />
        <LoginForm username={username} password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
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
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}
          handleSubmit={handleBlogCreation}
        />
      </Togglable>
      {blogs.map(blog => {
        const blogRef = React.createRef()
        return (
          <Blog key={blog.id} blog={blog}
          handleBlogClick={() => blogRef.current.toggleVisibility()}
          ref={blogRef}
        />
        )}
      )}
    </div>
  )
}

export default App