import React from 'react'

const Person = ({person}) =>
  <p key={person.name}>{person.name} {person.number}</p>

const Persons = ({persons, limit}) => {

  const matchFilter = (element) =>
    element.name.toUpperCase().startsWith(limit.toUpperCase())

  const personsToShow = persons.filter(matchFilter)

  return (
    personsToShow.map(person =>
      <Person key={person.name} person={person} />)
  )
}

export default Persons