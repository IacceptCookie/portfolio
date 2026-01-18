import React, { useEffect, useState, useRef } from 'react';
import './Design.css';

const ProfileCardAnimation = () => {
    const [progress, setProgress] = useState(0);
    const animationRef = useRef();
    const lastTimeRef = useRef(0);

    const cycleDuration = 6000;

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

    const easeOutBack = (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    const getElementProgress = (delay) => {
        const startTime = 0.05 + delay * 0.08;
        const endTime = startTime + 0.2;
        const holdEnd = 0.75;
        const fadeStart = holdEnd + delay * 0.02;
        const fadeEnd = 0.95;

        if (progress < startTime) return 0;
        if (progress < endTime) {
            const t = (progress - startTime) / (endTime - startTime);
            return easeOutBack(Math.min(t, 1));
        }
        if (progress < fadeStart) return 1;
        if (progress < fadeEnd) {
            const t = (progress - fadeStart) / (fadeEnd - fadeStart);
            return 1 - t;
        }
        return 0;
    };

    const lerp = (start, end, t) => start + (end - start) * t;

    const skills = [
        { label: 'Data Engineering', width: 85, delay: 0 },
        { label: 'PostgreSQL', width: 90, delay: 1 },
        { label: 'React / Symfony', width: 75, delay: 2 },
        { label: 'Python', width: 80, delay: 3 },
    ];

    return (
        <div className="profile-card-animation-container">
            <svg
                viewBox="0 0 300 320"
                preserveAspectRatio="xMidYMid meet"
                className="profile-card-animation-svg"
            >
                {/* Carte principale */}
                <g opacity={lerp(0, 1, getElementProgress(0))}>
                    {/* Ombre */}
                    <rect
                        x={24}
                        y={24}
                        width={260}
                        height={280}
                        rx={16}
                        fill="#7577CD"
                        opacity={0.3}
                    />
                    {/* Fond carte */}
                    <rect
                        x={20}
                        y={20}
                        width={260}
                        height={280}
                        rx={16}
                        fill="#0E1084"
                        stroke="#7577CD"
                        strokeWidth={2}
                    />
                </g>

                {/* Avatar placeholder */}
                <g opacity={lerp(0, 1, getElementProgress(1))}>
                    <circle
                        cx={150}
                        cy={75}
                        r={35}
                        fill="#7577CD"
                        opacity={0.3}
                    />
                    <circle
                        cx={150}
                        cy={75}
                        r={32}
                        fill="url(#avatarGradient)"
                        stroke="#A0A3FF"
                        strokeWidth={2}
                    />
                    <text
                        x={150}
                        y={83}
                        textAnchor="middle"
                        fontSize={24}
                        fontWeight="bold"
                        fill="white"
                        className="profile-card-initials"
                    >
                        RD
                    </text>
                </g>

                {/* Nom */}
                <g opacity={lerp(0, 1, getElementProgress(2))}>
                    <text
                        x={150}
                        y={135}
                        textAnchor="middle"
                        fontSize={18}
                        fontWeight="bold"
                        fill="white"
                        className="profile-card-name"
                    >
                        Raphaël Durand
                    </text>
                    <text
                        x={150}
                        y={155}
                        textAnchor="middle"
                        fontSize={12}
                        fill="#A0A3FF"
                        className="profile-card-title"
                    >
                        Data Engineer & Dev Full-Stack
                    </text>
                </g>

                {/* Ligne de séparation */}
                <line
                    x1={50}
                    y1={175}
                    x2={250}
                    y2={175}
                    stroke="#7577CD"
                    strokeWidth={1}
                    opacity={lerp(0, 0.5, getElementProgress(2))}
                />

                {/* Compétences */}
                {skills.map((skill, index) => {
                    const p = getElementProgress(3 + index);
                    const y = 195 + index * 28;
                    return (
                        <g key={skill.label} opacity={lerp(0, 1, p)}>
                            <text
                                x={50}
                                y={y}
                                fontSize={11}
                                fill="#bdbecd"
                                className="profile-card-skill-label"
                            >
                                {skill.label}
                            </text>
                            {/* Barre de fond */}
                            <rect
                                x={50}
                                y={y + 5}
                                width={200}
                                height={6}
                                rx={3}
                                fill="#1a1b5e"
                            />
                            {/* Barre de progression */}
                            <rect
                                x={50}
                                y={y + 5}
                                width={lerp(0, skill.width * 2, p)}
                                height={6}
                                rx={3}
                                fill="url(#skillGradient)"
                            />
                        </g>
                    );
                })}

                {/* Defs pour les gradients */}
                <defs>
                    <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#0E1084" />
                        <stop offset="100%" stopColor="#7577CD" />
                    </linearGradient>
                    <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7577CD" />
                        <stop offset="100%" stopColor="#A0A3FF" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
};

export default ProfileCardAnimation;
