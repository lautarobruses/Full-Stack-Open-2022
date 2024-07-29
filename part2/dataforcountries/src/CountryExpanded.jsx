import { useEffect, useState } from "react";

import weatherService from "./services/weather";

const CountryExpanded = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const languages = Object.values(country.languages);

  useEffect(() => {
    const lat = country.capitalInfo.latlng[0]
    const lon = country.capitalInfo.latlng[1]

    weatherService
      .getWeather(lat, lon)
      .then((currentWeather) => {
        setWeather(currentWeather);
      });
  }, []);

  return (
    <section>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        width='300'
        height='auto'
        alt={`${country.capital}'s flag`}
      />
      {weather
        ? <>
            <h3>Weather in {country.capital}</h3>
            <p>Temperature: {weather.main.temp} Celcius</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='' />
            <p>
              Wind: {weather.wind.speed} m/s
            </p>
          </>
        : null
      }
    </section>
  );
};

export default CountryExpanded;
