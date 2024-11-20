import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./AnimatedText.css";

function AnimatedText({text, speed = 20, className = ""}) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);
    const { ref, inView } = useInView({ triggerOnce: true });

    useEffect(() => {
        if (!inView) return;

        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index]);
                setIndex((prev) => prev + 1);
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [inView, text, speed, index]);

    return (
        <div className={className}>
            <p ref={ref}>
                {displayedText}
                <span className="cursor">
                    |
                </span>
            </p>
        </div>
    );
}

export default AnimatedText;