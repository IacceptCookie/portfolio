import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import Stack from "../../components/Stack/Stack";
import Layer from "../../components/Stack/Layer/Layer";
import backgroundVideo from "../../../video/back.webm";
import AnimatedText from "../../components/Text/AnimatedText";
import "./Home.css";
import SmallCard from "../../components/Card/SmallCard";
import Carousel from "../../components/Carousel/Carousel";
import CVLoupeAnimation from "../../components/Design/CVLoupeAnimation";
import ContactAnimation from "../../components/Design/ContactAnimation";
import { getLatestArticles, getFeaturedArticles } from "../../services/api/Articles";

function Home() {
    const [latestArticles, setLatestArticles] = useState([]);
    const [featuredArticles, setFeaturedArticles] = useState([]);

    useEffect(() => {
        // Charger les derniers articles pour le carrousel
        getLatestArticles()
            .then(articles => {
                const carouselData = articles.map(article => ({
                    to: `/article/${article.slug}`,
                    title: article.articleTitle,
                    description: article.articleDescription,
                    image: article.illustration?.imagePath || '/img/placeholder.webp'
                }));
                setLatestArticles(carouselData);
            })
            .catch(error => console.error('Erreur chargement derniers articles:', error));

        // Charger les articles mis en avant
        getFeaturedArticles()
            .then(articles => {
                const cardData = articles.map(article => ({
                    to: `/article/${article.slug}`,
                    title: article.articleTitle,
                    description: article.articleDescription,
                    image: article.illustration?.imagePath || '/img/placeholder.webp'
                }));
                setFeaturedArticles(cardData);
            })
            .catch(error => console.error('Erreur chargement articles vedettes:', error));
    }, []);

    return (
        <>
            {/* Hero Section */}
            <Stack aspectRatio="16/9" width="100%" maxHeight="100vh" className="home-hero">
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

            {/* Intro Text */}
            <AnimatedText
                className="home-intro-text"
                text="Bienvenue sur mon espace personnel, un lieu où je partage mes projets, mes réflexions et mon parcours dans le monde de la data et du développement."
                speed={10}
            />

            {/* Section Profil */}
            <section className="home-section home-section--profile">
                <div className="home-section__content">
                    <div className="home-section__text">
                        <h2 className="home-section__title">Mon Profil</h2>
                        <p className="home-section__description">
                            Découvrez mon parcours, mes compétences et les technologies que je maîtrise.
                            Data Engineer passionné, je travaille sur des projets alliant analyse de données,
                            développement web et automatisation.
                        </p>
                        <Link to="/profile" className="home-section__button">
                            Voir mon profil
                        </Link>
                    </div>
                    <div className="home-section__visual">
                        <CVLoupeAnimation />
                    </div>
                </div>
            </section>

            {/* Section Articles */}
            <section className="home-section home-section--articles">
                <div className="home-section__header">
                    <h2 className="home-section__title">Mes Articles</h2>
                    <p className="home-section__description">
                        Je partage ici mes réflexions, retours d'expérience et tutoriels sur les sujets
                        qui me passionnent : data engineering, développement web, automatisation et plus encore.
                    </p>
                    <Link to="/articles" className="home-section__button">
                        Tous les articles
                    </Link>
                </div>
                <div className="home-section__cards">
                    {featuredArticles.length > 0 ? (
                        featuredArticles.slice(0, 3).map((article, index) => (
                            <SmallCard key={index} cardData={article} />
                        ))
                    ) : (
                        <p className="home-section__no-articles">Aucun article mis en avant pour le moment.</p>
                    )}
                </div>
            </section>

            {/* Section Contact */}
            <section className="home-section home-section--contact">
                <div className="home-section__content home-section__content--reverse">
                    <div className="home-section__visual">
                        <ContactAnimation />
                    </div>
                    <div className="home-section__text">
                        <h2 className="home-section__title">Me Contacter</h2>
                        <p className="home-section__description">
                            Une question, une opportunité ou simplement envie d'échanger ?
                            N'hésitez pas à me contacter, je serai ravi de discuter avec vous.
                        </p>
                        <Link to="/contact" className="home-section__button">
                            Envoyer un message
                        </Link>
                    </div>
                </div>
            </section>

            {/* Carrousel des derniers articles */}
            {latestArticles.length > 0 && (
                <>
                    <AnimatedText
                        className="home-carousel-title"
                        text="Dernières publications"
                        delay={0.2}
                    />
                    <Carousel carouselData={latestArticles} />
                </>
            )}
        </>
    );
}

export default Home;
