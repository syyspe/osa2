import React from "react"

const Country = ( {country} ) => {
    return (
        <div>
            <h2>{country.name} {country.nativeName}</h2>
            <div>Capital: {country.capital}</div>
            <div>Population: {country.population}</div>
            <p />
            <img src={country.flag} width="320" height="240" alt="austrian flag" />
        </div>
    )

}
export default Country