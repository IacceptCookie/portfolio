import React from "react";
import "../Result.css";
import {Link} from "wouter";

function CategoryResult(
    {
        resultData,
    }
)
{
    return (
        <Link
            style={{backgroundColor: "#0E1084", borderColor: "color-mix(in srgb, #0E1084, white 50%)"}}
            className="editor-category-result result"
            to={`/filter/update/category/${resultData.id}`}
        >
            <p className="editor-category-result__label">
                {resultData.label}
            </p>
            <p
                style={{backgroundColor: "color-mix(in srgb, #0E1084, white 50%)"}}
                className="editor-category-result__use-count"
            >
                {resultData.useCount} utilisation(s)
            </p>
        </Link>
    );
}

export default CategoryResult;