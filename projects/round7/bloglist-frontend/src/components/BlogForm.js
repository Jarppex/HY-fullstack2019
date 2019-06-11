import React from 'react'
import { connect } from 'react-redux'
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
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
        title
          <input {...title}
            reset=""
          />
        </div>
        <div>
        author
          <input {...author}
            reset=""
          />
        </div>
        <div>
        url
          <input {...url}
            reset=""
          />
        </div>
        <button type="submit">create</button>
      </form>
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