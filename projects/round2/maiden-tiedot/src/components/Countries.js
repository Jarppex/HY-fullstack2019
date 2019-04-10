import React from 'react'
import CountryInfo from './CountryInfo'

const Countries = ({countries, search}) => {

  const matchSearch = (element) =>
    element.name.toUpperCase().includes(search.toUpperCase())

  const countriesToShow = countries.filter(matchSearch)

  if (countriesToShow.length === 1)
  {
    return (
      countriesToShow.map(country =>
        <CountryInfo key={country.name} country={country} />)
    )
  }
  else if (countriesToShow.length > 10)
  {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else
  {
    return (
      countriesToShow.map(country =>
        <p key={country.name}>{country.name}</p>)
    )
  }
}

export default Countries