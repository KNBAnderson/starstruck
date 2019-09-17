import React, { Component } from "react"
import { findRepos } from "./Api"
import "./App.css"

class SearchForm extends Component {
    constructor() {
        super()
        this.state = {
            resultsArray: null,
            value: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = event => {
        this.setState({ value: event.target.value })
    }

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
        const list = [...this.state.resultsArray].filter(
            repo => repo.stargazers_count > 127
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
                {this.state.resultsArray && this.renderList()}
            </div>
        )
    }
}

export default SearchForm
