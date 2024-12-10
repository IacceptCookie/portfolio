import React from "react";
import Stack from "../components/Stack/Stack";
import Layer from "../components/Stack/Layer/Layer";
import backgroundVideo from "../../video/back.webm";
import AnimatedText from "../components/AnimatedText";
import "./Home.css";
import Card from "../components/Card/Card";
import cardIllustration from "../../img/background.jpg";
import Carousel from "../components/Carousel/Carousel";

function Home() {
    return (
        <>
            <Stack aspectRatio="16/9" width="100%" maxHeight="100vh" className="presentation-visual-area">
                <Layer
                    type="video"
                    src={backgroundVideo}
                    zIndex={1}
                />
                <Layer
                    type="linearGradient"
                    linearGradient="linear-gradient(360deg, rgba(8,9,87,1) 0%, rgba(255,255,255,0) 70%)"
                    zIndex={2}
                />
            </Stack>
            <AnimatedText
                className="presentation-text-area"
                text="
                Bienvenue sur mon site internet, ceci est le premier texte, il est donc le premier à bénéficier
                du dynamisme de React !"
                speed={10}
            />
            <div style={{display: "flex", flexDirection: "column", alignItems: "center", padding: "10px"}}>
                <Card
                    type="large"
                    cardData={
                        {
                            title: "Ma première carte",
                            readingTime: 5,
                            image: cardIllustration,
                            description: "Voici ma première carte, je la confectionne avec soin, " +
                                "et je prends aussi le temps de traiter tout les cas de figures imaginables comme un " +
                                "simple débordement de texte par exemple.",
                            tags: [
                                {id: 1, title: "PHP", colorCode: "4d73e1"},
                                {id: 2, title: "Javascript", colorCode: "f8f407"},
                            ],
                            to: "/"
                        }
                    }
                />
                <Card
                    type="large"
                    cardData={
                        {
                            title: "Ma première carte",
                            readingTime: 5,
                            image: cardIllustration,
                            description: "Voici ma première carte, je la confectionne avec soin, " +
                                "et je prends aussi le temps de traiter tout les cas de figures imaginables comme un " +
                                "simple débordement de texte par exemple.",
                            tags: [
                                {id: 1, title: "PHP", colorCode: "4d73e1"},
                                {id: 2, title: "Javascript", colorCode: "f8f407"},
                            ],
                            to: "/"
                        }
                    }
                    orientation="right"
                />
                <Card
                    type="small"
                    cardData={
                        {
                            title: "Ma première carte",
                            readingTime: 5,
                            image: cardIllustration,
                            description: "Voici ma première carte, je la confectionne avec soin, " +
                                "et je prends aussi le temps de traiter tout les cas de figures imaginables comme un " +
                                "simple débordement de texte par exemple.",
                            tags: [
                                {id: 1, title: "PHP", colorCode: "4d73e1"},
                                {id: 2, title: "Javascript", colorCode: "f8f407"},
                            ],
                            to: "/"
                        }
                    }
                />
            </div>
            <Carousel
                carouselData={
                    [
                        {
                            title: "Ma première carte",
                            readingTime: 5,
                            image: cardIllustration,
                            description: "Voici ma première carte, je la confectionne avec soin, " +
                                "et je prends aussi le temps de traiter tout les cas de figures imaginables comme un " +
                                "simple débordement de texte par exemple.",
                            tags: [
                                {id: 1, title: "PHP", colorCode: "4d73e1"},
                                {id: 2, title: "Javascript", colorCode: "f8f407"},
                            ],
                            to: "/"
                        },
                        {
                            title: "Ma deuxième carte",
                            readingTime: 5,
                            image: cardIllustration,
                            description: "Voici ma première carte, je la confectionne avec soin, " +
                                "et je prends aussi le temps de traiter tout les cas de figures imaginables comme un " +
                                "simple débordement de texte par exemple.",
                            tags: [
                                {id: 1, title: "PHP", colorCode: "4d73e1"},
                                {id: 2, title: "Javascript", colorCode: "f8f407"},
                            ],
                            to: "/"
                        },
                        {
                            title: "Ma troisième carte",
                            readingTime: 5,
                            image: cardIllustration,
                            description: "Voici ma première carte, je la confectionne avec soin, " +
                                "et je prends aussi le temps de traiter tout les cas de figures imaginables comme un " +
                                "simple débordement de texte par exemple.",
                            tags: [
                                {id: 1, title: "PHP", colorCode: "4d73e1"},
                                {id: 2, title: "Javascript", colorCode: "f8f407"},
                            ],
                            to: "/"
                        }
                    ]
                }
            />
        </>
    );
}

export default Home;
