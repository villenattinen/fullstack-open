import axios from 'axios'

const getWeather = async (cityName) => {
    const request = axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${
            cityName
        }&appid=${
            process.env.REACT_APP_API_KEY
        }&units=metric`
    )
    return await request.then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export  
export default { getWeather }
