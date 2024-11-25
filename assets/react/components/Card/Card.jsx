import React from "react";
import "./Card.css";
import LargeCard from "./LargeCard";

function Card(
    {
        type,
        cardData,
        orientation = 1
    }
)
{
    const variants = {
        //small: <SmallCard cardData={cardData} />,
        //medium: <MediumCard cardData={cardData} />,
        large: <LargeCard cardData={cardData} orientation={orientation} />,
    };

    return variants[type]
}

export default Card;