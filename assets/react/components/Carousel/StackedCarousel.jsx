import React, { Children, useState, useEffect, useRef } from "react";

function StackedCarousel(
    {
        children,
        autoPlayInterval = 3000
    }
) {
    const items = Children.toArray(children);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const autoPlayRef = useRef(null);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 800);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Auto-play
    useEffect(() => {
        const startAutoPlay = () => {
            autoPlayRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % items.length);
            }, autoPlayInterval);
        };

        startAutoPlay();

        return () => {
            if (autoPlayRef.current) {
                clearInterval(autoPlayRef.current);
            }
        };
    }, [items.length, autoPlayInterval]);

    const getCardStyle = (index) => {
        const diff = index - activeIndex;
        const totalCards = items.length;

        let normalizedDiff = diff;
        if (Math.abs(diff) > totalCards / 2) {
            normalizedDiff = diff > 0 ? diff - totalCards : diff + totalCards;
        }

        if (isMobile) {
            return {
                transform: `translateY(${normalizedDiff * 60}px) scale(${1 - Math.abs(normalizedDiff) * 0.1})`,
                zIndex: totalCards - Math.abs(normalizedDiff),
                opacity: Math.abs(normalizedDiff) > 2 ? 0 : 1 - Math.abs(normalizedDiff) * 0.3,
                pointerEvents: normalizedDiff === 0 ? 'auto' : 'none'
            };
        } else {
            return {
                transform: `translateX(${normalizedDiff * 80}px) scale(${1 - Math.abs(normalizedDiff) * 0.1})`,
                zIndex: totalCards - Math.abs(normalizedDiff),
                opacity: Math.abs(normalizedDiff) > 2 ? 0 : 1 - Math.abs(normalizedDiff) * 0.3,
                pointerEvents: normalizedDiff === 0 ? 'auto' : 'none'
            };
        }
    };

    return (
        <div className="stacked-carousel-container" ref={containerRef}>
            <div className="stacked-carousel-wrapper">
                <div className="stacked-carousel-cards">
                    {items.map((child, index) => (
                        <div
                            key={index}
                            className={`stacked-card ${index === activeIndex ? 'active' : ''}`}
                            style={getCardStyle(index)}
                        >
                            {child}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default StackedCarousel;