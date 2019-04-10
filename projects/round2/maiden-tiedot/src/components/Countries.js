import React from 'react'
import CountryInfo from './CountryInfo'
import Button from './Button'

const Countries = ({countries, search, setSearch}) => {

  const matchSearch = (element) =>
    element.name.toUpperCase().includes(search.toUpperCase())

  const showCountryInfo = (country) =>
    setSearch(country.name)

  const countriesToShow = countries.filter(matchSearch)

  if (countriesToShow.length === 1)
  {
    return (
      <CountryInfo
        key={countriesToShow[0].name}
        country={countriesToShow[0]} />
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
        <div key={country.name}>
          {country.name}
          <Button
          handleClick={() => showCountryInfo(country)}
          text='show' />
        </div>)
    )
  }
}

export default Countries