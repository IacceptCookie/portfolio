import React from "react";
import "./stack.css";

function Stack({height = 'auto', width = 'auto', children}) {
    return (
        <div style={{height: height, width: width}} className="stack">
            {children}
        </div>
    );
}

export default Stack;
