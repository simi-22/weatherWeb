import React from 'react'

const Weather = ({ weather }) => {
    console.log(weather);
  return (
    <div id='weather'>
        <div>
            <div>{weather?.name}</div>
            <h2>{weather?.main.temp} / {weather?.main.temp + 273.15}</h2>
            <h3>{weather?.weather[0].description}</h3>
        </div>
    </div>
  )
}

export default Weather