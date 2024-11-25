import React from "react";
import "./Tag.css";

function Tag(
    {
        tagTitle,
        tagColorCode
    }
)
{
    return (
        <p className="tag" style={{backgroundColor: `#${tagColorCode}`}}>
            {tagTitle}
        </p>
    )
}

export default Tag;