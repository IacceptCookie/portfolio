import React from "react";

function PicturePreview(
    {
        src,
        legend,
    }
) {
    return (
        <div className="element-picture-wrapper">
            <img className="element-picture"
                 src={src}
                 alt={legend}
            />
            <p className="element-picture-legend">{legend}</p>
        </div>
    );
}

export default PicturePreview;