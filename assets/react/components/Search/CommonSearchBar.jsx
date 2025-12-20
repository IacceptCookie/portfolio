import React from "react";
import "./Search.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function CommonSearchBar(
    {
        inputName,
        updateTextState,
        placeholder = "Recherchez",
        value = "",
        disabledMargin = false,
    }
) {
    return (
        <div
            className="searchbar"
            style={disabledMargin ? {} : {margin: "15px 0"}}
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

export default CommonSearchBar;