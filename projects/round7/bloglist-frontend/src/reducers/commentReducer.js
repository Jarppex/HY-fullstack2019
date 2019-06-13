import commentService from '../services/comments'

export const getComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch(updateComments(comments))
  }
}

export const createComment = (comment) => {
  return async dispatch => {
    await commentService.create(comment)
    const comments = await commentService.getAll()
    dispatch(updateComments(comments))
  }
}

const updateComments = (comments) => {
  return {
    type: 'UPDATE_COMMENTS',
    data: comments,
  }
}

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch(action.type) {
  case 'UPDATE_COMMENTS':
    return action.data
  default: return state
  }
}

export default reducer