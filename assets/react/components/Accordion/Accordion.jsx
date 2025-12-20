import React, { useState, useEffect, useRef } from "react";
import "./Accordion.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import RevealGroup from "../Animation/Reveal/RevealGroup";

function Accordion(
    {
        title,
        children,
        animation = "fade-zoom",
        contentClassName = "",
        autoUnfoldAfter = undefined
    }
) {
    const [folded, setFolded] = useState(true);
    const [autoUnfolded, setAutoUnfolded] = useState(false);
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (isVisible && autoUnfoldAfter) {
            const timer = setTimeout(() => {
                setFolded(false);
                setAutoUnfolded(true);
            }, autoUnfoldAfter * 1000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, autoUnfoldAfter]);

    return (
        <div
            ref={ref}
            className={`${autoUnfolded ? "auto-unfolded" : ""} accordion ${
                !folded ? "unfolded" : ""
            }`}
        >
            <div
                className={`accordion-title ${folded ? "folded" : ""}`}
                onClick={() => {
                    setFolded(!folded);
                    setAutoUnfolded(false);
                }}
            >
                <h1>{title}</h1>
                <FontAwesomeIcon icon={faChevronUp} />
            </div>

            <div
                className={`accordion-content ${folded ? "folded" : ""} ${contentClassName}`}
            >
                <RevealGroup animation={animation}>
                    {React.Children.map(children, (child) => (
                        <div>{child}</div>
                    ))}
                </RevealGroup>
            </div>
        </div>
    );
}

export default Accordion;
