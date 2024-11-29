import React from "react";
import "./Card.css";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";

function Card(
    {
        type,
        cardData,
        to,
        orientation = 'left'
    }
)
{
    const variants = {
        small: <SmallCard cardData={cardData} to={to} />,
        large: <LargeCard cardData={cardData} to={to} orientation={orientation} />,
    };

    return variants[type]
}

export default Card;