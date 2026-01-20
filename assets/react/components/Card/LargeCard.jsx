import React from "react";
import Stack from "../Stack/Stack";
import Layer from "../Stack/Layer/Layer";
import Tag from "../Tag/Tag";
import { Link } from "wouter";
import "./Card.css";

function LargeCard(
    {
        cardData,
        orientation,
    }
)
{
    return (
        <Link to={cardData.to} className={`${orientation} large-card`}>
            <Stack className="large-card-illustration-stack">
                <Layer
                    type="text"
                    text={cardData.title}
                    wrapperClassName="large-card-illustration-title-wrapper"
                    textClassName="large-card-illustration-title"
                    zIndex={4}
                />
                <Layer
                    type="text"
                    text={`Tps de lecture : ${cardData.readingTime} min`}
                    wrapperClassName="large-card-illustration-reading-time-wrapper"
                    textClassName="large-card-illustration-reading-time"
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
            <div className="large-card-description-area">
                <article className="large-card-description">
                    {cardData.description}
                </article>
                <div className="large-card-tag-list">
                    {
                        cardData.tags.map((tag, index) => {
                                if (index < 3) {
                                    return (
                                        <Tag key={tag.id} tagTitle={tag.title} tagColorCode={tag.colorCode} />
                                    );
                                }
                            }
                        )
                    }
                </div>
            </div>
        </Link>
    )
}

export default LargeCard;