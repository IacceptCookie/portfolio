import React from "react";
import "./Stack.css";

function Stack({height = 'auto', width = 'auto', children}) {
    return (
        <div style={{height: height, width: width}} className="stack">
            {children}
        </div>
    );
}

export default Stack;
