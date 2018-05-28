import React from 'react'
import Persons from "./components/Persons"
import FilterForm from './components/FilterForm'
import personService from "./services/persons"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            error: ''
        }
    }

    componentDidMount() {
        this.synchFromServer()
    }

    synchFromServer() {
        personService
            .getAll()
            .then(response => {
                this.setState({persons: response})
            })
            .catch(error => {
                console.log(error)
                alert(`Henkilöiden lataaminen palvelimelta epäonnistui: ${error}`)
            })

    }

    getPersons() {
        let personsCopy = [...this.state.persons]
        return personsCopy.filter(person => person.name.toLowerCase().includes(this.state.filter))
    }

    addEntry = (event) => {
        event.preventDefault()
        
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        const personToAdd = this.state.persons.find(p => p.name === this.state.newName)
        if (personToAdd !== undefined) {
            if(window.confirm(`${personToAdd.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
                personService
                    .update(personToAdd.id, newPerson)
                    .then(response => {
                            this.setState({
                                persons: this.state.persons.map(person => person.id === response.id ? response : person)
                        })
                    
                    })
                    .catch(error => {
                        console.log(error)
                        alert(`Henkilön muokkaaminen epäonnistui: ${error}`)
                    })
            }
            return
        }

        
        personService
            .create(newPerson)
            .then(response => {
                this.setState({
                    persons: this.state.persons.concat(response), 
                    newName: "", 
                    newNumber: "", 
                    filter: ""})
            })
            .catch(error => {
                console.log(error)
                alert(`Henkilön lisääminen epäonnistui: ${error}`)
            })
    }

    delete = (event) => {
        event.preventDefault()
        const personToRemove = this.state.persons.find(person => person.id === parseInt(event.target.id, 10))
 
        if(personToRemove === undefined || !window.confirm(`Poistetaanko ${personToRemove.name}?`)) {
            return
        }

        personService
            .remove(event.target.id)
            .then(response => {
                console.log(response)
                this.synchFromServer()
            })
            .catch(error => {
                console.log(error)
                alert(`Henkilön poistaminen epäonnistui: ${error}`)
            })
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
                    <Persons persons={this.getPersons()} handler={this.delete} />
                </div>
            </div>
        )
    }
}

export default App