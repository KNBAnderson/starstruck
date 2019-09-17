import React, { Component } from "react"
import { findRepos } from "./Api"
import "./App.css"

//I would usually have the results in a seperate component, but chose to keep it all together for expediency during the interview
class SearchForm extends Component {
    constructor() {
        super()
        this.state = {
            resultsArray: null,
            value: "",
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    //This collects the value in the text input and updates it with every change made
    handleChange = event => {
        this.setState({ value: event.target.value })
    }

    //This will trigger when the submit buttonis clicked. It will call the promise made from the findRepos function, and use .then to resolve it by setting the returned data to state.
    handleSubmit = event => {
        event.preventDefault()
        findRepos(this.state.value).then(
            result => {
                this.setState({ resultsArray: result })
            },
            error => {
                console.log(error)
            }
        )
    }

    renderList = () => {
      //This will filter out all results in the resultsArray that represent repos with less than 127 stars
        const list = [...this.state.resultsArray].filter(
            repo => repo.stargazers_count >= 127
        )
        return list.length ? (
          <ul>
                {list.map(repo => (
                  <li>
                        <a href={repo.clone_url}>{repo.name}</a>
                    </li>
                ))}
            </ul>
        ) : (
          // If the nothing is found to meet all the requirements it will render differently
            <p>No results found :(</p>
        )
    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Starstruck Search</h1>
                    <input
                        className="searchInput"
                        name="search"
                        type="text"
                        onChange={this.handleChange}
                    />
                    <br />
                    <button type="submit">Search!</button>
                </form>
                {/* This short circuit will act as a conditional and only the returned value of renderList once resultArray has a truthy value in it */}
                {this.state.resultsArray && this.renderList()}
            </div>
        )
    }
}

export default SearchForm
