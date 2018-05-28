import React from "react";
import axios from "axios";
import FilterForm from "./components/FilterForm";
import Countries from "./components/Countries";

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            countries: [],
            filter: ""
        }

    }

    componentDidMount() {
        axios
            .get("https://restcountries.eu/rest/v2/all")
            .then(response => {
                this.setState({countries: response.data})
            })
    }

    handleFilterChange = (event) => {
        this.setState({filter: event.target.value.toLowerCase()})
    }

    handleCountryClick = (event) => {
        event.preventDefault()
        this.setState({filter: event.target.id.toLowerCase()})
    }

    getCountries() {
        let countriesCopy = [...this.state.countries]
        return countriesCopy.filter(country => country.name.toLowerCase().includes(this.state.filter))
    }

    render() {
        return (
            <div>
                <FilterForm text="Find countries" value={this.state.filter} handler={this.handleFilterChange} />
                <Countries countries={this.getCountries()} handlerClick={this.handleCountryClick} />  
            </div>
        )
    }
}

export default App