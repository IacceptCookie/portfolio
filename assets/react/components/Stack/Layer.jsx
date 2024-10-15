import React from "react";
import "./Stack.css";

function Layer(
    {
        type,
        src = '',
        alt = '',
        color = '',
        opacity = '',
        zIndex = 1,
    }
)
{
    const variants = {
        image: <ImageLayer src={src} alt={alt} zIndex={zIndex} />,
        singleColor: <SingleColorLayer color={color} opacity={opacity} zIndex={zIndex} />
    };

    return variants[type]
}

function ImageLayer({src, alt, zIndex}) {
    return (
        <img src={src} alt={alt} style={{zIndex: zIndex}} className="layer__image" />
    )
}

function SingleColorLayer({color, opacity, zIndex}) {
    return (
        <div style={{backgroundColor: color, opacity: opacity, zIndex: zIndex}} className="layer__single-color" />
    )
}

export default Layer;