import React from "react";
import "./Article.css";
import Stack from "../Stack/Stack";
import Layer from "../Stack/Layer/Layer";

function ArticleIllustration(
    {
        picture,
        title,
        readingTime,
    }
) {
    return (
        <Stack aspectRatio="16/9" width="100%" maxHeight="60vh" className="presentation-visual-area">
            <Layer
                type="image"
                src={picture}
                alt="vignette de l'article"
                objectPosition="center"
                zIndex={1}
            />
            <Layer
                type="linearGradient"
                linearGradient="linear-gradient(360deg, rgba(8,9,87,1) 0%, rgba(255,255,255,0) 70%)"
                zIndex={2}
            />
            <Layer
                type="text"
                text={`Tps de lecture : ${readingTime} min`}
                wrapperClassName="article-illustration-reading-time-wrapper"
                textClassName="article-illustration-reading-time"
                zIndex={3}
            />
            <Layer
                type="text"
                text={title}
                textClassName="article-illustration-text"
                zIndex={4}
            />
        </Stack>
    );
}

export default ArticleIllustration;