import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
//import BlogcreationForm from './components/BlogcreationForm'
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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

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

  const loginForm = () => (
    <div>
      <form onSubmit={handleLogIn}>
      <div>
        käyttäjätunnus
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        salasana
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">kirjaudu</button>
      </form>
    </div>
  )

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
      <div>
        title
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
      </form>
    </div>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} color={messageColor} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} color={messageColor} />
      <p>{user.name} logged in</p>
      <button onClick={handleLogOut}>Logout</button>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App