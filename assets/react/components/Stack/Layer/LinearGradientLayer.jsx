import React from "react";

function LinearGradientLayer({linearGradient, opacity, zIndex}) {
    return (
        <div style={{backgroundImage: linearGradient, opacity: opacity, zIndex: zIndex}} className="layer layer__linear-gradient" />
    )
}

export default LinearGradientLayer;