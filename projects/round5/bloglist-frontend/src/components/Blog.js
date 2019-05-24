import React, {useState, useImperativeHandle} from 'react'

const Blog =  React.forwardRef(({ blog, handleBlogClick }, ref) =>  {
  const [showFull, setShowFull] = useState(false)

  const toggleVisibility = () => {
    setShowFull(!showFull)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showFull) {
    return (
      <div style={blogStyle}>
        <div onClick={handleBlogClick}>
          <div>'{blog.title}' by {blog.author}</div>
          <div>{blog.url}</div>
          <div>{blog.likes} likes</div>
          <div>added by {blog.user.name}</div>
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div onClick={handleBlogClick}>
        '{blog.title}' by {blog.author}
      </div>
    </div>
  )
})

export default Blog