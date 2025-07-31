import React, {useEffect} from "react";
import {useArticlePreview} from "../providers/ArticlePreviewProvider";
import TitleUpdater from "../tools/TitleUpdater";
import NotFound from "../views/Public/NotFound";
import PrivateRoute from "../tools/PrivateRoute";
import Preview from "../views/Editor/Article/Preview";

function ArticlePreviewRoute() {
    const { contextArticle, setContextArticle } = useArticlePreview();

    useEffect(() => {
        if (!contextArticle) {
            const saved = sessionStorage.getItem("article");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    setContextArticle(parsed);
                } catch (e) {
                    console.error("Erreur parsing article :", e);
                }
            }
        }
    }, []);

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
