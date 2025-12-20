import React from "react";
import "./Result.css";
import LargeCard from "../../Card/LargeCard";

function ArticleResult(
    {
        resultData,
    }
)
{
    return (
        <LargeCard
            cardData={resultData.cardData}
            orientation={resultData.orientation}
        />
    );
}

export default ArticleResult;