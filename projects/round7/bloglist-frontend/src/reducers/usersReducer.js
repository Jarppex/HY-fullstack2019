import userService from '../services/users'

export const getUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch(updateUsers(users))
  }
}

const updateUsers = (users) => {
  return {
    type: 'UPDATE_USERS',
    data: users,
  }
}

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch(action.type) {
  case 'UPDATE_USERS':
    return action.data
  default: return state
  }
}

export default reducer