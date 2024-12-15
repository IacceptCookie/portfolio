import React from "react";
import "./Article.css";

function ArticleContentWrapper(
    {
        children,
    }
) {
    return (
        <div className="article-content-wrapper">
            {children}
        </div>
    );
}

export default ArticleContentWrapper;