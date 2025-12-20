import React, { useEffect, useRef, useState } from "react";
import RevealOnScroll from "./RevealOnScroll";
import { useInView } from "react-intersection-observer";

function RevealGroup(
    {
        children,
        animation = "fade-zoom",
        baseDelay = 0.1,
        className = "",
        orientation = "horizontal",
    }
) {
    const containerRef = useRef(null);
    const [delays, setDelays] = useState([]);
    const { inView, ref: inViewRef } = useInView({ triggerOnce: true });

    useEffect(() => {
        if (containerRef.current) {
            inViewRef(containerRef.current);
        }
    }, [inViewRef]);

    useEffect(() => {
        if (!containerRef.current) return;

        const nodes = Array.from(containerRef.current.children);

        const positions = nodes.map((node) =>
            orientation === "vertical"
                ? node.getBoundingClientRect().top
                : node.getBoundingClientRect().left
        );

        const min = Math.min(...positions);
        const sorted = positions.map((p) => p - min);

        const computedDelays = sorted.map((v) =>
            parseFloat(((v / 100) * baseDelay).toFixed(2))
        );

        setDelays(computedDelays);
    }, [baseDelay, orientation, children]);

    return (
        <div ref={containerRef} className={`${className} reveal-group`}>
            {React.Children.map(children, (child, i) => (
                <RevealOnScroll manualTrigger={inView} animation={animation} delay={Number(delays[i] || 0)}>
                    {child}
                </RevealOnScroll>
            ))}
        </div>
    );
}

export default RevealGroup;
