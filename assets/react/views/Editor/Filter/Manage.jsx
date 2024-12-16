import { React, useState } from "react";
import "./Filter.css";
import EditorHeader from "../../../components/Editor/EditorHeader";
import SearchBar from "../../../components/Search/SearchBar";

function Manage() {
    const [searchText, updateSearchText] = useState("");

    return (
        <>
            <EditorHeader warning={true} />
            <p>Texte : {searchText}</p>
            <SearchBar
                inputName="search"
                updateTextState={updateSearchText}
                value={searchText}
                placeholder="Recherchez des filtres"
            />
        </>
    );
}

export default Manage;