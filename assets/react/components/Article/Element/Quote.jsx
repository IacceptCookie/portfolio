import React from "react";

function Quote(
    {
        text
    }
) {
    return (
        <article className="element-quote"><i>&ldquo;{text}&rdquo;</i></article>
    );
}

export default Quote;