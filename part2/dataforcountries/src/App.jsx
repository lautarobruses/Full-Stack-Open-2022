import { useEffect, useState } from "react";

import coutryService from './services/countries'

import Filter from "./Filter";
import Countries from "./Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    coutryService
      .getAll()
      .then((allCountries) => {
        setCountries(allCountries);
      });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setShowAll(event.target.value === "");
  };

  const countriesToShow = showAll
    ? countries
    : countries.filter((country) => 
      country.name.common.toLowerCase().includes(filter.toLowerCase())
    );

  const showInfoOf = (name) => {
    setFilter(name);
  };

  return (
    <>
      <h1>Data for countries</h1>
      <Filter
        text='Find countries: '
        value={filter}
        onChange={handleFilterChange}
      />
      <Countries
        countries={countriesToShow}
        length={countriesToShow.length}
        showInfoOf={showInfoOf}
      />
    </>
  );
};

export default App;
