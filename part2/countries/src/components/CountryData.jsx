import { useState, useEffect } from 'react'
import axios from 'axios'
import weatherIcons from '../data/weatherIcons.json'

const CountryData = ({country}) => {
    const [ weatherInfo, setWeatherInfo ] = useState(null) 

    const [latitude, longitude] = country.latlng
    const WEATHER_API_URI = `https://api.open-meteo.com/v1/forecast?current=is_day,weather_code,temperature_2m,wind_speed_10m&timezone=auto&latitude=${latitude}&longitude=${longitude}`

    useEffect(()=> {
        axios
        .get(WEATHER_API_URI)
        .then(response => setWeatherInfo(response.data.current))
    }, [WEATHER_API_URI])

    const [ time, interval, isDay, weatherCode, temperature, windSpeed] = weatherInfo
      ? Object.values(weatherInfo)
      : []

    console.log(`values are: time ${time}, interval: ${interval}, isDay: ${isDay}, weatherCode: ${weatherCode}, temperature: ${temperature}, windSpeed: ${windSpeed} `)

      return (  
    <>
    <h1>{country.name.common}</h1>
    <div>
        Capital: <span>{country.capital}</span>
    </div>
    <div>
        Area:    <span>{country.area}</span>
    </div>
    <div>
        <h2>languages:</h2>
        <ul>
            {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
        </ul>
        <img style={{width: 150, height:100}} src={country.flags.png} alt={country.flags.alt} />
    </div>
    <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {temperature} Celsius</p>
        <img style={{backgroundColor: 'lightgray', borderRadius: 10}}src={weatherIcons[weatherCode]?.[isDay]?.image} alt={weatherIcons[weatherCode]?.[isDay]?.description} />
        <p>{weatherIcons[weatherCode]?.[isDay]?.description}</p>
        <p>Wind {windSpeed} km/h</p>
        <p> time now: {time}  |  {isDay? 'Day' : 'Night'}</p>
    </div>
    </>
    )
}

export default CountryData