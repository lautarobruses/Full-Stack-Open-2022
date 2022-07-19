import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Filter from './Filter'
import Countries from './Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [ filter, setFilter ] = useState('')
  const [ showAll, setShowAll ] = useState(true)

  useEffect(() => {
    axios
        .get('https://restcountries.com/v3.1/all')
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
    if (event.target.value === '')
      setShowAll(true)
    else
      setShowAll(false)
  }

  const countriesFiltered = () => {
    let aux = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()))
    return aux  
  }

  const countriesToShow = showAll ? countries : countriesFiltered()

  const showInfoOf = (name) => {
    setFilter(name)
  }
      
  return (
    <>
      <h1>Data for countries</h1>
      <Filter text='Find countries: ' value={filter} onChange={handleFilterChange} /> 
      <Countries countries={countriesToShow} length={countriesToShow.length} showInfoOf={showInfoOf} />
    </>
  )
}

export default App