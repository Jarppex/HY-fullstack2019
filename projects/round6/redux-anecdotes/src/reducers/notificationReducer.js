
export const setNotification = (message, duration) => {
    return async dispatch => {
      setTimeout(() => {
        dispatch(resetNotification())
      }, duration*1000)
      dispatch({
        type: 'SET_NOTIFICATION',
        notification: message
      })
    }
}

export const resetNotification = () => {
    return { type: 'RESET' }
}

const initialState = ''
const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.notification
        case 'RESET':
            return initialState
        default:
            return state
    }
}
  
export default notificationReducer