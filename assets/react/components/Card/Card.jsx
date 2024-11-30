import React from "react";
import "./Card.css";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";

function Card(
    {
        type,
        cardData,
        orientation = 'left'
    }
)
{
    const variants = {
        small: <SmallCard cardData={cardData} />,
        large: <LargeCard cardData={cardData} orientation={orientation} />,
    };

    return variants[type]
}

export default Card;