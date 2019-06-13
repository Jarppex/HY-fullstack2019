/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect }from 'react'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { getComments } from '../reducers/commentReducer'
import CommentForm from './CommentForm'
import Button from './Button'

const BlogView = (props) => {

  useEffect(() => {
    props.getComments()
  }, [])

  const blog = props.blog
  const user = props.user

  if (!blog || !user) {
    return null
  }

  const filterBlogComments = (comments) => {
    return comments.filter(comment => comment.blog === blog.id)
  }
  const blogComments = filterBlogComments(props.comments)

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
        <h1>{blog.title}</h1>
        <h2>{blog.author}</h2>
        <a style={{ display: 'table-cell' }} href={blog.url} target='_blank'>{blog.url}</a>
        <div>{blog.likes} likes
          <Button text='like'
            handleClick={() => like(blog)}
          />
        </div>
        <div>added by {blog.user.name}</div>
        {user.name === blog.user.name && showRemoveButton()}
        <h3>comments</h3>
        <ul>
          {blogComments.map(comment => {
            return (
              <li key={comment.id}>{comment.content}</li>
            )
          })}
        </ul>
        <CommentForm blog={blog} />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    comments: state.comments
  }
}

const mapDispatchToProps = {
  setNotification,
  likeBlog,
  removeBlog,
  getComments
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogView)