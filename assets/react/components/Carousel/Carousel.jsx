import React, {useEffect, useState} from "react";
import "./Carousel.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {Link} from "wouter";
import Stack from "../Stack/Stack";
import Layer from "../Stack/Layer/Layer";

function Carousel (
    {
        carouselData
    }
)
{
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const goToNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
        );
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
        );
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(goToNext, 5000);
            return () => clearInterval(interval);
        }
    }, [isPaused, currentIndex]);

    return (
        <div
            className="carousel"
            onMouseEnter={() => setIsPaused(true)} // Pause au survol
            onMouseLeave={() => setIsPaused(false)} // Reprise après survol
        >
            <button className="carousel-button prev" onClick={goToPrevious}>
                <FontAwesomeIcon icon={faChevronLeft} className="carousel-button-icon" />
            </button>

            <div
                className="carousel-slides"
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {carouselData.map((slideData, index) => (
                    <Link to={slideData.to} key={index} className="slide">
                        <Stack className="slide-stack">
                            <Layer
                                type="text"
                                text={slideData.title}
                                wrapperClassName="slide-title-wrapper"
                                textClassName="slide-title"
                                zIndex={4}
                            />
                            <Layer
                                type="text"
                                text={slideData.description}
                                wrapperClassName="slide-description-wrapper"
                                textClassName="slide-description"
                                zIndex={3}
                            />
                            <Layer
                                type="singleColor"
                                color="#0e1084"
                                opacity="0.4"
                                zIndex={2}
                            />
                            <Layer
                                type="image"
                                src={slideData.image}
                                alt="L'illustration de cet élément n'est pas supporté par votre navigateur"
                                objectPosition="center"
                                zIndex={1}
                            />
                        </Stack>
                    </Link>
                ))}
            </div>

            <button className="carousel-button next" onClick={goToNext}>
                <FontAwesomeIcon icon={faChevronRight} className="carousel-button-icon" />
            </button>

            <div className="carousel-indicators">
                {carouselData.map((slideData, index) => (
                    <button
                        key={index}
                        className={`indicator ${
                            currentIndex === index ? "active" : ""
                        }`}
                        onClick={() => goToSlide(index)}
                    ></button>
                ))}
            </div>
        </div>
    );
}

export default Carousel;