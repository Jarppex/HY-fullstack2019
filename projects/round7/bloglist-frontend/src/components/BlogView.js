/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import Button from './Button'

const BlogView = (props) => {

  const blog = props.blog
  const user = props.user

  if (!blog || !user) {
    return null
  }

  const like = async (blog) => {
    console.log('updating blog..')
    try {
      await props.likeBlog({
        title: blog.title, author: blog.author, url: blog.url,
        likes: blog.likes, id: blog.id, user: blog.user.id
      })
      props.setNotification('blog updated successfully!', 'green', 5)
    } catch (exception) {
      props.setNotification('blog update failed!', 'red', 5)
    }
  }

  const handleBlogRemove = async (blog) => {
    console.log('removing blog..')
    try {
      const message = `Are you sure you want to remove ${blog.title} by ${blog.author}?`
      const result = window.confirm(message)
      if (result) {
        await props.removeBlog(blog)
        props.setNotification('blog removed successfully!', 'green', 5)
      }
    } catch (exception) {
      props.setNotification('blog remove failed!', 'red', 5)
    }
  }

  const showRemoveButton = () => {
    return (
      <Button text='remove'
        handleClick={() => handleBlogRemove(blog)}
      />
    )
  }

  return (
    <div className='blog'>
      <div>
        <h2>{blog.title} by {blog.author}</h2>
        <a style={{ display: 'table-cell' }} href={blog.url} target='_blank'>{blog.url}</a>
        <div>{blog.likes} likes
          <Button text='like'
            handleClick={() => like(blog)}
          />
        </div>
        <div>added by {blog.user.name}</div>
        {user.name === blog.user.name && showRemoveButton()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  setNotification,
  likeBlog,
  removeBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogView)