import React from 'react'
import { Image, Icon, Card, Table } from 'semantic-ui-react'

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
            User
          </Card.Header>
        </Card.Content>
        <Card.Content>
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
          <Table striped celled>
            <Table.Body>
              {props.user.blogs.map(blog => {
                return (
                  <Table.Row key={blog.id}>
                    <Table.Cell>
                      <em><div key={blog.id}>{blog.title}</div></em>
                    </Table.Cell>
                  </Table.Row>
                )})}
            </Table.Body>
          </Table>
        </Card.Content>
      </Card>
    </div>
  )
}

export default UserView