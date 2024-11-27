import React from "react";
import "./Card.css";
import LargeCard from "./LargeCard";

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
        //small: <SmallCard cardData={cardData} />,
        //medium: <MediumCard cardData={cardData} />,
        large: <LargeCard cardData={cardData} to={to} orientation={orientation} />,
    };

    return variants[type]
}

export default Card;