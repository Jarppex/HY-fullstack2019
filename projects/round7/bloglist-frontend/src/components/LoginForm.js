import React from 'react'
import { connect } from 'react-redux'
import { Form, Button, Segment } from 'semantic-ui-react'
import { login } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'

const LoginForm = (props) => {
  const username = useField('text')
  const password = useField('password')

  const resetFields = () => {
    username.reset()
    password.reset()
  }

  const handleLogIn = async (event) => {
    event.preventDefault()
    console.log('logging in..')
    try {
      await props.login({ username: username.value, password: password.value })
      resetFields()
      props.setNotification('logged in successfully!', 'green', 5)
    } catch (exception) {
      props.setNotification('wrong username or password!', 'red', 5)
    }
  }

  const loginForm = () => (
    <div>
      <Segment placeholder style={{ marginTop: 20 }}>
        <Form onSubmit={handleLogIn}>
          <h2 style={{ textAlign: 'center' }}>Log in to application</h2>
          <Form.Field>
            <Form.Input
              icon='user' iconPosition='left' label='Username' placeholder='Username'
              type='text' value={username.value} onChange={username.onChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              icon='lock' iconPosition='left' label='Password' placeholder='Password'
              type='password' value={password.value} onChange={password.onChange}
            />
          </Form.Field>
          <Button primary type='submit'>Login</Button>
        </Form>
      </Segment>
    </div>
  )

  return (
    <div>
      {loginForm()}
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  login
}

export default connect(
  null,
  mapDispatchToProps
)(LoginForm)