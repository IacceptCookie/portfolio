import React, { useState, useEffect } from "react";
import TitleUpdater from "../tools/TitleUpdater";
import NotFound from "../views/Public/NotFound";
import { useParams } from "wouter";
import { getArticleBySlug } from "../services/api/Articles";
import Article from "../views/Public/Article";
import Loading from "../components/Loading/Loading";

function ArticleRoute() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchArticle() {
            setLoading(true);
            try {
                const response = await getArticleBySlug(slug);
                const data = await response.json();
                setArticle(data);
            } catch (err) {
                setArticle(null);
            } finally {
                setLoading(false);
            }
        }
        fetchArticle();
    }, [slug]);

    if (loading) {
        return <Loading />;
    }

    if (!article) {
        return (
            <>
                <TitleUpdater title="404: Not Found" />
                <NotFound />
            </>
        );
    }

    return (
        <>
            <TitleUpdater title={article.articleTitle} />
            <Article article={article} />
        </>
    );
}

export default ArticleRoute;