import React from 'react'
import { connect } from 'react-redux'
import { Form, Button } from 'semantic-ui-react'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import  { useField } from '../hooks'

const BlogcreationForm = (props) => {
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const resetFields = () => {
    title.reset()
    author.reset()
    url.reset()
  }

  const handleBlogCreation = async (event) => {
    event.preventDefault()
    console.log('creating blog..')
    try {
      await props.createBlog({
        title: title.value, author: author.value, url: url.value,
        user: props.user.id, token: props.user.token
      })
      resetFields()
      props.setNotification('blog created successfully!', 'green', 5)
    } catch (exception) {
      props.setNotification('blog creation failed!', 'red', 5)
    }
  }

  const blogForm = () => (
    <div>
      <Form onSubmit={handleBlogCreation}>
        <Form.Field required>
          <label>Title</label>
          <input
            id='title'
            placeholder='Title'
            type={title.type}
            value={title.value}
            onChange={title.onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input
            id='author'
            placeholder='Author'
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </Form.Field>
        <Form.Field required>
          <label>Url</label>
          <input
            id='url'
            placeholder='Url'
            type={url.type}
            value={url.value}
            onChange={url.onChange}
          />
        </Form.Field>
        <Button
          primary size='tiny' type='submit'>
          Add blog
        </Button>
      </Form>
    </div>
  )

  return (
    <div>
      {blogForm()}
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
  createBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BlogcreationForm)