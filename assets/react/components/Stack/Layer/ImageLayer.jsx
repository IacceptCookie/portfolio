import React from "react";

function ImageLayer({src, alt, zIndex}) {
    return (
        <img src={src} alt={alt} style={{zIndex: zIndex}} className="layer__image layer" />
    )
}

export default ImageLayer;