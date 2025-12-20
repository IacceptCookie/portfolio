import React, { useEffect, useState, useRef, useCallback } from 'react';
import './Design.css';

const ReactComponentsAssembly = () => {
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

    const easeOutBack = (t) => {
        const c1 = 1.70158;
        const c3 = c1 + 1;
        return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    const easeInOutCubic = (t) => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const getAssemblyProgress = useCallback((componentDelay) => {
        const pauseDispersedEnd = 0.10;
        const assembleStart = pauseDispersedEnd + componentDelay * 0.05;
        const assembleEnd = 0.35 + componentDelay * 0.04;
        const pauseAssembledEnd = 0.70;
        const disperseStart = pauseAssembledEnd + componentDelay * 0.02;
        const disperseEnd = 0.88 + componentDelay * 0.02;

        if (progress < assembleStart) {
            return 0;
        } else if (progress < assembleEnd) {
            const t = (progress - assembleStart) / (assembleEnd - assembleStart);
            return easeOutBack(Math.min(t, 1));
        } else if (progress < disperseStart) {
            return 1;
        } else if (progress < disperseEnd) {
            const t = (progress - disperseStart) / (disperseEnd - disperseStart);
            return 1 - easeInOutCubic(Math.min(t, 1));
        } else {
            return 0;
        }
    }, [progress]);

    const components = [
        {
            id: 'navbar',
            label: 'Navbar',
            finalX: 50,
            finalY: 55,
            width: 300,
            height: 40,
            scatterX: 380,
            scatterY: -20,
            delay: 0,
        },
        {
            id: 'sidebar',
            label: 'Sidebar',
            finalX: 50,
            finalY: 105,
            width: 80,
            height: 200,
            scatterX: -60,
            scatterY: 320,
            delay: 1,
        },
        {
            id: 'hero',
            label: 'Hero',
            finalX: 140,
            finalY: 105,
            width: 210,
            height: 80,
            scatterX: 420,
            scatterY: 80,
            delay: 2,
        },
        {
            id: 'card1',
            label: 'Card',
            finalX: 140,
            finalY: 195,
            width: 100,
            height: 110,
            scatterX: 400,
            scatterY: 350,
            delay: 3,
        },
        {
            id: 'card2',
            label: 'Card',
            finalX: 250,
            finalY: 195,
            width: 100,
            height: 110,
            scatterX: -40,
            scatterY: 150,
            delay: 3.5,
        },
        {
            id: 'footer',
            label: 'Footer',
            finalX: 50,
            finalY: 315,
            width: 300,
            height: 35,
            scatterX: 60,
            scatterY: 420,
            delay: 4,
        },
    ];

    const lerp = (start, end, t) => start + (end - start) * t;

    const UIBlock = ({ component }) => {
        const assemblyProgress = getAssemblyProgress(component.delay);

        const x = lerp(component.scatterX, component.finalX, assemblyProgress);
        const y = lerp(component.scatterY, component.finalY, assemblyProgress);
        const scale = lerp(0.85, 1, assemblyProgress);
        const opacity = lerp(0.5, 1, assemblyProgress);
        const rotation = lerp(Math.sin(component.delay) * 15, 0, assemblyProgress);

        return (
            <g
                transform={`translate(${x}, ${y}) rotate(${rotation}, ${component.width / 2}, ${component.height / 2}) scale(${scale})`}
                opacity={opacity}
            >
                <rect
                    x={4}
                    y={4}
                    width={component.width}
                    height={component.height}
                    rx="8"
                    fill="#61DAFB"
                    opacity={0.15 * assemblyProgress}
                />

                <rect
                    x={0}
                    y={0}
                    width={component.width}
                    height={component.height}
                    rx="8"
                    fill="#282C34"
                    stroke="#61DAFB"
                    strokeWidth={lerp(1, 2, assemblyProgress)}
                />

                {component.id === 'navbar' && (
                    <>
                        <circle cx={20} cy={20} r="8" fill="#61DAFB" opacity="0.8" />
                        <rect x={40} y={16} width={40} height={8} rx="4" fill="#61DAFB" opacity="0.4" />
                        <rect x={200} y={16} width={30} height={8} rx="4" fill="#61DAFB" opacity="0.3" />
                        <rect x={240} y={16} width={30} height={8} rx="4" fill="#61DAFB" opacity="0.3" />
                    </>
                )}

                {component.id === 'sidebar' && (
                    <>
                        <rect x={15} y={20} width={50} height={6} rx="3" fill="#61DAFB" opacity="0.5" />
                        <rect x={15} y={40} width={40} height={6} rx="3" fill="#61DAFB" opacity="0.3" />
                        <rect x={15} y={60} width={45} height={6} rx="3" fill="#61DAFB" opacity="0.3" />
                        <rect x={15} y={80} width={35} height={6} rx="3" fill="#61DAFB" opacity="0.3" />
                        <rect x={15} y={100} width={50} height={6} rx="3" fill="#61DAFB" opacity="0.3" />
                        <rect x={15} y={140} width={50} height={20} rx="4" fill="#61DAFB" opacity="0.2" />
                    </>
                )}

                {component.id === 'hero' && (
                    <>
                        <rect x={20} y={15} width={120} height={10} rx="5" fill="#61DAFB" opacity="0.6" />
                        <rect x={20} y={32} width={170} height={6} rx="3" fill="#61DAFB" opacity="0.3" />
                        <rect x={20} y={44} width={140} height={6} rx="3" fill="#61DAFB" opacity="0.3" />
                        <rect x={20} y={58} width={60} height={14} rx="7" fill="#61DAFB" opacity="0.8" />
                    </>
                )}

                {(component.id === 'card1' || component.id === 'card2') && (
                    <>
                        <rect x={10} y={10} width={80} height={45} rx="4" fill="#61DAFB" opacity="0.2" />
                        <rect x={10} y={65} width={60} height={8} rx="4" fill="#61DAFB" opacity="0.5" />
                        <rect x={10} y={80} width={75} height={5} rx="2" fill="#61DAFB" opacity="0.3" />
                        <rect x={10} y={90} width={50} height={5} rx="2" fill="#61DAFB" opacity="0.3" />
                    </>
                )}

                {component.id === 'footer' && (
                    <>
                        <rect x={20} y={14} width={60} height={7} rx="3" fill="#61DAFB" opacity="0.3" />
                        <rect x={200} y={14} width={30} height={7} rx="3" fill="#61DAFB" opacity="0.2" />
                        <rect x={240} y={14} width={30} height={7} rx="3" fill="#61DAFB" opacity="0.2" />
                    </>
                )}

                <text
                    x={component.width / 2}
                    y={-8}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="500"
                    fill="#61DAFB"
                    opacity={lerp(0.3, 0.9, assemblyProgress)}
                    className="react-assembly-label"
                >
                    {`<${component.label}/>`}
                </text>
            </g>
        );
    };

    const BrowserFrame = () => {
        const frameProgress = getAssemblyProgress(2);
        const frameOpacity = lerp(0.2, 1, frameProgress);

        return (
            <g opacity={frameOpacity}>
                <rect
                    x={30}
                    y={25}
                    width={340}
                    height={345}
                    rx="12"
                    fill="none"
                    stroke="#61DAFB"
                    strokeWidth={lerp(1, 2, frameProgress)}
                    strokeDasharray={frameProgress > 0.8 ? 'none' : '8 4'}
                />

                <rect x={30} y={25} width={340} height={25} rx="12" fill="#61DAFB" opacity="0.1" />
                <circle cx={45} cy={37} r="5" fill="#FF5F56" opacity="0.8" />
                <circle cx={62} cy={37} r="5" fill="#FFBD2E" opacity="0.8" />
                <circle cx={79} cy={37} r="5" fill="#27CA40" opacity="0.8" />
                <rect x={100} y={32} width={200} height={10} rx="5" fill="#61DAFB" opacity="0.2" />
            </g>
        );
    };

    return (
        <div className="react-assembly-container">
            <svg
                viewBox="0 0 400 400"
                preserveAspectRatio="xMidYMid meet"
                className="react-assembly-svg"
            >
                <BrowserFrame />

                {components.map((component) => (
                    <UIBlock key={component.id} component={component} />
                ))}
            </svg>
        </div>
    );
};

export default ReactComponentsAssembly;