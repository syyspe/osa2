import React from 'react';
import Otsikko from "./components/Otsikko"
import Kurssi from "./components/Kurssi"


const App = ( {kurssit} ) => {

    return (
        <div>
            <Otsikko nimi="Opetusohjelma" />
            {kurssit.map(kurssi => 
                <Kurssi key={kurssi.id} kurssi={kurssi} />
            )}
        </div>
    )
}

export default App