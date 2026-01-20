import React, { useState, useEffect } from "react";
import "./Profile.css";
import Stack from "../../components/Stack/Stack";
import Layer from "../../components/Stack/Layer/Layer";
import backgroundVideo from "../../../video/back.webm";
import Logo from "../../components/Logo/Logo";
import Accordion from "../../components/Accordion/Accordion";
import RevealGroup from "../../components/Animation/Reveal/RevealGroup";
import AnimatedText from "../../components/Text/AnimatedText";
import RevealOnScroll from "../../components/Animation/Reveal/RevealOnScroll";
import ShowSection from "../../components/Animation/ShowSection/ShowSection";
import TablePanel from "../../components/Grafana/TablePanel";
import BarChartPanel from "../../components/Grafana/BarChartPanel";
import XYChartPanel from "../../components/Grafana/XYChartPanel";
import StackedCarousel from "../../components/Carousel/StackedCarousel";
import MicroservicesArchitecture from "../../components/Design/MicroservicesArchitecture";
import ReactComponentsAssembly from "../../components/Design/ReactComponentsAssembly";
import ExperienceScroll, { CATEGORIES } from "../../components/ExperienceScroll/ExperienceScroll";
import Carousel from "../../components/Carousel/Carousel";
import { getLatestArticles } from "../../services/api/Articles";

const EXPERIENCE_DATA = [
    {
        category: CATEGORIES.EXPERIENCE,
        date: "Janvier 2026 - Maintenant",
        title: "Data Scientist Junior",
        location: "Spacefoot SAS - Charleville-Mézières"
    },
    {
        category: CATEGORIES.EXPERIENCE,
        date: "Sept. 2024 - Décembre 2025",
        title: "Apprenti Data Analyst",
        location: "Spacefoot SAS - Charleville-Mézières",
        description: [
            "Optimisation de campagnes publicitaires Google Ads",
            "Travail analytique sur des achats prédictifs",
            "Analyses et travaux BI divers"
        ]
    },
    {
        category: CATEGORIES.EXPERIENCE,
        date: "Avril - Juin 2024",
        title: "Stage Data Analyst",
        location: "Spacefoot SAS - Charleville-Mézières",
        description: [
            "Utilisation avancée de Grafana et PostgreSQL",
            "Production de tableaux de bord décisionnels"
        ]
    },
    {
        category: CATEGORIES.EXPERIENCE,
        date: "Juil. 2023 & Août 2024",
        title: "Secrétaire (vacataire)",
        location: "OPAL - Office Public de l'Habitat de l'Aisne, Laon",
        description: [
            "Bailleur social",
            "Assister les locataires dans leurs démarches",
            "Gérer les dossiers et le standard téléphonique"
        ]
    },
    {
        category: CATEGORIES.EXPERIENCE,
        date: "2021 - 2022",
        title: "Bénévole",
        location: "Association Panier Solidaire - Villeneuve-sur-Aisne",
        description: [
            "Epicerie Solidaire",
            "Inventaire et remplissage des rayons",
            "Aide aux bénéficiaires"
        ]
    },
    {
        category: CATEGORIES.FORMATION,
        date: "Septembre 2025 - Décembre 2025",
        title: "Master Informatique Parcours IA",
        location: "Université de Reims Champagne-Ardenne",
        description: [
            "Démission de la formation en cours de première année"
        ]
    },
    {
        category: CATEGORIES.FORMATION,
        date: "2022 - 2025",
        title: "BUT Informatique Parcours DATA",
        location: "IUT de Reims Châlons Charleville",
        description: [
            "Développement Web",
            "Spécialisation Python et Base de données",
            "Projets en groupe"
        ]
    },
    {
        category: CATEGORIES.FORMATION,
        date: "2019 - 2022",
        title: "Baccalauréat Général",
        location: "Lycée technique Pierre Méchain - Laon",
        description: [
            "Spécialités Mathématiques et NSI",
            "Obtenu avec mention Très Bien"
        ]
    }
];

