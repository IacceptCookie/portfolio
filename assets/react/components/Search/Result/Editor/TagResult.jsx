import React from "react";
import "../Result.css";
import {Link} from "wouter";

function TagResult(
    {
        resultData,
    }
)
{
    return (
        <Link
            style={{
                backgroundColor: `#${resultData.color}`,
                borderColor: `color-mix(in srgb, #${resultData.color}, white 50%)`
            }}
            className="editor-tag-result result"
            to={`/filter/update/tag/${resultData.id}`}
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
        </Link>
    );
}

export default TagResult;