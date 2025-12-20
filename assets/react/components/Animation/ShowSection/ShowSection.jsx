import React from "react";
import "./ShowSection.css";

function ShowSection({
                         orientation = "left",
                         upperTriangleSrc,
                         lowerTriangleSrc,
                         children
                     }) {

    const mainChildren = React.Children.toArray(children).filter(
        child => child.props?.className?.includes("show-section-display-child")
    );
    const sideChildren = React.Children.toArray(children).filter(
        child => !child.props?.className?.includes("show-section-display-child")
    );

    return (
        <div className={`show-section show-section--${orientation}`}>
            <img
                src={upperTriangleSrc}
                className={"show-section__upper-triangle"}
                alt="upper line of section"
            />

            <div
                className={`show-section__content-area ${
                    orientation === "right" ? "show-section-right" : ""
                }`}
            >
                <div className="show-section__content-main">
                    {mainChildren}
                </div>
                <div className="show-section__content-side">
                    {sideChildren}
                </div>
            </div>

            <img
                src={lowerTriangleSrc}
                className="show-section__lower-triangle"
                alt="lower line of section"
            />
        </div>
    );
}

export default ShowSection;
