import React, { useState } from 'react'


const App = () => {

  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '045-123456' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

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

  const allPersons = () => persons.map( person =>
        <p key={person.name}>{person.name} {person.number}</p> )

  return (
    <div>
      <h2>Puhelinluettelo</h2>
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
      <h2>Numerot</h2>
      {allPersons()}
    </div>
  )
}

export default App