import React from "react";

function Link(
    {
        text,
        href,
    }
) {
    return (
        <a href={href} className="element-link">{text}</a>
    );
}

export default Link;