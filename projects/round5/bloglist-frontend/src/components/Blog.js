import React, {useState/*, useImperativeHandle*/} from 'react'
import Button from './Button'

const Blog =  //React.forwardRef(
  ({ blog, /*handleBlogClick,*/ handleBlogUpdate, handleBlogRemove }, ref) => {
  const [showFull, setShowFull] = useState(false)

  const toggleVisibility = () => {
    setShowFull(!showFull)
  }
/*
  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })*/

  const handleBlogLike = () => {
    const BlogToUpdate = blog
    //console.log('BlogToUpdate before:', BlogToUpdate)
    if (!BlogToUpdate.likes) {
      BlogToUpdate.likes = 0
    }
    BlogToUpdate.likes += 1
    //console.log('BlogToUpdate after like:', BlogToUpdate)
    handleBlogUpdate(BlogToUpdate)
  }

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
        <div /*onClick={handleBlogClick}*/ onClick={toggleVisibility}>
          <div>'{blog.title}' by {blog.author}</div>
          <div>{blog.url}</div>
          <div>{blog.likes} likes 
          <Button text='like'
           handleClick={() => handleBlogLike(blog)}
          />
          </div>
          <div>added by {blog.user.name}</div>
          <Button text='remove'
           handleClick={() => handleBlogRemove(blog)}
          />
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div /*onClick={handleBlogClick}*/ onClick={toggleVisibility}>
        '{blog.title}' by {blog.author}
      </div>
    </div>
  )
}//)

export default Blog