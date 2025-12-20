import React, { useState, useEffect, useCallback, useRef } from 'react';
import './Design.css';

const MicroservicesArchitecture = () => {
    const [hoveredService, setHoveredService] = useState(null);
    const [autoCycleIndex, setAutoCycleIndex] = useState(0);
    const [isUserHovering, setIsUserHovering] = useState(false);
    const autoCycleTimerRef = useRef(null);

    // Configuration du SVG responsive
    const viewBoxWidth = 600;
    const viewBoxHeight = 480;
    const centerX = viewBoxWidth / 2;
    const centerY = viewBoxHeight / 2;
    const radius = Math.min(viewBoxWidth, viewBoxHeight) * 0.3;

    // Configuration des services
    const services = [
        {
            id: 'web',
            label: 'Site Web',
            icon: '/img/profile/web.svg',
            desc: 'Interface client & catalogue',
            angle: 270
        },
        {
            id: 'factory',
            label: 'Production',
            icon: '/img/profile/factory.svg',
            desc: 'Gestion de la chaîne industrielle',
            angle: 342
        },
        {
            id: 'pos',
            label: 'Point de vente',
            icon: '/img/profile/pos.svg',
            desc: 'Transactions & encaissements',
            angle: 54
        },
        {
            id: 'hr',
            label: 'Ressources humaines',
            icon: '/img/profile/hr.svg',
            desc: 'Gestion des équipes',
            angle: 126
        },
        {
            id: 'inventory',
            label: 'Inventaire',
            icon: '/img/profile/inventory.svg',
            desc: 'Stocks & logistique',
            angle: 198
        },
    ];

    // Configuration des icônes (proportionnelle au viewBox)
    const iconSize = 44;

    // Auto-cycle des services quand l'utilisateur ne hover pas
    useEffect(() => {
        if (!isUserHovering) {
            autoCycleTimerRef.current = setInterval(() => {
                setAutoCycleIndex((prevIndex) => (prevIndex + 1) % services.length);
            }, 2500); // Change toutes les 2.5 secondes
        }

        return () => {
            if (autoCycleTimerRef.current) {
                clearInterval(autoCycleTimerRef.current);
            }
        };
    }, [isUserHovering, services.length]);

    // Détermine quel service est actuellement "actif" (hover manuel ou auto-cycle)
    const activeServiceId = isUserHovering
        ? hoveredService
        : services[autoCycleIndex]?.id;

    const getServicePosition = useCallback((angle) => {
        const radian = (angle * Math.PI) / 180;
        return {
            x: centerX + radius * Math.cos(radian),
            y: centerY + radius * Math.sin(radian),
        };
    }, [centerX, centerY, radius]);

    // Gestion du hover utilisateur
    const handleMouseEnter = (serviceId) => {
        setIsUserHovering(true);
        setHoveredService(serviceId);
    };

    const handleMouseLeave = () => {
        setIsUserHovering(false);
        setHoveredService(null);
    };

    // Cylindre BDD
    const DatabaseCylinder = ({ x, y, isHovered }) => {
        const cx = x;
        const cy = y;
        const rx = 18;
        const ry = 6;
        const height = 22;

        return (
            <g>
                {/* Corps */}
                <path
                    d={`
            M ${cx - rx} ${cy}
            L ${cx - rx} ${cy + height}
            A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + height}
            L ${cx + rx} ${cy}
          `}
                    fill={isHovered ? '#2D5F85' : '#2A4F6E'}
                    stroke="#111217"
                    strokeWidth="1"
                />

                {/* Ellipse bas */}
                <ellipse
                    cx={cx}
                    cy={cy + height}
                    rx={rx}
                    ry={ry}
                    fill="#243D54"
                    stroke="#111217"
                    strokeWidth="1"
                />

                {/* Bandes */}
                <ellipse
                    cx={cx}
                    cy={cy + height * 0.35}
                    rx={rx}
                    ry={ry}
                    fill="none"
                    stroke="#336791"
                    strokeWidth="1.5"
                    opacity="0.6"
                />
                <ellipse
                    cx={cx}
                    cy={cy + height * 0.7}
                    rx={rx}
                    ry={ry}
                    fill="none"
                    stroke="#336791"
                    strokeWidth="1.5"
                    opacity="0.6"
                />

                {/* Dessus */}
                <ellipse
                    cx={cx}
                    cy={cy}
                    rx={rx}
                    ry={ry}
                    fill={isHovered ? '#4080B0' : '#336791'}
                    stroke="#111217"
                    strokeWidth="1"
                />

                {/* Reflet */}
                <ellipse
                    cx={cx - 5}
                    cy={cy - 1}
                    rx={6}
                    ry={2}
                    fill="#689DC9"
                    opacity="0.3"
                />
            </g>
        );
    };

    // Ligne de connexion entre services
    const ConnectionLine = ({ from, to, isHighlighted }) => {
        const pos1 = getServicePosition(from.angle);
        const pos2 = getServicePosition(to.angle);

        return (
            <line
                x1={pos1.x}
                y1={pos1.y}
                x2={pos2.x}
                y2={pos2.y}
                stroke="#689DC9"
                strokeDasharray="6 4"
                className={`connection-line ${isHighlighted ? 'connection-line--highlighted' : 'connection-line--default'}`}
            />
        );
    };

    // Connexions entre services (indices dans le tableau services)
    const connections = [
        [0, 1], [0, 2], [0, 4],
        [1, 4],
        [2, 3], [2, 4],
        [3, 1],
    ];

    return (
        <div className="microservices-container">
            <div className="microservices-wrapper">
                {/* Visuel */}
                <div className="microservices-visual">
                    <svg
                        className="microservices-svg"
                        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Connexions en arrière-plan */}
                        {connections.map(([i, j], idx) => (
                            <ConnectionLine
                                key={idx}
                                from={services[i]}
                                to={services[j]}
                                isHighlighted={
                                    activeServiceId === services[i].id ||
                                    activeServiceId === services[j].id
                                }
                            />
                        ))}

                        {/* Services */}
                        {services.map((service) => {
                            const pos = getServicePosition(service.angle);
                            const isActive = activeServiceId === service.id;

                            return (
                                <g
                                    key={service.id}
                                    className="service-node"
                                    onMouseEnter={() => handleMouseEnter(service.id)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {/* Glow au hover */}
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r="55"
                                        fill="#689DC9"
                                        opacity={isActive ? 0.2 : 0}
                                        className="service-glow"
                                    />

                                    {/* Ligne de connexion icône -> BDD */}
                                    <line
                                        x1={pos.x}
                                        y1={pos.y - 5}
                                        x2={pos.x}
                                        y2={pos.y + 25}
                                        stroke="#689DC9"
                                        strokeWidth="2"
                                        opacity="0.5"
                                        className="service-connector"
                                    />

                                    {/* Icône du service (image externe) */}
                                    <image
                                        href={service.icon}
                                        x={pos.x - iconSize / 2}
                                        y={pos.y - iconSize + 15}
                                        width={iconSize}
                                        height={iconSize}
                                        opacity={isActive ? 1 : 0.85}
                                        className={`service-icon ${isActive ? 'service-icon--hovered' : ''}`}
                                    />

                                    {/* Cylindre BDD */}
                                    <DatabaseCylinder x={pos.x} y={pos.y + 25} isHovered={isActive} />

                                    {/* Label */}
                                    <text
                                        x={pos.x}
                                        y={pos.y + 68}
                                        textAnchor="middle"
                                        fontSize="16"
                                        className={`service-label ${isActive ? 'service-label--hovered' : 'service-label--default'}`}
                                    >
                                        {service.label}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Label central */}
                        <text
                            x={centerX}
                            y={centerY - 5}
                            textAnchor="middle"
                            fontSize="16"
                            className="central-label-title"
                        >
                            PostgreSQL
                        </text>
                    </svg>

                    {/* Tooltip */}
                    {activeServiceId && (
                        <div className="microservices-tooltip">
                            {services.find((s) => s.id === activeServiceId)?.desc}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MicroservicesArchitecture;
