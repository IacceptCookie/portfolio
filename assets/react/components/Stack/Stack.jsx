import React from "react";
import "./Stack.css";

function Stack({
                   width = 'auto',
                   maxHeight = 'auto',
                   aspectRatio = '16/9',
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
