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
                <Element
                    type="paragraph"
                    text="Ceci est l'exemple d'un paragraphe contenant des informations très utiles surtout pour le
                    fonctionnement de ce merveilleux composant"
                />
                <Element
                    type="picture"
                    imageSrc="test.jpg"
                    text="Une photo intéressante à partager"
                />
                <Element
                    type="link"
                    text="Ceci est un lien"
                    href="#"
                />
                <Element
                    type="quote"
                    text="Une citation intéressante"
                />
                <Element
                    type="video"
                    href="https://www.youtube.com/embed/a3ICNMQW7Ok?si=VuiLcODB3h3ZbZaf"
                    text="Une vidéo d'exemple de windows 7 - Microsoft"
                />
                <Element
                    type="title"
                    text="Un titre pour exprimer un sujet intéressant"
                />
            </ArticleContentWrapper>
        </>
    );
}

export default Example;