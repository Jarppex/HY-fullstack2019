
  export const filterAnecdotes = (content) => {
    return {
      type: 'SET_FILTER',
      filter: content
    }
  }

  const initialState = ''

  const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.filter
        default:
            return state
    }
  }
  
  export default filterReducer