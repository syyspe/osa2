import React from 'react'
import Persons from "./components/Persons"
import FilterForm from './components/FilterForm'
import Notification from "./components/Notification"
import personService from "./services/persons"

const ERROR = "error"
const INFO = "info"

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumber: '',
            filter: '',
            notificationType: null,
            notificationMessage: null
        }
    }

    componentDidMount() {
        this.synchFromServer()
    }

    setNotification(message, type) {
        this.setState({notificationType: type, notificationMessage: message})
        
        setTimeout(() => {
            this.setState({notificationType: null, notificationMessage: null})
        }, 5000)

    }

    synchFromServer() {
        personService
            .getAll()
            .then(response => {
                this.setState({persons: response})
            })
            .catch(error => {
                console.log(error)
                this.setNotification(`Henkilöiden lataaminen palvelimelta epäonnistui: ${error}`, ERROR)
            })
    }

    getPersons() {
        let personsCopy = [...this.state.persons]
        return personsCopy.filter(person => person.name.toLowerCase().includes(this.state.filter))
    }

    addPerson = (event) => {
        event.preventDefault()
        
        const newPerson = {
            name: this.state.newName,
            number: this.state.newNumber
        }

        // Käsitellään henkilöt case-sensitiivisesti, eli esim. Erkki ja erkki ovat eri henkilöitä.
        // Tiedä sitten onko järkevää, mutta tehtävän kannalta joku päätös piti tehdä.
        const existingPerson = this.state.persons.find(p => p.name === this.state.newName)
        if (existingPerson !== undefined) {
            this.updatePerson(existingPerson.id, newPerson)
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
                this.setNotification(`Henkilön lisääminen epäonnistui: ${error}`, ERROR)
            })
        
        this.setNotification(`Lisättiin ${newPerson.name}`, INFO)
    }

    updatePerson(id, person) {
        if(window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
            personService
                .update(id, person)
                .then(response => {
                        this.setState({
                            persons: this.state.persons.map(person => person.id === response.id 
                                ? response 
                                : person)
                    })
                
                })
                .catch(error => {
                    console.log(error)
                    this.setNotification(`${person.name} on todennäköisesti poistettu, kokeile painaa lisää nappia uudelleen.`, ERROR)
                })
        }

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
                //alert(`Henkilön poistaminen epäonnistui: ${error}`)
                this.setNotification(`Henkilön poistaminen epäonnistui: ${error}`, ERROR)
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
                <Notification message={this.state.notificationMessage} type={this.state.notificationType} />
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
                        <button type="submit" onClick={this.addPerson}>lisää</button>
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