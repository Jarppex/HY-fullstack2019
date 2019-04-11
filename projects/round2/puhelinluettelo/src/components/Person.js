import React from 'react'

const Person = ({person}) => {
    return (
        <div>
            <p key={person.name}>{person.name} {person.number}</p>
        </div>
    )
}

export default Person