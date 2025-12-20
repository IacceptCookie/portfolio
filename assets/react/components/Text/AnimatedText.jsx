import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import "./AnimatedText.css";

function AnimatedText({
                          text,
                          speed = 20,
                          className = "",
                          delay = 0
                      }) {
    const [index, setIndex] = useState(0);
    const [onDelay, setOnDelay] = useState(true);
    const { ref, inView } = useInView({
        threshold: 0.4,
        triggerOnce: true
    });

    useEffect(() => {
        if (inView) {
            const timer = setTimeout(() => {
                setOnDelay(false);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [inView, delay]);

    useEffect(() => {
        if (onDelay) return;
        if (index >= text.length) return;

        const interval = setInterval(() => {
            setIndex(prev => prev + 1);
        }, speed);

        return () => clearInterval(interval);
    }, [onDelay, text.length, speed, index]);

    const displayedText = text.slice(0, index);

    return (
        <div className={className}>
            <p ref={ref}>
                {displayedText}
                <span className="cursor">|</span>
            </p>
        </div>
    );
}

export default AnimatedText;