function Profile() {
    const [latestArticles, setLatestArticles] = useState([]);

    useEffect(() => {
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
            .catch(error => console.error('Erreur chargement articles:', error));
    }, []);

    return (
        <>
            <Stack aspectRatio="16/9" width="100%" maxHeight="100vh">
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
            <section className="presentation-section">
                <div className="presentation-portrait">
                    {/* TODO: Remplacer par la vraie image portrait */}
                    <div className="presentation-portrait-placeholder">
                        <img src="/img/profile/profile-picture.webp" alt="profile picture" />
                    </div>
                </div>
                <div className="presentation-content">
                    <h1 className="presentation-title">Raphaël Durand</h1>
                    <p className="presentation-subtitle">En exploration pour le monde de demain</p>
                    <div className="presentation-text">
                        <p>
                            Data Scientist Junior chez Spacefoot depuis janvier 2026 (j'ai rejoint l'entreprise en 2024). J'évolue dans un milieu <strong>dynamique et novateur</strong>.
                        </p>
                        <p>
                            J'ai un parcours qui m'a permis de m'intéresser dans de <strong>nombreux domaines</strong> et je compte sur cette richesse au quotidien pour apporter les <strong>solutions de demain</strong>.
                        </p>
                        <p>
                            Je garde dans mon âme une conscience sociale des problèmes de notre société, et c'est la raison pour laquelle j'aspire à explorer de <strong>nouvelles</strong> façons d'entreprendre et de concevoir.
                        </p>
                        <p>
                            J'espère vous <strong>enrichir</strong> à travers mon profil, de par mes passions et mes projets.
                        </p>
                    </div>
                </div>
            </section>
            <ExperienceScroll items={EXPERIENCE_DATA} />
            <AnimatedText text="Les technologies qui font la différence sur mon profil : " className="centered-text" delay={0.2} />
            <ShowSection
                orientation="left"
                upperTriangleSrc="/img/profile/divider-top-postgresql.svg"
                lowerTriangleSrc="/img/profile/divider-bottom-postgresql.svg"
            >
                <div className="postgresql-section-presentation show-section-display-child">
                    <div className="postgresql-section-logo">
                        <img
                            src="/img/profile/postgres.svg"
                            alt="Logo de postgresql"
                        />
                        <p>PostgreSQL</p>
                        <span>®</span>
                    </div>
                    <p className="postgresql-section-text-centered">
                        PostgreSQL est un système de gestion de base de données open source, reconnu comme <strong>le plus avancé</strong> au monde.
                    </p>
                    <div className="postgresql-section-text">
                        <p>C'est le pilier <strong>essentiel</strong> à toute activité :</p>
                        <ul className="postgresql-section-list">
                            <li className="postgresql-section-bullet">
                                Un système exceptionnellement <strong>performant</strong>
                            </li>
                            <li className="postgresql-section-bullet">
                                S'<strong>adapte</strong> à l'évolution de chaque activité
                            </li>
                            <li className="postgresql-section-bullet">
                                Aucun coût de licence, aucun verrouillage éditeur
                            </li>
                            <li className="postgresql-section-bullet">
                                Dialogue avec l'ensemble de l'écosystème applicatif
                            </li>
                            <li className="postgresql-section-bullet">
                                Plus de <strong>35 ans</strong> de développement continu
                            </li>
                            <li className="postgresql-section-bullet">
                                Un support collectif réactif et documenté
                            </li>
                        </ul>
                    </div>
                </div>
                <MicroservicesArchitecture />
            </ShowSection>
            <ShowSection
                orientation="right"
                upperTriangleSrc="/img/profile/divider-top-grafana.svg"
                lowerTriangleSrc="/img/profile/divider-bottom-grafana.svg"
            >
                <StackedCarousel>
                    <TablePanel data={{
                        maxPanelWidth: 500,
                        maxPanelHeight: 400,
                        header: [
                            { name: 'produit', width: '190px' },
                            { name: 'note client', width: '120px' },
                            { name: 'categorie', width: '170px' }
                        ],
                        rows: [
                            [ { value: 'casque audio', background: 'green' }, { value: '4.6', background: 'green' }, { value: 'electronique', background: 'green' } ],
                            [ { value: 'souris sans fil', background: 'green' }, { value: '4.2', background: 'green' }, { value: 'electronique', background: 'green' } ],
                            [ { value: 'clavier mecanique', background: 'red' }, { value: '2.8', background: 'red' }, { value: 'electronique', background: 'red' } ],
                            [ { value: 'ecran 27 pouces', background: 'green' }, { value: '4.9', background: 'green' }, { value: 'electronique', background: 'green' } ],
                            [ { value: 'chaise bureau', background: 'green' }, { value: '4.1', background: 'green' }, { value: 'mobilier', background: 'green' } ],
                            [ { value: 'bureau assis-debout', background: 'red' }, { value: '2.5', background: 'red' }, { value: 'mobilier', background: 'red' } ],
                            [ { value: 'lampe led', background: 'green' }, { value: '4.3', background: 'green' }, { value: 'mobilier', background: 'green' } ],
                            [ { value: 'etagere murale', background: 'green' }, { value: '3.9', background: 'green' }, { value: 'mobilier', background: 'green' } ],
                            [ { value: 't-shirt coton', background: 'green' }, { value: '4.4', background: 'green' }, { value: 'vetement', background: 'green' } ],
                            [ { value: 'jean slim', background: 'red' }, { value: '2.9', background: 'red' }, { value: 'vetement', background: 'red' } ],
                            [ { value: 'veste hiver', background: 'green' }, { value: '4.7', background: 'green' }, { value: 'vetement', background: 'green' } ],
                            [ { value: 'baskets sport', background: 'green' }, { value: '3.6', background: 'green' }, { value: 'vetement', background: 'green' } ],
                            [ { value: 'cafe bio', background: 'green' }, { value: '4.8', background: 'green' }, { value: 'alimentaire', background: 'green' } ],
                            [ { value: 'the vert', background: 'green' }, { value: '4.1', background: 'green' }, { value: 'alimentaire', background: 'green' } ],
                            [ { value: 'chocolat noir', background: 'red' }, { value: '2.7', background: 'red' }, { value: 'alimentaire', background: 'red' } ],
                            [ { value: 'biscuits avoine', background: 'green' }, { value: '3.7', background: 'green' }, { value: 'alimentaire', background: 'green' } ],
                            [ { value: 'sac a dos', background: 'green' }, { value: '4.5', background: 'green' }, { value: 'accessoires', background: 'green' } ],
                            [ { value: 'montre connectee', background: 'red' }, { value: '2.4', background: 'red' }, { value: 'accessoires', background: 'red' } ],
                            [ { value: 'lunettes soleil', background: 'green' }, { value: '4.2', background: 'green' }, { value: 'accessoires', background: 'green' } ],
                            [ { value: 'portefeuille cuir', background: 'green' }, { value: '4.6', background: 'green' }, { value: 'accessoires', background: 'green' } ]
                        ]
                    }} />
                    <BarChartPanel
                        data={{
                            scaleMin: 0,
                            scaleMax: 300,
                            maxPanelWidth: 500,
                            maxPanelHeight: 400,
                            unit: '€',
                            legend: {
                                name: "chiffre d'affaires",
                                color: "115, 191, 105"
                            },
                            bars: [
                                {label: 'magasin', value: 180},
                                {label: 'web', value: 260},
                                {label: 'mobile', value: 95},
                            ]
                        }}
                    />
                    <XYChartPanel
                        data={{
                            xScaleMin: 5,
                            xScaleMax: 35,
                            yScaleMin: 50,
                            yScaleMax: 300,
                            maxPanelWidth: 500,
                            maxPanelHeight: 400,
                            legend: {
                                name: "quantité en stock / prix d'achat",
                                color: "115, 191, 105"
                            },
                            dots: [
                                [5, 280],
                                [6, 270],
                                [7, 260],
                                [8, 250],
                                [9, 240],
                                [10, 230],
                                [11, 220],
                                [12, 210],
                                [13, 200],
                                [14, 190],
                                [15, 180],
                                [16, 175],
                                [17, 170],
                                [18, 160],
                                [19, 155],
                                [20, 150],
                                [21, 145],
                                [22, 140],
                                [23, 135],
                                [24, 130],
                                [25, 125],
                                [26, 120],
                                [27, 115],
                                [28, 110],
                                [29, 105],
                                [30, 100],
                                [31, 95],
                                [32, 90],
                                [33, 85],
                                [34, 80]
                            ]
                        }}
                    />
                </StackedCarousel>
                <div className="grafana-section-presentation show-section-display-child">
                    <div className="grafana-section-logo">
                        <img
                            src="/img/profile/logo-grafana-text.webp"
                            alt="Logo de grafana"
                        />
                        <span>®</span>
                    </div>
                    <p className="grafana-section-text-centered">
                        Grafana est une plateforme open source de <strong>visualisation et d’analyse de données</strong>.
                    </p>
                    <div className="grafana-section-text">
                        <p>C'est une solution qui offre beaucoup de possibilités :</p>
                        <ul className="grafana-section-list">
                            <li className="grafana-section-bullet">
                                Tableaux de bord <strong>interactifs et hautement</strong> personnalisables
                            </li>
                            <li className="grafana-section-bullet">
                                Support de <strong>nombreuses</strong> sources de données
                            </li>
                            <li className="grafana-section-bullet">
                                Visualisation en temps réel des métriques
                            </li>
                            <li className="grafana-section-bullet">
                                Écosystème <strong>riche</strong> de plugins et intégrations
                            </li>
                            <li className="grafana-section-bullet">
                                Open source avec une large communauté
                            </li>
                            <li className="grafana-section-bullet">
                                Adapté au monitoring, à l’observabilité et à l’alerte
                            </li>
                        </ul>
                    </div>
                </div>
            </ShowSection>
            <ShowSection
                orientation="left"
                upperTriangleSrc="/img/profile/divider-top-react.svg"
                lowerTriangleSrc="/img/profile/divider-bottom-react.svg"
            >
                <div className="react-section-presentation show-section-display-child">
                    <div className="react-section-logo">
                        <img
                            src="/img/profile/react.svg"
                            alt="Logo de react"
                        />
                        <p>React</p>
                        <span>®</span>
                    </div>
                    <p className="react-section-text-centered">
                        React est une bibliothèque JavaScript open source conçue pour construire des interfaces web <strong>performantes et dynamiques</strong>.
                    </p>
                    <div className="react-section-text">
                        <p>Un outil <strong>incontournable</strong> pour les projets front-end :</p>
                        <ul className="react-section-list">
                            <li className="react-section-bullet">
                                Architecture <strong>modulaire, performante</strong> même avec des interfaces complexes
                            </li>
                            <li className="react-section-bullet">
                                Développé par <strong>Meta,</strong> utilisé par <strong>Facebook, Instagram et WhatsApp</strong>
                            </li>
                            <li className="react-section-bullet">
                                Adopté par des millions de développeurs dans le monde
                            </li>
                            <li className="react-section-bullet">
                                React Native permet de créer des applications mobiles avec le même langage
                            </li>
                            <li className="react-section-bullet">
                                Plus de <strong>10 ans</strong> d'évolution continue et de maturité
                            </li>
                        </ul>
                    </div>
                </div>
                <ReactComponentsAssembly />
            </ShowSection>
            <AnimatedText text="Mon curriculum vitæ (Oui un CV en clair) : " className="centered-text" delay={0.2} />
            <div className="cv-display">
                <RevealOnScroll
                    animation="fade-up"
                    delay={0.2}
                >
                    <a href="/downloadable/cv-raphael-durand.pdf" target="_blank">
                        <img className="cv-display-img" src="/img/profile/cv-raphael-durand.webp" alt="vous pouvez télécharger mon cv ci-dessous" />
                    </a>
                </RevealOnScroll>
                <RevealOnScroll
                    animation="fade-up"
                    delay={0.2}
                >
                    <a className="cv-download-button" href="/downloadable/cv-raphael-durand.pdf">Télécharger</a>
                </RevealOnScroll>
            </div>
            <AnimatedText text="Ce que j'utilise : " className="centered-text" delay={0.2} />
            <RevealGroup className="logo-accordions" animation="fade-up" baseDelay={0.4} orientation="vertical">
                <Accordion title="Pour développer" contentClassName="logo-wrapper" animation="fade-zoom" autoUnfoldAfter={0.4}>
                    <Logo src="/img/logo/python.svg">
                        Python
                    </Logo>
                    <Logo src="/img/logo/php.svg">
                        PHP
                    </Logo>
                    <Logo src="/img/logo/javascript.svg">
                        Javascript
                    </Logo>
                    <Logo src="/img/logo/symfony.svg">
                        Symfony
                    </Logo>
                    <Logo src="/img/logo/react.svg">
                        React
                    </Logo>
                    <Logo src="/img/logo/git.svg">
                        Git
                    </Logo>
                    <Logo src="/img/logo/docker.svg">
                        Docker
                    </Logo>
                    <Logo src="/img/logo/visual-studio.svg">
                        Visual Studio
                    </Logo>
                    <Logo src="/img/logo/jetbrains.svg">
                        JetBrains
                    </Logo>
                    <Logo src="/img/logo/js-webpack.svg">
                        Webpack
                    </Logo>
                </Accordion>
                <Accordion title="Pour travailler la donnée" contentClassName="logo-wrapper" animation="fade-zoom" autoUnfoldAfter={0.4}>
                    <Logo src="/img/logo/postgresql.svg">
                        PostgreSQL
                    </Logo>
                    <Logo src="/img/logo/grafana.svg">
                        Grafana
                    </Logo>
                    <Logo src="/img/logo/oracle.svg">
                        Oracle
                    </Logo>
                    <Logo src="/img/logo/power-bi.svg">
                        Power BI
                    </Logo>
                    <Logo src="/img/logo/mariadb.svg">
                        Mariadb
                    </Logo>
                    <Logo src="/img/logo/neo4j.svg">
                        Neo4j
                    </Logo>
                    <Logo src="/img/logo/clickhouse.svg">
                        Clickhouse
                    </Logo>
                    <Logo src="/img/logo/mongodb.svg">
                        MongoDB
                    </Logo>
                </Accordion>
                <Accordion title="Pour créer" contentClassName="logo-wrapper" animation="fade-zoom" autoUnfoldAfter={0.4}>
                    <Logo src="/img/logo/figma.svg">
                        Figma
                    </Logo>
                    <Logo src="/img/logo/canva.svg">
                        Canva
                    </Logo>
                    <Logo src="/img/logo/blender.svg">
                        Blender
                    </Logo>
                    <Logo src="/img/logo/shotcut.svg">
                        Shotcut
                    </Logo>
                    <Logo src="/img/logo/gimp.svg">
                        Gimp
                    </Logo>
                </Accordion>
                <Accordion title="En systèmes d'exploitations" contentClassName="logo-wrapper" animation="fade-zoom" autoUnfoldAfter={0.4}>
                    <Logo src="/img/logo/ubuntu.svg">
                        Ubuntu
                    </Logo>
                    <Logo src="/img/logo/manjaro.svg">
                        Manjaro
                    </Logo>
                    <Logo src="/img/logo/windows.svg">
                        Windows
                    </Logo>
                </Accordion>
                <Accordion title="Dans mon environnement professionnel" contentClassName="logo-wrapper" animation="fade-zoom" autoUnfoldAfter={0.4}>
                    <Logo src="/img/logo/teams.svg">
                        Teams
                    </Logo>
                    <Logo src="/img/logo/office.svg">
                        Office
                    </Logo>
                    <Logo src="/img/logo/google-ads.svg">
                        GoogleAds
                    </Logo>
                    <Logo src="/img/logo/rundeck.svg">
                        Rundeck
                    </Logo>
                </Accordion>
            </RevealGroup>
            <AnimatedText text="Et de nouvelles découvertes à venir ..." className="centered-text" delay={0.2} />
            {latestArticles.length > 0 && (
                <Carousel carouselData={latestArticles} />
            )}
        </>
    );
}

export default Profile;