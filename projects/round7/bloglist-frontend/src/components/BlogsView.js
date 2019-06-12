import React from 'react'
import { connect } from 'react-redux'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogsView = (props) => {

  const blogs = () => (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel='create new blog'>
        <BlogForm />
      </Togglable>
      {props.sortedBlogs.map(blog => {
        return (
          <Blog key={blog.id} blog={blog} />
        )}
      )}
    </div>
  )

  return (
    <div>
      {blogs()}
    </div>
  )
}

const sortBlogsByLikes = (state) => {
  return state.blogs.sort((first, second) => second.likes - first.likes)
}

const mapStateToProps = (state) => {
  return {
    sortedBlogs: sortBlogsByLikes(state)
  }
}

export default connect(
  mapStateToProps,
  null
)(BlogsView)