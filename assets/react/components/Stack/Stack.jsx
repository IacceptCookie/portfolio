import React from "react";
import "./Stack.css";

function Stack({
                   width = '',
                   maxHeight = '',
                   aspectRatio = '',
                   className = '',
                   children
}) {
    return (
        <div style={{width: width, maxHeight: maxHeight, aspectRatio: aspectRatio}} className={`${className} stack`}>
            {children}
        </div>
    );
}

export default Stack;
