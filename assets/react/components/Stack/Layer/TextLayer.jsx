import React from "react";

function TextLayer({ text, zIndex, wrapperClassName = '', textClassName = '' }) {

    return (
        <div className={`${textClassName} layer__text-wrapper layer`} style={{zIndex: zIndex}}>
            <span className={`${textClassName} layer__text`}>{text}</span>
        </div>
    );
}

export default TextLayer;