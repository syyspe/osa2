import React from 'react';
import axios from "axios"
import Persons from "./components/Persons";
import FilterForm from './components/FilterForm';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: ''
        }
    }

    componentDidMount() {
        axios
            .get("http://localhost:3001/persons")
            .then(response => {
                this.setState({persons: response.data})
            })
    }

    getPersons() {
        let personsCopy = [...this.state.persons]
        return personsCopy.filter(person => person.name.toLowerCase().includes(this.state.filter))
    }

    addEntry = (event) => {
        event.preventDefault()
        
        if(this.state.persons.filter(p => p.name === this.state.newName).length > 0) {
            alert("Nimi on jo luettelossa.")
            return
        }

        const personObject = {
            name: this.state.newName,
            phone: this.state.newNumber
        }

        const persons = this.state.persons.concat(personObject)
        this.setState({persons: persons, newName: "", newNumber: "", filter: ""})
    }

    handleNameChange = (event) => {
        this.setState({newName: event.target.value})
    }

    handleNumberChange = (event) => {
        this.setState({newNumber: event.target.value})
    }

    handleFilterChange = (event) => {
        this.setState({filter: event.target.value.toLowerCase()})
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <FilterForm text="rajaa näytettäviä" value={this.state.filter} handler={this.handleFilterChange} />
                <h2>Lisää uusi</h2>
                <form>
                    <div>
                        nimi: <input value={this.state.newName} onChange={this.handleNameChange} />
                    </div>
                    <div>
                        numero: <input value={this.state.newNumber} onChange={this.handleNumberChange} />
                    </div>
                    <div>
                        <button type="submit" onClick={this.addEntry}>lisää</button>
                    </div>
                </form>
                <h2>Numerot</h2>
                <div>
                    <Persons persons={this.getPersons()} />
                </div>
            </div>
        )
    }
}

export default App