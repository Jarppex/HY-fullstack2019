import React from 'react'

const UserView = (props) => {

  if (!props.user) {
    return null
  }

  return (
    <div>
      <h2>{props.user.name}</h2>
      <strong>added blogs</strong>
      <ul>
        {props.user.blogs.map(blog => {
          return (
            <li key={blog.id}>{blog.title}</li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserView