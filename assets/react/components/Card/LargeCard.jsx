import React from "react";
import Stack from "../Stack/Stack";
import Layer from "../Stack/Layer/Layer";

function LargeCard(
    {
        cardData
    }
)
{
    return (
        <div className="large-card">
            <Stack className="large-card-illustration-stack">
                <Layer
                    type="centeredText"
                    text={cardData.title}
                    className="large-card-illustration-text"
                    zIndex={2}
                />
                <Layer
                    type="image"
                    src={cardData.image}
                    alt="L'illustration de cet élément n'est pas supporté par votre navigateur"
                    zIndex={1}
                />
            </Stack>
        </div>
    )
}

export default LargeCard;