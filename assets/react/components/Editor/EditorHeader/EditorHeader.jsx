import React from "react";
import "./EditorHeader.css";

function EditorHeader(
    {
        warning = false
    }
) {
    return (
        <>
            <div className="header-filler" />
            { warning ? <div className="warning-bar" /> : null}
        </>
    );
}

export default EditorHeader;