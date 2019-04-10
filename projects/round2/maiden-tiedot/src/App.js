import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  const handleSearchChange = (event) => setSearch(event.target.value)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  
  return (
    <div>
      find countries
      <Filter search={search} handleSearchChange={handleSearchChange} />
      <Countries 
        countries={countries}
        search={search}
        setSearch={setSearch}
      />
    </div>
  )
}

export default App