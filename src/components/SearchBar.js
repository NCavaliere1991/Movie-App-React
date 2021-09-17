import React from "react";

function SearchBar(props) {
    return <form>
        <input className="search" value={props.value} onChange={(event) => props.setSearchTerm(event.target.value)} placeholder="Search"></input>
    </form>
}

export default SearchBar;