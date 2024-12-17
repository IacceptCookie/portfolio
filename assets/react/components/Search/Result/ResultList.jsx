import { React } from "react";
import "./Result.css";
import Result from "./Result";

function ResultList(
    {
        results,
        className = "",
    }
) {
    return (
        <div className={`${className} result-list`}>
            {results.map(
                (result, index) =>
                <Result
                    type={result.type}
                    key={index}
                    resultData={result.content}
                />
            )}
        </div>
    );
}

export default ResultList;