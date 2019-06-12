import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { login } from '../reducers/userReducer'
import  { useField } from '../hooks'

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
    <div className='loginForm'>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogIn}>
        <div>
        käyttäjätunnus
          <input {...username}
            reset=""
          />
        </div>
        <div>
        salasana
          <input {...password}
            reset=""
          />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
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