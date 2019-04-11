import React, { useEffect } from 'react'
import axios from 'axios'
import WeatherInfo from './WeatherInfo'

const CountryInfo = ({country, weather, setweather}) => {

    useEffect(() => {
        axios
        .get(`http://api.apixu.com/v1/current.json?key=3cebc05bdce940d6a36123915191004&q=${country.capital}`)
        .then(response => {
            console.log('serverin vastaus on=', response, 'ja data=', response.data)
            setweather(response.data)
        })
      }, [country.name])

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
            <WeatherInfo weather={weather} />
        </div>
    )
}

export default CountryInfo