import React from 'react';
import Person from "./Person"

const Persons = ( {persons, handler} ) => {
    return (
        <table>
            <tbody>
                {persons.map(person => <Person key={person.name} person={person} handler={handler}/>)}
            </tbody>
        </table>
    )
}

export default Persons