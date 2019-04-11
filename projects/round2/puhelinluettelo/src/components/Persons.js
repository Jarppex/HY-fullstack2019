import React from 'react'
import numberService from '../services/numbers'
import Person from './Person'
import Button from './Button'

const Persons = ({persons, setPersons, limit}) => {

  const deleteNumber = (persons, setPersons, person) => {
    const result = window.confirm(`Poistetaanko ${person.name}?`)
    if (result)
    {
        numberService.remove(person.id).then(response =>
            console.log('vastaus poistoon', response))
        const copyPersons = persons.filter(element =>
            element.id !== person.id)
        console.log('numerot poiston jälkeen', copyPersons)
        setPersons(copyPersons)
    }
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
        handleClick={() => deleteNumber(persons, setPersons, person)}
        text='poista'
        />
      </div>
      )
    })
  )
}

export default Persons