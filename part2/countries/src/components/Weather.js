import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ city }) => {
    const [weather, setWeather] = useState('')
    const imgSrcUrl = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`

    useEffect(() => {
        weatherService
            .getWeather(city)
            .then(response => setWeather({
                temp: response.main.temp,
                wind: response.wind.speed,
                icon: response.weather[0].icon
            }))
        console.log('weather data fetched')
    }, [city])

    return(
        <div>
            <h2>Weather in {city}</h2>
            <div>
                temperature {weather.temp} Celsius
            </div>
            <img src={weather.icon ? imgSrcUrl : ''} alt='' />
            <div>
                wind {weather.wind} m/s
            </div>
        </div>
    )
}

export default Weather
