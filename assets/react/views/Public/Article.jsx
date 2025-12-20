import React from "react";
import ArticleIllustration from "../../components/Article/ArticleIllustration";
import ArticleContentWrapper from "../../components/Article/ArticleContentWrapper";
import Element from "../../components/Article/Element/Element";

function Article(
    {
        article
    }
) {

    return (
        <>
            <ArticleIllustration
                title={article.articleTitle}
                readingTime={Math.round(article.elements.length * 1.5)}
                picture={article.illustration.imagePath}
            />
            <ArticleContentWrapper>
                {
                    article.elements.map((el, index) => (
                        <Element
                            key={index}
                            type={el.elementComponentName}
                            text={el.elementText}
                            href={el.elementHref}
                            imageSrc={el.image.imagePath}
                            isPreview={false}
                        />
                    ))
                }
            </ArticleContentWrapper>
        </>
    );
}

export default Article;