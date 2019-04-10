import React from 'react'

const Filter = ({search, handleSearchChange}) => {
  return (
    <input type="text" value={search} onChange={handleSearchChange} />
  )
}

export default Filter