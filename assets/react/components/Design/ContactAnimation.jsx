import React, { useEffect, useState, useRef } from 'react';
import './Design.css';

const ContactAnimation = () => {
    const [progress, setProgress] = useState(0);
    const animationRef = useRef();
    const lastTimeRef = useRef(0);

    const cycleDuration = 5000;

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

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Animation de l'enveloppe qui s'ouvre et du message qui part
    const envelopeOpen = () => {
        if (progress < 0.1) return 0;
        if (progress < 0.3) return easeOutCubic((progress - 0.1) / 0.2);
        if (progress < 0.7) return 1;
        if (progress < 0.9) return 1 - easeOutCubic((progress - 0.7) / 0.2);
        return 0;
    };

    const messageFloat = () => {
        if (progress < 0.25) return 0;
        if (progress < 0.5) return easeOutCubic((progress - 0.25) / 0.25);
        if (progress < 0.65) return 1;
        if (progress < 0.85) return 1 - easeInOutCubic((progress - 0.65) / 0.2);
        return 0;
    };

    const lerp = (start, end, t) => start + (end - start) * t;

    const openProgress = envelopeOpen();
    const floatProgress = messageFloat();

    // Position du message (monte quand il part)
    const messageY = lerp(140, 60, floatProgress);
    const messageOpacity = floatProgress > 0.8 ? lerp(1, 0, (floatProgress - 0.8) / 0.2) : 1;
    const messageScale = lerp(0.8, 1, Math.min(floatProgress * 2, 1));

    // Rotation du rabat de l'enveloppe
    const flapRotation = lerp(0, 180, openProgress);

    // Particules qui partent avec le message
    const particles = [
        { delay: 0, offsetX: -30, offsetY: -10 },
        { delay: 0.05, offsetX: 30, offsetY: -15 },
        { delay: 0.1, offsetX: -20, offsetY: -25 },
        { delay: 0.15, offsetX: 25, offsetY: -20 },
        { delay: 0.08, offsetX: 0, offsetY: -30 },
    ];

    return (
        <div className="contact-animation-container">
            <svg
                viewBox="0 0 300 280"
                preserveAspectRatio="xMidYMid meet"
                className="contact-animation-svg"
            >
                {/* Cercles décoratifs en arrière-plan */}
                <circle cx={60} cy={60} r={8} fill="#7577CD" opacity={0.2 + Math.sin(progress * Math.PI * 4) * 0.1} />
                <circle cx={240} cy={80} r={6} fill="#A0A3FF" opacity={0.2 + Math.cos(progress * Math.PI * 3) * 0.1} />
                <circle cx={50} cy={200} r={5} fill="#7577CD" opacity={0.2 + Math.sin(progress * Math.PI * 5) * 0.1} />
                <circle cx={250} cy={220} r={7} fill="#A0A3FF" opacity={0.2 + Math.cos(progress * Math.PI * 4) * 0.1} />

                {/* Particules */}
                {particles.map((particle, i) => {
                    const pProgress = Math.max(0, Math.min(1, (floatProgress - particle.delay) / 0.6));
                    if (pProgress <= 0) return null;
                    return (
                        <circle
                            key={i}
                            cx={150 + particle.offsetX}
                            cy={messageY + particle.offsetY - pProgress * 40}
                            r={3}
                            fill="#A0A3FF"
                            opacity={(1 - pProgress) * 0.6}
                        />
                    );
                })}

                {/* Message / Lettre */}
                <g
                    transform={`translate(150, ${messageY}) scale(${messageScale})`}
                    opacity={floatProgress > 0 ? messageOpacity : 0}
                >
                    {/* Lettre avec coins carrés en haut, arrondis en bas */}
                    <path
                        d="M -40 -25 L 40 -25 L 40 17 Q 40 25 32 25 L -32 25 Q -40 25 -40 17 Z"
                        fill="white"
                        stroke="#7577CD"
                        strokeWidth={1}
                    />
                    {/* Lignes de texte */}
                    <rect x={-30} y={-15} width={40} height={4} rx={2} fill="#7577CD" opacity={0.6} />
                    <rect x={-30} y={-5} width={50} height={4} rx={2} fill="#7577CD" opacity={0.4} />
                    <rect x={-30} y={5} width={35} height={4} rx={2} fill="#7577CD" opacity={0.4} />
                    <rect x={-30} y={15} width={45} height={4} rx={2} fill="#7577CD" opacity={0.3} />
                </g>

                {/* Enveloppe */}
                <g transform="translate(150, 180)">
                    {/* Corps de l'enveloppe */}
                    <rect
                        x={-60}
                        y={-30}
                        width={120}
                        height={70}
                        rx={6}
                        fill="#0E1084"
                        stroke="#7577CD"
                        strokeWidth={2}
                    />

                    {/* Intérieur visible quand ouvert */}
                    <rect
                        x={-55}
                        y={-25}
                        width={110}
                        height={40}
                        fill="#1a1b5e"
                        opacity={openProgress}
                    />

                    {/* Rabat de l'enveloppe */}
                    <g style={{ transformOrigin: '0 -30px', transform: `rotateX(${flapRotation}deg)` }}>
                        <path
                            d={`M -60 -30 L 0 10 L 60 -30 Z`}
                            fill="#0E1084"
                            stroke="#7577CD"
                            strokeWidth={2}
                        />
                    </g>

                    {/* Triangle décoratif du bas */}
                    <path
                        d={`M -60 40 L 0 10 L 60 40 Z`}
                        fill="none"
                        stroke="#7577CD"
                        strokeWidth={1}
                        opacity={0.5}
                    />
                </g>

                {/* Icônes de contact autour */}
                <g opacity={0.5 + Math.sin(progress * Math.PI * 2) * 0.2}>
                    {/* Email icon */}
                    <text x={70} y={140} fontSize={20} fill="#7577CD">@</text>
                </g>
                <g opacity={0.5 + Math.cos(progress * Math.PI * 2) * 0.2}>
                    {/* LinkedIn style */}
                    <rect x={220} y={125} width={18} height={18} rx={3} fill="none" stroke="#7577CD" strokeWidth={1.5} />
                    <text x={224} y={139} fontSize={12} fill="#7577CD" fontWeight="bold">in</text>
                </g>
                <g opacity={0.5 + Math.sin(progress * Math.PI * 2 + 1) * 0.2}>
                    {/* GitHub style */}
                    <circle cx={80} cy={220} r={10} fill="none" stroke="#A0A3FF" strokeWidth={1.5} />
                    <circle cx={80} cy={218} r={4} fill="#A0A3FF" />
                </g>

                {/* Defs */}
                <defs>
                    <linearGradient id="envelopeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#7577CD" />
                        <stop offset="100%" stopColor="#0E1084" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default ContactAnimation;
