import React from "react";
import "./Filter.css";
import EditorHeader from "../../../components/Editor/EditorHeader/EditorHeader";
import FilterEditor from "../../../components/Editor/FilterEditor/FilterEditor";

function Create() {
    return (
        <>
            <EditorHeader warning={true} />
            <FilterEditor />
        </>
    );
}

export default Create;