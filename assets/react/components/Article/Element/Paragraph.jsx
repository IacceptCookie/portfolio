import React from "react";
import "./Element.css";

function Paragraph(
    {
        text
    }
) {
    return (
        <p className="element-paragraph">{text}</p>
    );
}

export default Paragraph;