import React from 'react'
//import  { useField } from './hooks'

const LoginForm = ({
  handleSubmit,
  //handleUsernameChange,
  //handlePasswordChange,
  username,
  password
}) => {
  //const username = useField('text')
  //const password = useField('password')

  const loginForm = () => (
    <div className='loginForm'>
      <form onSubmit={handleSubmit}>
        <div>
        käyttäjätunnus
          <input
            name="Username"
            type={username.type}
            value={username.value}
            onChange={username.onChange}
          />
        </div>
        <div>
        salasana
          <input
            name="Password"
            type={password.type}
            value={password.value}
            onChange={password.onChange}
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

export default LoginForm