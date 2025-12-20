import React, { useRef, useEffect, useState } from "react";
import "./Reveal.css";

function RevealOnScroll(
    {
        children,
        animation = "fade-zoom",
        delay = 0,
        manualTrigger = false
    }
) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (manualTrigger) {
            setVisible(true);
        }
    }, [manualTrigger]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.2 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`reveal ${visible ? "visible" : ""} ${animation}`}
            style={{ transitionDelay: visible ? `${delay}s` : "0s" }}
        >
            {children}
        </div>
    );
}

export default RevealOnScroll;
