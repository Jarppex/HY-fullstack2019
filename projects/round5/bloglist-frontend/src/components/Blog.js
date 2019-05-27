import React, { useState } from 'react'
import Button from './Button'

const Blog = ({ blog, user, handleBlogUpdate, handleBlogRemove }) => {
  const [showFull, setShowFull] = useState(false)

  const toggleVisibility = () => {
    setShowFull(!showFull)
  }

  const handleBlogLike = () => {
    const BlogToUpdate = blog
    if (!BlogToUpdate.likes) {
      BlogToUpdate.likes = 0
    }
    BlogToUpdate.likes += 1
    handleBlogUpdate(BlogToUpdate)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showRemoveButton = () => {
    return (
      <Button text='remove'
        handleClick={() => handleBlogRemove(blog)}
      />
    )
  }

  if (showFull) {
    return (
      <div style={blogStyle}>
        <div onClick={toggleVisibility}>
          <div>{blog.title} by {blog.author}</div>
          <div>{blog.url}</div>
          <div>{blog.likes} likes
            <Button text='like'
              handleClick={() => handleBlogLike(blog)}
            />
          </div>
          <div>added by {blog.user.name}</div>
          {user.name === blog.user.name && showRemoveButton()}
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div onClick={toggleVisibility}>
        {blog.title} by {blog.author}
      </div>
    </div>
  )
}

export default Blog