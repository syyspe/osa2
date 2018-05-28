import React from 'react';

const Person = ( {person, handler} ) => {
    return (
        <tr>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button id={person.id} onClick={handler}>Poista</button></td>
        </tr>
    )
}

export default Person