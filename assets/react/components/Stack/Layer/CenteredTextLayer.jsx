import React from "react";

function CenteredTextLayer({ text, zIndex = 10 }) {

    return (
        <div className="layer__centered-text-wrapper layer" style={{zIndex: zIndex}}>
            <span className="layer__centered-text">{text}</span>
        </div>
    );
}

export default CenteredTextLayer;