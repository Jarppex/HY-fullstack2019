import React from 'react'
import Person from './Person'
import Button from './Button'

const Persons = ({persons, limit, callServer}) => {

  const deleteNumber = (person) => {
    const result = window.confirm(`Poistetaanko ${person.name}?`)
    if (result) { callServer('delete', person) }
  }

  const matchFilter = (element) =>
    element.name.toUpperCase().startsWith(limit.toUpperCase())

  const personsToShow = persons.filter(matchFilter)

  return (
    personsToShow.map(person => {
      return (
        <div key={person.name}>
        <Person key={person.name} person={person} />
        <Button
        handleClick={() => deleteNumber(person)}
        text='poista'
        />
      </div>
      )
    })
  )
}

export default Persons