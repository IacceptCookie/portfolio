import React from "react";
import "./EditorHome.css";
import Card from "../../components/Card/Card";
import caseIllustration from "../../../img/case.png";
import statIllustration from "../../../img/stats.png";
import writeIllustration from "../../../img/writer.png";
import filterIllustration from "../../../img/checkboxes.png";
import EditorHeader from "../../components/Editor/EditorHeader/EditorHeader";

function EditorHome() {
    return (
        <>
            <EditorHeader warning={false} />
            <div className="menu">
                <Card
                    type="menu"
                    cardData={
                        {
                            title: "Rédiger un article",
                            image: writeIllustration,
                            to: "/article/create"
                        }
                    }
                />
                <Card
                    type="menu"
                    cardData={
                        {
                            title: "Gérer les articles existants",
                            image: caseIllustration,
                            to: "/article/manage"
                        }
                    }
                />
                <Card
                    type="menu"
                    cardData={
                        {
                            title: "Gérer les tags et les catégories",
                            image: filterIllustration,
                            to: "/filter/manage"
                        }
                    }
                />
                <Card
                    type="menu"
                    cardData={
                        {
                            title: "Statistiques",
                            image: statIllustration,
                            to: process.env.GRAFANA_URL,
                            external: true
                        }
                    }
                />
            </div>
        </>
    );
}

export default EditorHome;