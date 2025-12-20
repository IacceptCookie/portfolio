import React from "react";
import "./Article.css";
import EditorHeader from "../../../components/Editor/EditorHeader/EditorHeader";
import ArticleEditor from "../../../components/Editor/ArticleEditor/ArticleEditor";

function Update(
    {
        article
    }
) {
    return (
        <>
            <EditorHeader warning={true} />
            <ArticleEditor updateArticle={article} />
        </>
    );
}

export default Update;