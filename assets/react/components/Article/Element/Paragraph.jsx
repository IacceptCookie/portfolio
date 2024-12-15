import React from "react";
import "./Element.css";

function Paragraph(
    {
        text
    }
) {
    return (
        <article className="element-paragraph">{text}</article>
    );
}

export default Paragraph;