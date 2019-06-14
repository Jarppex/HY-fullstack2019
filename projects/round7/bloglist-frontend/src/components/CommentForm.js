import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { setNotification } from '../reducers/notificationReducer'
import { createComment } from '../reducers/commentReducer'
import  { useField } from '../hooks'

const CommentForm = (props) => {

  const comment = useField('text')

  const handleCommentCreation = async (event) => {
    event.preventDefault()
    console.log('creating comment..')
    try {
      await props.createComment({ content: comment.value, blog: props.blog.id })
      comment.reset()
      props.setNotification('comment created successfully!', 'green', 5)
    } catch (exception) {
      props.setNotification('comment creation failed!', 'red', 5)
    }
  }

  const commentForm = () => (
    <div>
      <Form onSubmit={handleCommentCreation}>
        <Form.Field>
          <input
            placeholder='write a comment..'
            type={comment.type}
            value={comment.value}
            onChange={comment.onChange}
          />
        </Form.Field>
        <Button primary size='tiny' type='submit'>Add comment</Button>
      </Form>
    </div>
  )

  return (
    <div>
      {commentForm()}
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  createComment
}

export default connect(
  null,
  mapDispatchToProps
)(CommentForm)