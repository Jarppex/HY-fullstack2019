import React, { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  useEffect( () => callServer('get'), [] )

  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ limit, setLimit ] = useState('')
  const [ message, setMessage ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleLimitChange = (event) => setLimit(event.target.value)

  const sameName = (element) => element.name === newName

  const showMessage = (message, person) => {
    if (message === 'get')
    {
      setMessage(`Numerot ladattin onnistuneesti`)
    }
    if (message === 'post')
    {
      setMessage(`Lisättiin ${newName}`)
    }
    if (message === 'put')
    {
      setMessage(`Muokattiin henkilöä ${newName}`)
    }
    if (message === 'delete')
    {
      setMessage(`Poistettiin ${person.name}`)
    }
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const callServer = (method, person) => {
    if (method === 'get')
    {
      numberService.getAll().then(response => {
        showMessage('get')
        setPersons(response.data)
      })
    }
    if (method === 'post')
    {
      const personObject = { name: newName, number: newNumber }
      numberService.create(personObject).then(response => {
        showMessage('post')
        setPersons(persons.concat(response.data))
      })
    }
    if (method === 'put')
    {
      const personToChange = persons.find(sameName)
      personToChange.number = newNumber
      numberService.update(personToChange.id, personToChange).then(response => {
        showMessage('put')
        setPersons(persons.map(element =>
          element.id !== personToChange.id ? element : response.data))
      })
    }
    if (method === 'delete')
    {
      numberService.remove(person.id).then(() => {
        showMessage('delete', person)
        setPersons(persons.filter(element =>
          element.id !== person.id))
      })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (newName !== '')
    {
      if (persons.find(sameName) === undefined)
      {
        callServer('post')
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
              callServer('put')
            }
          }
          else
          {
            callServer('put')
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
      <Notification message={message} />
      <Filter limit={limit} handleLimitChange={handleLimitChange} />
      <h3>lisää uusi</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numerot</h3>
      <Persons
        persons={persons}
        limit={limit}
        callServer={callServer} />
    </div>
  )
}

export default App