import React, { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'

const App = () => {

  useEffect(() => {
    numberService.getAll().then(response => {setPersons(response.data)})
  }, [])

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ limit, setLimit ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleLimitChange = (event) => setLimit(event.target.value)

  const sameName = (element) => element.name === newName

  const addPerson = (event) => {
    event.preventDefault()
    if (newName !== '')
    {
      if (persons.find(sameName) === undefined)
      {
        const personObject = { name: newName, number: newNumber }
        numberService.create(personObject).then(response => {
            console.log('vastaus luomiseen', response)
            setPersons(persons.concat(response.data))
        })
      }
      else
      {
        if (newNumber !== '')
        {
          const personToChange = persons.find(sameName)
          if (personToChange.number !== '')
          {
            const result = window.confirm(`${personToChange.name} on jo luettelossa, korvataanko vanha numero uudella?`)
            if (result)
            {
              personToChange.number = newNumber
              numberService.update(personToChange.id, personToChange).then(response => {
                console.log('muutoksen vastaus', response)
                setPersons(persons.map(element =>
                  element.id !== personToChange.id ? element : response.data))
              })
            }
          }
          else
          {
            personToChange.number = newNumber
            numberService.update(personToChange.id, personToChange).then(response => {
              console.log('muutoksen vastaus', response)
              setPersons(persons.map(element =>
                element.id !== personToChange.id ? element : response.data))
            })
          }
        }
        else
        {
          window.alert(`${newName} on jo luettelossa`)
        }
      }
    }
    else
    {
      window.alert(`nimi-kenttä on tyhjä`)
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Filter limit={limit} handleLimitChange={handleLimitChange} />
      <h3>lisää uusi</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numerot</h3>
      <Persons
        persons={persons} setPersons={setPersons} limit={limit}/>
    </div>
  )
}

export default App