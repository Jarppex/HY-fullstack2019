import React from 'react'
import { connect } from 'react-redux'
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
      <h3>add comments</h3>
      <form onSubmit={handleCommentCreation}>
        <div>
          <input {...comment}
            reset=""
          />
        </div>
        <button type="submit">add comment</button>
      </form>
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