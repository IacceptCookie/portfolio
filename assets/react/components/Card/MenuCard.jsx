import React from "react";
import Stack from "../Stack/Stack";
import Layer from "../Stack/Layer/Layer";
import "./Card.css";

function MenuCard(
    {
        cardData,
    }
)
{
    return (
        <a href={cardData.to} className="menu-card">
            <Stack className="menu-card-illustration-stack">
                <Layer
                    type="text"
                    text={cardData.title}
                    wrapperClassName="menu-card-illustration-title-wrapper"
                    textClassName="menu-card-illustration-title"
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
        </a>
    )
}

export default MenuCard;