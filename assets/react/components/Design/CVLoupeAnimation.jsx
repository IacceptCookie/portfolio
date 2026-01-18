import React, { useEffect, useState, useRef } from 'react';
import './Design.css';

const CVLoupeAnimation = () => {
    const [progress, setProgress] = useState(0);
    const animationRef = useRef();
    const lastTimeRef = useRef(0);

    const cycleDuration = 8000;

    useEffect(() => {
        const animate = (currentTime) => {
            if (lastTimeRef.current === 0) {
                lastTimeRef.current = currentTime;
            }

            const deltaTime = currentTime - lastTimeRef.current;
            lastTimeRef.current = currentTime;

            setProgress((prev) => {
                let newProgress = prev + deltaTime / cycleDuration;
                if (newProgress >= 1) {
                    newProgress = 0;
                }
                return newProgress;
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    // Points d'intérêt sur le CV que la loupe va visiter
    const focusPoints = [
        { x: 150, y: 60, label: 'Photo' },
        { x: 150, y: 130, label: 'Nom' },
        { x: 150, y: 200, label: 'Compétences' },
        { x: 150, y: 280, label: 'Expérience' },
    ];

    // Calcul de la position de la loupe
    const getLoupePosition = () => {
        const totalPoints = focusPoints.length;
        const segmentDuration = 1 / totalPoints;
        const currentSegment = Math.floor(progress * totalPoints) % totalPoints;
        const nextSegment = (currentSegment + 1) % totalPoints;
        const segmentProgress = (progress * totalPoints) % 1;

        // Easing pour un mouvement fluide
        const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const easedProgress = easeInOutCubic(segmentProgress);

        const currentPoint = focusPoints[currentSegment];
        const nextPoint = focusPoints[nextSegment];

        return {
            x: currentPoint.x + (nextPoint.x - currentPoint.x) * easedProgress,
            y: currentPoint.y + (nextPoint.y - currentPoint.y) * easedProgress,
        };
    };

    const loupePos = getLoupePosition();
    const loupeRadius = 35;
    const zoomScale = 1.4;

    return (
        <div className="cv-loupe-animation-container">
            <svg
                viewBox="0 0 300 380"
                preserveAspectRatio="xMidYMid meet"
                className="cv-loupe-animation-svg"
            >
                <defs>
                    {/* Clip pour la loupe */}
                    <clipPath id="loupeClip">
                        <circle cx={loupePos.x} cy={loupePos.y} r={loupeRadius} />
                    </clipPath>

                    {/* Gradient pour le verre */}
                    <radialGradient id="glassGradient" cx="30%" cy="30%">
                        <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="white" stopOpacity="0.05" />
                    </radialGradient>
                </defs>

                {/* Document CV - Version normale */}
                <g className="cv-document">
                    {/* Fond du document */}
                    <rect
                        x={50}
                        y={20}
                        width={200}
                        height={300}
                        rx={8}
                        fill="#1a1b5e"
                        stroke="#7577CD"
                        strokeWidth={2}
                    />

                    {/* Photo placeholder */}
                    <circle cx={150} cy={60} r={25} fill="#0E1084" stroke="#7577CD" strokeWidth={1} />
                    <circle cx={150} cy={55} r={8} fill="#7577CD" opacity={0.5} />
                    <ellipse cx={150} cy={72} rx={12} ry={8} fill="#7577CD" opacity={0.5} />

                    {/* Nom */}
                    <rect x={90} y={100} width={120} height={10} rx={5} fill="#7577CD" opacity={0.8} />
                    <rect x={110} y={115} width={80} height={6} rx={3} fill="#A0A3FF" opacity={0.5} />

                    {/* Section Compétences */}
                    <rect x={70} y={145} width={60} height={6} rx={3} fill="#7577CD" opacity={0.6} />
                    <rect x={70} y={160} width={160} height={4} rx={2} fill="#bdbecd" opacity={0.3} />
                    <rect x={70} y={170} width={140} height={4} rx={2} fill="#bdbecd" opacity={0.3} />
                    <rect x={70} y={180} width={150} height={4} rx={2} fill="#bdbecd" opacity={0.3} />
                    <rect x={70} y={190} width={120} height={4} rx={2} fill="#bdbecd" opacity={0.3} />

                    {/* Barres de compétences */}
                    <rect x={70} y={205} width={160} height={6} rx={3} fill="#0E1084" />
                    <rect x={70} y={205} width={140} height={6} rx={3} fill="#7577CD" opacity={0.7} />
                    <rect x={70} y={215} width={160} height={6} rx={3} fill="#0E1084" />
                    <rect x={70} y={215} width={120} height={6} rx={3} fill="#7577CD" opacity={0.7} />

                    {/* Section Expérience */}
                    <rect x={70} y={240} width={70} height={6} rx={3} fill="#7577CD" opacity={0.6} />
                    <rect x={70} y={255} width={160} height={4} rx={2} fill="#bdbecd" opacity={0.3} />
                    <rect x={70} y={265} width={140} height={4} rx={2} fill="#bdbecd" opacity={0.3} />
                    <rect x={70} y={275} width={155} height={4} rx={2} fill="#bdbecd" opacity={0.3} />
                    <rect x={70} y={285} width={130} height={4} rx={2} fill="#bdbecd" opacity={0.3} />
                    <rect x={70} y={295} width={145} height={4} rx={2} fill="#bdbecd" opacity={0.3} />
                </g>

                {/* Document CV - Version zoomée (visible uniquement dans la loupe) */}
                <g clipPath="url(#loupeClip)">
                    <g transform={`translate(${loupePos.x}, ${loupePos.y}) scale(${zoomScale}) translate(${-loupePos.x}, ${-loupePos.y})`}>
                        {/* Fond du document */}
                        <rect
                            x={50}
                            y={20}
                            width={200}
                            height={300}
                            rx={8}
                            fill="#252680"
                            stroke="#A0A3FF"
                            strokeWidth={2}
                        />

                        {/* Photo placeholder */}
                        <circle cx={150} cy={60} r={25} fill="#1a1b5e" stroke="#A0A3FF" strokeWidth={1.5} />
                        <circle cx={150} cy={55} r={8} fill="#A0A3FF" opacity={0.7} />
                        <ellipse cx={150} cy={72} rx={12} ry={8} fill="#A0A3FF" opacity={0.7} />

                        {/* Nom */}
                        <rect x={90} y={100} width={120} height={10} rx={5} fill="#A0A3FF" />
                        <rect x={110} y={115} width={80} height={6} rx={3} fill="#bdbecd" opacity={0.7} />

                        {/* Section Compétences */}
                        <rect x={70} y={145} width={60} height={6} rx={3} fill="#A0A3FF" opacity={0.8} />
                        <rect x={70} y={160} width={160} height={4} rx={2} fill="#bdbecd" opacity={0.5} />
                        <rect x={70} y={170} width={140} height={4} rx={2} fill="#bdbecd" opacity={0.5} />
                        <rect x={70} y={180} width={150} height={4} rx={2} fill="#bdbecd" opacity={0.5} />
                        <rect x={70} y={190} width={120} height={4} rx={2} fill="#bdbecd" opacity={0.5} />

                        {/* Barres de compétences */}
                        <rect x={70} y={205} width={160} height={6} rx={3} fill="#1a1b5e" />
                        <rect x={70} y={205} width={140} height={6} rx={3} fill="#A0A3FF" />
                        <rect x={70} y={215} width={160} height={6} rx={3} fill="#1a1b5e" />
                        <rect x={70} y={215} width={120} height={6} rx={3} fill="#A0A3FF" />

                        {/* Section Expérience */}
                        <rect x={70} y={240} width={70} height={6} rx={3} fill="#A0A3FF" opacity={0.8} />
                        <rect x={70} y={255} width={160} height={4} rx={2} fill="#bdbecd" opacity={0.5} />
                        <rect x={70} y={265} width={140} height={4} rx={2} fill="#bdbecd" opacity={0.5} />
                        <rect x={70} y={275} width={155} height={4} rx={2} fill="#bdbecd" opacity={0.5} />
                        <rect x={70} y={285} width={130} height={4} rx={2} fill="#bdbecd" opacity={0.5} />
                        <rect x={70} y={295} width={145} height={4} rx={2} fill="#bdbecd" opacity={0.5} />
                    </g>
                </g>

                {/* Loupe */}
                <g className="loupe">
                    {/* Cercle de la loupe */}
                    <circle
                        cx={loupePos.x}
                        cy={loupePos.y}
                        r={loupeRadius}
                        fill="url(#glassGradient)"
                        stroke="#A0A3FF"
                        strokeWidth={3}
                    />

                    {/* Reflet sur le verre */}
                    <ellipse
                        cx={loupePos.x - 10}
                        cy={loupePos.y - 12}
                        rx={12}
                        ry={6}
                        fill="white"
                        opacity={0.15}
                    />

                    {/* Manche de la loupe */}
                    <line
                        x1={loupePos.x + loupeRadius * 0.7}
                        y1={loupePos.y + loupeRadius * 0.7}
                        x2={loupePos.x + loupeRadius * 0.7 + 35}
                        y2={loupePos.y + loupeRadius * 0.7 + 35}
                        stroke="#7577CD"
                        strokeWidth={8}
                        strokeLinecap="round"
                    />
                    <line
                        x1={loupePos.x + loupeRadius * 0.7}
                        y1={loupePos.y + loupeRadius * 0.7}
                        x2={loupePos.x + loupeRadius * 0.7 + 35}
                        y2={loupePos.y + loupeRadius * 0.7 + 35}
                        stroke="#A0A3FF"
                        strokeWidth={4}
                        strokeLinecap="round"
                    />
                </g>
            </svg>
        </div>
    );
};

export default CVLoupeAnimation;
