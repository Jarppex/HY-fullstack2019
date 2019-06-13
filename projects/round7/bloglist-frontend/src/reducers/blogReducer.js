import blogService from '../services/blogs'

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(updateBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    await blogService.create(blog)
    const blogs = await blogService.getAll()
    dispatch(updateBlogs(blogs))
  }
}

export const removeBlog = (blog) => {
  return async dispatch => {
    await blogService.remove(blog)
    const blogs = await blogService.getAll()
    dispatch(updateBlogs(blogs))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const newBlog = blog
    if (!newBlog.likes) {
      newBlog.likes = 0
    }
    newBlog.likes += 1
    await blogService.update(newBlog)
    const blogs = await blogService.getAll()
    dispatch(updateBlogs(blogs))
  }
}

const updateBlogs = (blogs) => {
  return {
    type: 'UPDATE_BLOGS',
    data: blogs,
  }
}

const reducer = (state = [], action) => {
  //console.log('state now: ', state)
  //console.log('action', action)

  switch(action.type) {
  case 'UPDATE_BLOGS':
    return action.data
  default: return state
  }
}

export default reducer