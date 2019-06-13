import React from 'react'
import { Image, Icon, Card } from 'semantic-ui-react'

const UserView = (props) => {

  if (!props.user) {
    return null
  }

  return (
    <div>
      <Card>
        <Image src='' wrapped ui={false} />
        <Card.Content>
          <Card.Header>
            <Icon name='user'/>
          </Card.Header>
          <br></br>
          <Card.Header>
            {props.user.name}
          </Card.Header>
          <Card.Meta>
            <span>{props.user.username}</span>
          </Card.Meta>
          <Card.Description>
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <strong>Added blogs</strong>
          <ul>
            {props.user.blogs.map(blog => {
              return (
                <li key={blog.id}>{blog.title}</li>
              )
            })}
          </ul>
        </Card.Content>
      </Card>
    </div>
  )
}

export default UserView