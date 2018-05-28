import React from "react";
import Country from "./Country";

const Countries = ( {countries, handlerClick} ) => {
    if(countries.length > 10) {
        return (
            <div>Too many matches, specify another filter</div>
        )
    }

    if(countries.length > 1) {
        return (
            <div>
                <p />
                {countries.map(country => <div key={country.alpha2Code} id={country.name} onClick={handlerClick}>{country.name}</div>)}
            </div>
        )
    }

    if(countries.length === 1) {
        return (
            <Country country={countries[0]} />
        )
    }

    return (
        <div />
    )
}

export default Countries