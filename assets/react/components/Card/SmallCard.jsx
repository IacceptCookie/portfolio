import React from "react";
import Stack from "../Stack/Stack";
import Layer from "../Stack/Layer/Layer";
import { Link } from "wouter";

function SmallCard(
    {
        cardData,
    }
)
{
    return (
        <Link to={cardData.to} className="small-card">
            <div className="small-card-hover-text-area">
                <p className="small-card-hover-text">
                    {cardData.title}
                </p>
            </div>
            <div className="small-card-content">
                <Stack className="small-card-illustration-stack">
                    <Layer
                        type="text"
                        text={cardData.title}
                        textClassName="small-card-illustration-title"
                        zIndex={3}
                    />
                    <Layer
                        type="singleColor"
                        color="#0e1084"
                        opacity="0.4"
                        zIndex={2}
                    />
                    <Layer
                        type="image"
                        src={cardData.image}
                        objectPosition="center"
                        alt="L'illustration de cet élément n'est pas supporté par votre navigateur"
                        zIndex={1}
                    />
                </Stack>
                <div className="small-card-description-area">
                    <article className="small-card-description">
                        {cardData.description}
                    </article>
                </div>
            </div>
        </Link>
    )
}

export default SmallCard;