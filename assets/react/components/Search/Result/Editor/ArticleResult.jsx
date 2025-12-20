import React from "react";
import "../Result.css";
import {Link} from "wouter";

function ArticleResult(
    {
        resultData,
    }
)
{
    return (
        <Link
            style={{backgroundColor: "#0E1084", borderColor: "#7577CD"}}
            className="editor-article-result result"
            to={resultData.slug}
        >
            <p className="editor-article-result__title">
                {resultData.title}
            </p>
            <p
                style={{backgroundColor: "#7577CD"}}
                className="editor-article-result__reading-time"
            >
                {resultData.readingTime} minutes
            </p>
        </Link>
    );
}

export default ArticleResult;