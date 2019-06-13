import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Table } from 'semantic-ui-react'
import { getUsers } from '../reducers/usersReducer'

const UsersView = (props) => {

  useEffect(() => {
    props.getUsers()
  }, [])

  return (
    <div>
      <Table basic='very' celled collapsing>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Users</Table.HeaderCell>
            <Table.HeaderCell>Blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.users.map(user => {
            return (
              <Table.Row key={user.id}>
                <Table.Cell>
                  <Header as='h4' image>
                    <Header.Content>
                      <Link to={`/users/${user.id}`}>{user.username}</Link>
                      <Header.Subheader>
                        {user.name}
                      </Header.Subheader>
                    </Header.Content>
                  </Header>
                </Table.Cell>
                <Table.Cell>
                  {user.blogs.length}
                </Table.Cell>
              </Table.Row>
            )}
          )}
        </Table.Body>
      </Table>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    users: state.users
  }
}

const mapDispatchToProps = {
  getUsers
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersView)