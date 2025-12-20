import React from "react";
import "./Search.css";
import CommonSearchBar from "./CommonSearchBar";
import FilterSearchBar from "./FilterSearchBar";

function SearchBar(
    {
        inputName,
        updateTextState,
        placeholder = "Recherchez",
        value = "",
        type = "common",
        selectedTags,
        updateSelectedTags,
        selectedCategories,
        updateSelectedCategories,
        resultNumber,
    }
) {
    const searchBars = {
        common: <CommonSearchBar
            inputName={inputName}
            updateTextState={updateTextState}
            placeholder={placeholder}
            value={value}
        />,
        filter: <FilterSearchBar
            inputName={inputName}
            updateTextState={updateTextState}
            placeholder={placeholder}
            value={value}
            selectedTags={selectedTags}
            updateSelectedTags={updateSelectedTags}
            selectedCategories={selectedCategories}
            updateSelectedCategories={updateSelectedCategories}
            resultNumber={resultNumber}
        />
    }

    return searchBars[type];
}

export default SearchBar;