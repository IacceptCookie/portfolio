import React from "react";
import "./Card.css";

function Card(
    {
        type,
        cardData,
        orientation
    }
)
{
    const variants = {
        small: <SmallCard cardData={cardData} />,
        medium: <MediumCard cardData={cardData} />,
        large: <LargeCard cardData={cardData} />,
    };

    return variants[type]
}

export default Card;