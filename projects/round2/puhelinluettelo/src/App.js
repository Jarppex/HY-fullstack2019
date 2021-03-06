import React, { useState, useEffect } from 'react'
import numberService from './services/numbers'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  useEffect( () => callServer('get'), [] )

  const [ persons, setPersons ] = useState([])
  const [ message, setMessage ] = useState('')
  const [ messageColor, setMessageColor ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ limit, setLimit ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleLimitChange = (event) => setLimit(event.target.value)

  const sameName = (element) => element.name === newName

  const showMessage = (message, person) => {
    if (message === 'get')
    {
      setMessage(`Numerot ladattin onnistuneesti`)
      setMessageColor('green')
    }
    if (message === 'post')
    {
      setMessage(`Lisättiin ${newName}`)
      setMessageColor('green')
    }
    if (message === 'postError')
    {
      setMessage(person.response.data.error)
      setMessageColor('red')
    }
    if (message === 'put')
    {
      setMessage(`Muokattiin henkilöä ${newName}`)
      setMessageColor('green')
    }
    if (message === 'delete')
    {
      setMessage(`Poistettiin ${person.name}`)
      setMessageColor('green')
    }
    if (message === 'error')
    {
      setMessage(`Henkilö ${newName} on jo poistettu`)
      setMessageColor('red')
    }
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const callServer = (method, person) => {
    if (method === 'get')
    {
      numberService.getAll()
      .then(response => {
        showMessage('get')
        setPersons(response.data)
      })
    }
    if (method === 'post')
    {
      const personObject = { name: newName, number: newNumber }
      numberService.create(personObject)
      .then(response => {
        showMessage('post')
        setPersons(persons.concat(response.data))
      })
      .catch(error => {
        showMessage('postError', error)
      })
    }
    if (method === 'put')
    {
      const personToChange = persons.find(sameName)
      personToChange.number = newNumber
      numberService.update(personToChange.id, personToChange)
      .then(response => {
        showMessage('put')
        setPersons(persons.map(element =>
          element.id !== personToChange.id ? element : response.data))
      })
      .catch(() => {
        showMessage('error')
        setPersons(persons.filter(element =>
          element.id !== personToChange.id))
      })
    }
    if (method === 'delete')
    {
      numberService.remove(person.id)
      .then(() => {
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
      <Notification message={message} color={messageColor} />
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