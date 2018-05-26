import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App"
import './index.css';






const Yhteensa = (props) => {
    return (
        <div>
            <p>yhteensä {props.kurssi.osat[0].tehtavia 
                + props.kurssi.osat[1].tehtavia + props.kurssi.osat[2].tehtavia} tehtävää</p>
        </div>
    )
}

/*
const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
        {
            nimi: 'Reactin perusteet',
            tehtavia: 10,
            id: 1
        },
        {
            nimi: 'Tiedonvälitys propseilla',
            tehtavia: 7,
            id: 2
        },
        {
            nimi: 'Komponenttien tila',
            tehtavia: 14,
            id: 3
        }
    ]
}
*/

const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

ReactDOM.render(<App kurssit={kurssit} />, document.getElementById('root'));

