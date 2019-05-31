import React from 'react'

const BlogcreationForm = ({
  handleSubmit,
  /*handleTitleChange,
  handleAuthorChange,
  handleUrlChange,*/
  title,
  author,
  url
}) => {

  const blogForm = () => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
        title
          <input {...title}
            reset=""
            /*name="title"
            type={title.type}
            value={title.value}
            onChange={title.onChange}*/
          />
        </div>
        <div>
        author
          <input {...author}
            reset=""
            /*name="title"
            type={author.type}
            value={author.value}
            onChange={author.onChange}*/
          />
        </div>
        <div>
        url
          <input {...url}
            reset=""
            /*name="title"
            type={url.type}
            value={url.value}
            onChange={url.onChange}*/
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

export default BlogcreationForm