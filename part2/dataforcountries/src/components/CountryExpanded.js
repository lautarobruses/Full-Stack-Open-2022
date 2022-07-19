import axios from "axios";
import { useEffect, useState} from "react";

const CountryExpanded = ({country}) => {
    const [ weather, setWeather ] = useState('') 
    const languages = Object.values(country.languages)
    const api_key = process.env.REACT_APP_API_KEY
    const cityName = country.capital

    useEffect(() => {
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${cityName}`)
            .then(response => {
                setWeather(response.data.current)
            })
    }, [])

    return (
        <section>
            <h2>{country.name.common}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {languages.map(language => (
                        <li key={language} >{language}</li>
                    )
                )}
            </ul>
            <img src={country.flags.svg} width="300" height="auto" alt={`${country.capital}'s flag`} />
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {weather.temperature} Celcius</p>
            <img src={weather.weather_icons} alt='' />
            <p>Wind: {weather.wind_speed} km/h direction {weather.wind_dir}</p>
        </section>
    )
}

export default CountryExpanded