import React from "react";
import {useArticlePreview} from "../providers/ArticlePreviewProvider";
import TitleUpdater from "../tools/TitleUpdater";
import NotFound from "../views/Public/NotFound";
import PrivateRoute from "../tools/PrivateRoute";
import Preview from "../views/Editor/Article/Preview";

function ArticlePreviewRoute() {
    const { contextArticle, isLoading } = useArticlePreview();

    // Wait for IndexedDB to load
    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '50vh',
                fontSize: '1.2rem',
                color: '#666'
            }}>
                Chargement...
            </div>
        );
    }

    // contextArticle is loaded from IndexedDB by the provider
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
