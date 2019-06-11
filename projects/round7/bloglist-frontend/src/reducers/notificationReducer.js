
export const setNotification = (message, color, duration) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch(resetNotification())
    }, duration*1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        message: message,
        color: color
      }
    })
  }
}

export const resetNotification = () => {
  return { type: 'RESET' }
}

const initialState = {
  message: '',
  color: ''
}
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'RESET':
    return initialState
  default:
    return state
  }
}

export default notificationReducer