import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Route, Link, withRouter
} from 'react-router-dom'
import { Table, Form, Button, Alert, Nav, Navbar } from 'react-bootstrap'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to='/' style={padding}>anecdotes</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to='/create' style={padding}>create new</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to='/info' style={padding}>about</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => {
  return (
  <div>
    <h2>Anecdotes</h2>
    <Table striped>
      <tbody>
        {anecdotes.map(anecdote => 
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
  )
}

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>'{anecdote.content}' by {anecdote.author}</h2>
    <div>has {anecdote.votes} votes</div>
    <div>for more info see <a href={anecdote.info}>{anecdote.info}</a></div>
  </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const clearInputs = () => {
    setContent('')
    setAuthor('')
    setInfo('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    const message = `a new anecdote '${content}' created!`
    props.showNotification(message)
    clearInputs()
    props.history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>content:</Form.Label>
          <Form.Control
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            type="text"
            name='author'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <Form.Label>url for more info:</Form.Label>
          <Form.Control
            type="text"
            name='info'
            value={info}
            onChange={(e)=> setInfo(e.target.value)}
          />
          <Button variant="primary" type="submit">
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const CreateNewWithRouter = withRouter(CreateNew)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    },
    {
      content: 'Laiffi is laiffii',
      author: 'Matti Nykänen',
      info: 'http://www.mattinykänen.fi',
      votes: 0,
      id: '3'
    }
  ])

  const [notification, setNotification] = useState('')

  const showNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null)
    }, 10000)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <div className="container">
      <Router>
        <div>
          <h1>Software anecdotes</h1>
          <Menu />
          {(notification &&
            <Alert variant="success">
              {notification}
            </Alert>
      )}
          <Route exact path="/" render={() => 
            <AnecdoteList anecdotes={anecdotes} />} />
          <Route path="/create" render={() => 
            <CreateNewWithRouter addNew={addNew} showNotification={showNotification} />} />
          <Route path="/info" render={() => 
            <About />} />
          <Route path="/anecdotes/:id" render={({match}) => 
            <Anecdote anecdote={anecdoteById(match.params.id)} />} />
          <Footer />
        </div>
      </Router>
    </div>
  )
}

export default App;