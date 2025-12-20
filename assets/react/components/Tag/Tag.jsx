import React from "react";
import "./Tag.css";
import { isDark } from "../../tools/color";

function Tag({ tagTitle, tagColorCode }) {
    const textColor = isDark(tagColorCode) ? '#fff' : '#000';

    return (
        <p
            className="tag"
            style={{
                backgroundColor: `#${tagColorCode}`,
                color: textColor
            }}
        >
            {tagTitle}
        </p>
    );
}

export default Tag;