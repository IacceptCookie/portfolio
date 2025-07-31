import React from "react";
import "./Article.css";
import EditorHeader from "../../../components/Editor/EditorHeader/EditorHeader";
import ArticleEditor from "../../../components/Editor/ArticleEditor/ArticleEditor";

function Create() {
    return (
        <>
            <EditorHeader warning={true} />
            <ArticleEditor />
        </>
    );
}

export default Create;