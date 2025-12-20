import React from "react";
import "./Result.css";
import EditorTagResult from "./Editor/TagResult";
import EditorCategoryResult from "./Editor/CategoryResult";
import EditorArticleResult from "./Editor/ArticleResult";
import ArticleResult from "./ArticleResult";

function Result(
    {
        type,
        resultData,
    }
)
{
    const variants = {
        article: <ArticleResult resultData={resultData} />,
        //tag: <TagResult resultData={resultData} />,
        //category: <CategoryResult resultData={resultData} />,
        editorArticle: <EditorArticleResult resultData={resultData} />,
        editorTag: <EditorTagResult resultData={resultData} />,
        editorCategory: <EditorCategoryResult resultData={resultData} />
    };

    return variants[type]
}

export default Result;