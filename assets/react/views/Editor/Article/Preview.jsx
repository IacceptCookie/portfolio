import React from "react";
import "./Article.css";
import Element from "../../../components/Article/Element/Element";
import ArticleIllustration from "../../../components/Article/ArticleIllustration";
import ArticleContentWrapper from "../../../components/Article/ArticleContentWrapper";
import Card from "../../../components/Card/Card";

function Preview(
    {
        article
    }
)
{
    return (
        <>
            <ArticleIllustration
                title={article.title}
                readingTime={article.elements.length * 1.5}
                picture={article.thumbnail}
            />
            <ArticleContentWrapper>
                {
                    article.elements.map((el, index) => (
                        <Element
                            key={index}
                            type={el.type}
                            text={el.text}
                            href={el.href}
                            image={el.image}
                            isPreview={true}
                        />
                    ))
                }
                <Element
                    key={0}
                    type="title"
                    text="Aperçu des cartes"
                />
                <Card
                    type="large"
                    cardData={
                        {
                            title: article.title,
                            readingTime: article.elements.length * 1.5,
                            image: article.thumbnail,
                            description: article.description,
                            tags: article.tags,
                            to: "#"
                        }
                    }
                    orientation="right"
                />
                <Card
                    type="small"
                    cardData={
                        {
                            title: article.title,
                            readingTime: article.elements.length * 1.5,
                            image: article.thumbnail,
                            description: article.description,
                            tags: article.tags,
                            to: "#"
                        }
                    }
                />
            </ArticleContentWrapper>
        </>
    );
}

export default Preview;