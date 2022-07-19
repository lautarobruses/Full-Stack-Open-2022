import Country from "./Country"
import CountryExpanded from "./CountryExpanded"

const Countries = ({countries,length,showInfoOf}) => {
    if (length === 1)
        return <CountryExpanded country={countries[0]} />
    else
        if (length > 10)
            return <p>Too many matches, specify another filter</p>
        else    
            return (
                <ul>
                    {countries.map(country => (
                            <Country key={country.name.common} name={country.name.common} showInfo={() => showInfoOf(country.name.common)}/>
                        )
                    )}
                </ul>
            )
}

export default Countries