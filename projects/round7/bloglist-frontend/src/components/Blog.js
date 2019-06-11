import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import Button from './Button'

const Blog = (props) => {
  const [showFull, setShowFull] = useState(false)

  const toggleVisibility = () => {
    setShowFull(!showFull)
  }

  const blog = props.blog
  const user = props.user

  const like = (blog) => {
    console.log('updating blog..')
    try {
      props.likeBlog({
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
        props.removeBlog(blog)
        props.setNotification('blog remove successfully!', 'green', 5)
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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showFull) {
    return (
      <div className='blog' style={blogStyle}>
        <div className='maxInfo' onClick={toggleVisibility}>
          <div>{blog.title} by {blog.author}</div>
          <div>{blog.url}</div>
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
  return (
    <div className='blog' style={blogStyle}>
      <div className='minInfo' onClick={toggleVisibility}>
        {blog.title} by {blog.author}
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  likeBlog,
  removeBlog
}

export default connect(
  null,
  mapDispatchToProps
)(Blog)