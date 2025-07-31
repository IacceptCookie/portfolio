import React from "react";
import "./Search.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function SearchBar(
    {
        inputName,
        updateTextState,
        placeholder = "Recherchez",
        value = "",
    }
) {
    return (
        <div
            className="searchbar"
        >
            <input
                type="text"
                className="searchbar__search-text"
                name={inputName}
                placeholder={placeholder}
                value={value}
                onChange={(event) => updateTextState(event.target.value)}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className="searchbar__search-icon" />
        </div>
    );
}

export default SearchBar;