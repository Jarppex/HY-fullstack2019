import loginService from '../services/login'

export const login = (credentials) => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    if (user) {
      localStorage.setItem('lastLoggedUser', JSON.stringify(user))
      dispatch(updateUser(user))
    }
  }
}

export const loginWithLocalStorage = () => {
  return async dispatch => {
    const userString = localStorage.getItem('lastLoggedUser')
    const user = JSON.parse(userString)
    if (user) {
      dispatch(updateUser(user))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    localStorage.removeItem('lastLoggedUser')
    dispatch(updateUser(null))
  }
}

const updateUser = (user) => {
  return {
    type: 'UPDATE_USER',
    data: user
  }
}

const reducer = (state = null, action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch(action.type) {
  case 'UPDATE_USER':
    return action.data
  default: return state
  }
}

export default reducer