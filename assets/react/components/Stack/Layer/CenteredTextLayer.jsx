import React, { useState, useEffect, useRef } from "react";

function CenteredTextLayer({ text, following = false, zIndex = 10 }) {
    const [isFollowing, setIsFollowing] = useState(following);
    const layerRef = useRef(null);
    const [offsetTop, setOffsetTop] = useState(0);
    const [visible, setVisible] = useState(true);

    // Effet pour suivre le scroll si "following" est true
    useEffect(() => {
        if (isFollowing) {
            const handleScroll = () => {
                const layer = layerRef.current;
                const stackRect = layer?.parentElement?.getBoundingClientRect();

                if (stackRect) {
                    const stackTop = stackRect.top;
                    const stackBottom = stackRect.bottom;

                    // Met à jour la position du texte en fonction du scroll
                    if (stackTop <= window.innerHeight / 2 && stackBottom >= window.innerHeight / 2) {
                        setOffsetTop(window.scrollY); // Met à jour l'offset du scroll
                        setVisible(true);  // Assure que le texte reste visible
                    } else {
                        setVisible(false); // Masque le texte si hors de la zone visible de la stack
                    }
                }
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [isFollowing]);

    return (
        <div
            ref={layerRef}
            className={`layer centered-text-layer ${isFollowing ? "following" : ""}`}
            style={{
                zIndex: zIndex,
                visibility: visible ? "visible" : "hidden", // Masque le texte si hors de la stack
                transform: isFollowing
                    ? `translate(-50%, calc(-50% + ${offsetTop / 2}px))`
                    : "translate(-50%, -50%)",
            }}
        >
            <span className="layer__centered-text">{text}</span>
        </div>
    );
}

export default CenteredTextLayer;