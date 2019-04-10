import React from 'react'

const CountryInfo = ({country}) => {

  const getLanguages = () => {
    return (
      country.languages.map(language =>
        <li key={language.name}>{language.name}</li>)
    )
  }

  return (
    <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>languages</h2>
        <ul>
            {getLanguages()}
        </ul>
        <img src={country.flag}
             alt="country flag"
             width="50%" height="50%"
        />
    </div>
  )
}

export default CountryInfo