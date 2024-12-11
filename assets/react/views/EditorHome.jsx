import React from "react";
import "./EditorHome.css";
import Card from "../components/Card/Card";
import caseIllustration from "../../img/case.png";
import statIllustration from "../../img/stats.png";
import writeIllustration from "../../img/writer.png";

function EditorHome() {
    return (
        <>
            <div className="header-filler" />
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
                            title: "Statistiques",
                            image: statIllustration,
                            to: "/grafana"
                        }
                    }
                />
            </div>
        </>
    );
}

export default EditorHome;