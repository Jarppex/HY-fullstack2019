import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return {
    type: 'VOTE',
    data: { id: anecdote.id }
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data
    case "CREATE_ANECDOTE":
      return state.concat(action.data)
    case "VOTE":
      return state.map((anecdote) => {
        return anecdote.id === action.data.id ? {
          content: anecdote.content,
          id: anecdote.id,
          votes: anecdote.votes + 1
        } : anecdote
      })
    default: return state
  }
}

export default reducer