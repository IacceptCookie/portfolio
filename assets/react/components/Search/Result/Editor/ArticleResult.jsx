import React from "react";
import "../Result.css";

function ArticleResult(
    {
        resultData,
    }
)
{
    return (
        <div
            style={{backgroundColor: "#0E1084", borderColor: "#7577CD"}}
            className="editor-article-result result"
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
        </div>
    );
}

export default ArticleResult;