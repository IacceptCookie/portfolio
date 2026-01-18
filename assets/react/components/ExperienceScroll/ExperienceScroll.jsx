import React, { useState, useRef, useEffect } from "react";
import "./ExperienceScroll.css";

const CATEGORIES = {
    ALL: "all",
    EXPERIENCE: "experience",
    FORMATION: "formation",
    PROJET: "projet"
};

const CATEGORY_LABELS = {
    [CATEGORIES.ALL]: "Tout",
    [CATEGORIES.EXPERIENCE]: "Expériences",
    [CATEGORIES.FORMATION]: "Formations",
    [CATEGORIES.PROJET]: "Projets"
};

function ExperienceCard({ item }) {
    return (
        <div className={`experience-card experience-card--${item.category}`}>
            <div className="experience-card__header">
                <span className="experience-card__date">{item.date}</span>
                <span className="experience-card__category-badge">
                    {CATEGORY_LABELS[item.category]}
                </span>
            </div>
            <h3 className="experience-card__title">{item.title}</h3>
            <p className="experience-card__location">{item.location}</p>
            {item.description && (
                <ul className="experience-card__description">
                    {item.description.map((desc, index) => (
                        <li key={index}>{desc}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function ExperienceScroll({ items }) {
    const [activeFilter, setActiveFilter] = useState(CATEGORIES.ALL);
    const scrollContainerRef = useRef(null);

    const filteredItems = activeFilter === CATEGORIES.ALL
        ? items
        : items.filter(item => item.category === activeFilter);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            const isScrollable = container.scrollWidth > container.clientWidth;
            if (!isScrollable) return;

            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener("wheel", handleWheel, { passive: false });
        return () => container.removeEventListener("wheel", handleWheel);
    }, [filteredItems]);

    return (
        <div className="experience-scroll">
            <div className="experience-scroll__filters">
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <button
                        key={key}
                        className={`experience-scroll__filter ${activeFilter === key ? "experience-scroll__filter--active" : ""}`}
                        onClick={() => setActiveFilter(key)}
                    >
                        {label}
                    </button>
                ))}
            </div>
            <div className="experience-scroll__container" ref={scrollContainerRef}>
                <div className="experience-scroll__track">
                    {filteredItems.map((item, index) => (
                        <ExperienceCard key={index} item={item} />
                    ))}
                </div>
            </div>
            <div className="experience-scroll__hint">
                <span>← Défiler horizontalement →</span>
            </div>
        </div>
    );
}

export { CATEGORIES };
export default ExperienceScroll;
