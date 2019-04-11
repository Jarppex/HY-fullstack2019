import React from 'react'

const WeatherInfo = ({weather}) => {
    return (
        <div>
            <h2>Weather in {weather.location.name}</h2>
            <p><b>temperature:</b> {weather.current.temp_c} Celsius</p>
            <img src={weather.current.condition.icon}
                alt="weathercondition icon"
                width="30%" height="30%"
            />
            <p><b>wind:</b> {weather.current.wind_kph} kph direction {weather.current.wind_dir}</p>
        </div>
    )
}

export default WeatherInfo