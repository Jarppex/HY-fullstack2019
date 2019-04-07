import React from 'react'

const Filter = ({limit, handleLimitChange}) => {
    return (
      <div>
        rajaa näytettäviä <input
        value={limit}
        onChange={handleLimitChange}
        />
      </div>
    )
  }

export default Filter