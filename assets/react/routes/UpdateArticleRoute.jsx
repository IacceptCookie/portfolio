import React, { useState, useEffect } from "react";
import TitleUpdater from "../tools/TitleUpdater";
import NotFound from "../views/Public/NotFound";
import { useParams } from "wouter";
import { getArticleBySlug } from "../services/api/Articles";
import Update from "../views/Editor/Article/Update";
import Loading from "../components/Loading/Loading";

function UpdateArticleRoute() {
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

    const formattedArticle = {
        id: article.id,
        title: article.articleTitle,
        description: article.articleDescription,
        categories: article.categories,
        tags: article.tags.map((tag) =>
            ({
                id: tag.id,
                title: tag.tagLabel,
                colorCode: tag.tagColor
            })
        ),
        elements: article.elements.map((element) => ({
            text: element.elementText,
            type: element.elementComponentName,
            order: element.elementNumber,
            image: element.image.imagePath,
            href: element.elementHref,
        })),
        thumbnail: article.illustration.imagePath,
        visibility: article.isPublic ? 'public' : 'private',
    };

    console.log('formattedArticle : ', formattedArticle);

    return (
        <>
            <TitleUpdater title={`Modification ${article.articleTitle}`} />
            <Update article={formattedArticle} />
        </>
    );
}

export default UpdateArticleRoute;