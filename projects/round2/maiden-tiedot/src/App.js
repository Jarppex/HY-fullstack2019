import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ weather, setweather ] = useState({})
  const [ search, setSearch ] = useState('')

  const handleSearchChange = (event) => setSearch(event.target.value)

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data)
    })
  }, [])

  useEffect(() => {
    axios.get(`http://api.apixu.com/v1/current.json?key=3cebc05bdce940d6a36123915191004&q=Helsinki`).then(response => {
      setweather(response.data)
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
        weather={weather}
        setweather={setweather}
      />
    </div>
  )
}

export default App