import React from "react";

function Picture(
    {
        src,
        legend,
    }
) {
    const imagePath = `/img/${src}`;

    return (
        <div className="element-picture-wrapper">
            <img className="element-picture"
                    src={imagePath}
                    alt={legend}
            />
            <p className="element-picture-legend">{legend}</p>
        </div>
    );
}

export default Picture;