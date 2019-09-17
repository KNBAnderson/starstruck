import React from "react";

import './App.css';

function SearchForm () {
  return (
    <form>
      <h1>Starstruck Search</h1>
      <input className="searchInput" name="search" type="text" />
    </form>
  );
}

export default SearchForm;
