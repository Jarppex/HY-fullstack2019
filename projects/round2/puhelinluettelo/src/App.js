import React, { useState } from 'react'


const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Martti Tienari', number: '040-123456' },
    { name: 'Arto Järvinen', number: '040-123456' },
    { name: 'Lea Kutvonen', number: '040-123456' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ limit, setLimit ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleLimitChange = (event) => setLimit(event.target.value)

  const sameElement = (element) => element.name === newName

  const addPerson = (event) => {
    event.preventDefault()
    if (newName !== '')
    {
      if (persons.find(sameElement) === undefined)
      {
        const personObject = { name: newName, number: newNumber }
        setPersons(persons.concat(personObject))
      }
      else
      {
        if (newNumber !== '')
        {
          const copyPersons = persons.map(element => element)
          const samePerson = copyPersons.find(sameElement)
          samePerson.number = newNumber
          setPersons(copyPersons)
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

  const matchFilter = (element) =>
    element.name.toUpperCase().startsWith(limit.toUpperCase())

  const showPersons = () => {
    const personsToShow = persons.filter(matchFilter)
    return (
      personsToShow.map(person => <p key={person.name}>{person.name} {person.number}</p>)
    )
  }
        

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <div>
        rajaa näytettäviä <input
        value={limit}
        onChange={handleLimitChange}
        />
      </div>
      <h3>lisää uusi</h3>
      <form onSubmit={addPerson}>
        <div>
          nimi: <input
          value={newName}
          onChange={handleNameChange}
          />
        </div>
        <div>
          numero: <input
          value={newNumber}
          onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
      <h3>Numerot</h3>
      {showPersons()}
    </div>
  )
}

export default App