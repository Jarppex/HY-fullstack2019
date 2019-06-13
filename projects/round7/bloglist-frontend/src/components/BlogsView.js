import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'semantic-ui-react'

import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const BlogsView = (props) => {

  return (
    <div>
      <h3>Blogs</h3>
      <Table striped celled>
        <Table.Body>
          {props.sortedBlogs.map(blog => {
            return (
              <Table.Row key={blog.id}>
                <Table.Cell>
                  <Blog key={blog.id} blog={blog} />
                </Table.Cell>
              </Table.Row>
            )})}
        </Table.Body>
      </Table>
      <Togglable buttonLabel='Create new blog'>
        <BlogForm />
      </Togglable>
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