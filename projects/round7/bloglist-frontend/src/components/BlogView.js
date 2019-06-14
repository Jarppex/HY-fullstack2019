/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect }from 'react'
import { connect } from 'react-redux'
import { Image, Icon, Card, Button, Label } from 'semantic-ui-react'
import { setNotification } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { getComments } from '../reducers/commentReducer'
import CommentForm from './CommentForm'

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
    if (user.name === blog.user.name) {
      return (
        <Button size='mini' onClick={() => handleBlogRemove(blog)}>Remove</Button>
      )
    }
  }

  return (
    <div className='blog'>
      <Card>
        <Image src='' wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            <Icon name='bookmark'/>
            Blog
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <br></br>
          <Card.Header>
            <div>{blog.title}</div>
          </Card.Header>
          <Card.Meta>
            <div>{blog.author}</div>
            <span><a style={{ display: 'table-cell' }} href={blog.url} target='_blank'>{blog.url}</a></span>
          </Card.Meta>
          <Card.Description>
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Button as='div' size='mini' labelPosition='right'>
            <Button size='mini' color='red' onClick={() => like(blog)}>
              <Icon name='heart' />
                  Like
            </Button>
            <Label as='a' basic color='red' pointing='left'>
              {blog.likes}
            </Label>
          </Button>
        </Card.Content>
        <Card.Content>
          <div>
            <em>Added by {user.name === blog.user.name ? 'You' : blog.user.name}</em>
          </div>
          <br></br>
          {showRemoveButton()}
        </Card.Content>
      </Card>
      <h3>Comments</h3>
      <ul>
        {blogComments.map(comment => {
          return (
            <li key={comment.id}>{comment.content}</li>
          )
        })}
      </ul>
      <CommentForm blog={blog} />
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