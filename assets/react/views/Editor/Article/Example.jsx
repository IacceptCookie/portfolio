import React from "react";
import "./Article.css";
import articleIllustration from "../../../../img/background.jpg";
import Element from "../../../components/Article/Element/Element";
import ArticleIllustration from "../../../components/Article/ArticleIllustration";
import ArticleContentWrapper from "../../../components/Article/ArticleContentWrapper";

function Example() {
    return (
        <>
            <ArticleIllustration
                title="Titre de l'article"
                readingTime={5}
                picture={articleIllustration}
            />
            <ArticleContentWrapper>
                <Element type="paragraph"
                    text="Ceci est l'exemple d'un paragraphe contenant des informations très utiles surtout pour le
                    fonctionnement de ce merveilleux composant"
                />
                <Element type="picture" />
                <Element type="link" />
                <Element type="quote" />
                <Element type="video" />
                <Element type="title" />
            </ArticleContentWrapper>
        </>
    );
}

export default Example;