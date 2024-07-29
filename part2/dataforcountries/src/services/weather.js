import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (lat, lon) => {
  const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`)
  return request.then(response => response.data)
}

export default { getWeather }