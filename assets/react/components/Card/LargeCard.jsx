import React from "react";
import Stack from "../Stack/Stack";
import Layer from "../Stack/Layer/Layer";
import Tag from "../Tag/Tag";

function LargeCard(
    {
        cardData,
        orientation,
    }
)
{
    return (
        <div className="large-card">
            <Stack className="large-card-illustration-stack">
                <Layer
                    type="text"
                    text={cardData.title}
                    textClassName="large-card-illustration-title"
                    zIndex={3}
                />
                <Layer
                    type="text"
                    text={`Tps de lecture : ${cardData.readingTime} min`}
                    wrapperClassName="large-card-illustration-reading-time-wrapper"
                    textClassName="large-card-illustration-reading-time"
                    zIndex={2}
                />
                <Layer
                    type="image"
                    src={cardData.image}
                    alt="L'illustration de cet élément n'est pas supporté par votre navigateur"
                    zIndex={1}
                />
            </Stack>
            <div className="large-card-description-area">
                <article className="large-card-description">
                    {cardData.description}
                </article>
                <div className="large-card-tag-list">
                    {
                        cardData.tags.map(tag => (
                            <Tag key={tag.id} tagTitle={tag.title} tagColorCode={tag.colorCode} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default LargeCard;