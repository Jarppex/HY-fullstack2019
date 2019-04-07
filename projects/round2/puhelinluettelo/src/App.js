import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const sameElement = (element) => element.name === newName

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find(sameElement) === undefined)
    {
      const personObject = { name: newName }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
    else
    {
      window.alert(`${newName} on jo luettelossa`)
    }
  }

  const allPersons = () => persons.map( person =>
        <p key={person.name}>{person.name}</p> )

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
          <button type="submit">lisää</button>
        </div>
      </form>
      <h2>Numerot</h2>
      {allPersons()}
    </div>
  )

}

export default App