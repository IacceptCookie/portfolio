import React from "react";
import "../Result.css";

function TagResult(
    {
        resultData,
    }
)
{
    return (
        <div
            style={{
                backgroundColor: `#${resultData.color}`,
                borderColor: `color-mix(in srgb, #${resultData.color}, white 50%)`
            }}
            className="editor-tag-result result"
        >
            <p className="editor-tag-result__label">
                {resultData.label}
            </p>
            <p
                style={{backgroundColor: `color-mix(in srgb, #${resultData.color}, white 50%)`}}
                className="editor-tag-result__use-count"
            >
                {resultData.useCount ?? 0} utilisation(s)
            </p>
        </div>
    );
}

export default TagResult;