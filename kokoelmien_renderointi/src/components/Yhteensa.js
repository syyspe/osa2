import React from 'react';

const Yhteensa = ( {osat} ) => {
    return (
        <p>Yhteensä {osat.reduce((summa, osa) => summa + osa.tehtavia, 0)} tehtävää</p> 
    )

}

export default Yhteensa