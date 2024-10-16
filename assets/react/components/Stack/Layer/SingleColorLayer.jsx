import React from "react";

function SingleColorLayer({color, opacity, zIndex}) {
    return (
        <div style={{backgroundColor: color, opacity: opacity, zIndex: zIndex}} className="layer layer__single-color" />
    )
}

export default SingleColorLayer;