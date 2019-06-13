import React from 'react'
import { Link } from 'react-router-dom'

const Blog = (props) => {

  const blog = props.blog

  return (
    <div className='blog'>
      <div>
        <Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link>
      </div>
    </div>
  )
}
export default Blog