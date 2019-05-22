import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
//import BlogcreationForm from './components/BlogcreationForm'
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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with:', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      //console.log(user)
      console.log(user.name, 'logged in')
      //console.log('token:', user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong username or password!')
      /*
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      */
    }
  }

  const handleLogout = async (event) => {
    //event.preventDefault()
    console.log('logging out with:', username, password)
    try {
      /*
      const user = await loginService.login({
        username, password,
      })*/
      setUser(null)
      //setUsername('')
      //setPassword('')
    } catch (exception) {
      console.log('logging out failed!')
      /*
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      */
    }
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    console.log('creating blog..', title, author, url)
    try {

      //const user = user.id
      //const userData = user
      const blog = await blogService.create({
        title, author, url, user: user.id, token: user.token
      })
      console.log('blog creation successfull!', blog)
      const newBlogs = blogs.concat(blog)
      setBlogs(newBlogs)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (exception) {
      console.log('blog creation failed!')
      /*
      setErrorMessage('käyttäjätunnus tai salasana virheellinen')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      */
    }
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
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
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      {blogForm()}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App