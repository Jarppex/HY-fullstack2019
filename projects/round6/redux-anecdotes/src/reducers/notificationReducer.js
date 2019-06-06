
  export const voteAnecdoteNotification = (anecdote) => {
    return {
      type: 'SET_NOTIFICATION',
      notification: `You voted '${anecdote.content}'`
    }
  }

  export const createAnecdoteNotification = (anecdote) => {
    return {
      type: 'SET_NOTIFICATION',
      notification: `'${anecdote.content}' created`
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