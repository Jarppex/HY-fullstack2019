import React from 'react'
import { connect } from 'react-redux'
import { filterAnecdotes } from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    props.filterAnecdotes(event.target.value)
  }
  
  const style = {
    margin: 10,
    marginLeft: 0
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterAnecdotes
}

export default connect(
  null,
  mapDispatchToProps
  )(Filter)