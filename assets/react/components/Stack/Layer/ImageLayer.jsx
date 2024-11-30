import React from "react";

function ImageLayer({src, alt, objectPosition, zIndex}) {
    return (
        <img src={src} alt={alt} style={{zIndex: zIndex, objectPosition: objectPosition}} className="layer__image layer" />
    )
}

export default ImageLayer;