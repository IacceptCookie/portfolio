import React from "react";
import "./Card.css";
import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";
import MenuCard from "./MenuCard";

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
        menu: <MenuCard cardData={cardData} />,
    };

    return variants[type]
}

export default Card;