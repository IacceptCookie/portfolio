import React from "react";
import {useArticlePreview} from "../providers/ArticlePreviewProvider";
import TitleUpdater from "../tools/TitleUpdater";
import NotFound from "../views/Public/NotFound";
import PrivateRoute from "../tools/PrivateRoute";
import Preview from "../views/Editor/Article/Preview";

function ArticlePreviewRoute() {
    const { contextArticle } = useArticlePreview();

    // contextArticle is automatically loaded from sessionStorage by the provider
    if (!contextArticle) {
        return (
            <>
                <TitleUpdater title="404: Not found" />
                <NotFound />
            </>
        );
    }

    return (
        <PrivateRoute role="ROLE_EDITOR">
            <TitleUpdater title={contextArticle.title} />
            <Preview article={contextArticle} />
        </PrivateRoute>
    );
}

export default ArticlePreviewRoute;
