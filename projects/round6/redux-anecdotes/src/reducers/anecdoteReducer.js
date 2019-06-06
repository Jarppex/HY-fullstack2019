/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const initialState = anecdotesAtStart.map(asObject)
*/

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE_ANECDOTE',
    data: {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes
    }
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