import React, {useRef, useState, useEffect} from "react";
import "./Grafana.css";

function XYChartPanel(
    {
        data,
    }
) {
    function useResizeObserver(ref, onResize) {
        useEffect(() => {
            if (!ref.current) return;

            let rafId = null;

            const obs = new ResizeObserver(([entry]) => {
                if (rafId) return;

                rafId = requestAnimationFrame(() => {
                    rafId = null;
                    onResize(entry.contentRect);
                });
            });

            obs.observe(ref.current);
            return () => {
                obs.disconnect();
                if (rafId) cancelAnimationFrame(rafId);
            };
        }, [ref, onResize]);
    }

    function catmullRomToBezier(points, xMin, xMax, yMin, yMax) {
        if (!points || points.length === 0) return "";

        const scaleX = x => ((x - xMin) / (xMax - xMin)) * 500;
        const scaleY = y => 400 - ((y - yMin) / (yMax - yMin)) * 400;

        const p = points.map(([x, y]) => [scaleX(x), scaleY(y)]);

        let d = `M ${p[0][0]},${p[0][1]}`;

        for (let i = 0; i < p.length - 1; i++) {
            const [x0, y0] = i > 0 ? p[i - 1] : p[i];
            const [x1, y1] = p[i];
            const [x2, y2] = p[i + 1];
            const [x3, y3] = i !== p.length - 2 ? p[i + 2] : p[i + 1];

            const cp1x = x1 + (x2 - x0) / 6;
            const cp1y = y1 + (y2 - y0) / 6;

            const cp2x = x2 - (x3 - x1) / 6;
            const cp2y = y2 - (y3 - y1) / 6;

            d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x2},${y2}`;
        }

        return d;
    }

    const xAxisRef = useRef(null);
    const yAxisRef = useRef(null);
    const [xLabels, setXLabels] = useState([]);
    const [yLabels, setYLabels] = useState([]);
    const [xSize, setXSize] = useState({ width: 0, height: 0 });
    const [ySize, setYSize] = useState({ width: 0, height: 0 });

    useResizeObserver(xAxisRef, ({ width, height }) => {
        setXSize(prev => {
            if (prev.width === width && prev.height === height) return prev;
            return { width, height };
        });
    });

    useResizeObserver(yAxisRef, ({ width, height }) => {
        setYSize(prev => {
            if (prev.width === width && prev.height === height) return prev;
            return { width, height };
        });
    });

    useEffect(() => {
        if (!xAxisRef.current) return;

        const width = xSize.width;
        if (!width) return;

        const minLabelSpacing = 60;
        const range = data.xScaleMax - data.xScaleMin;
        const maxLabels = Math.floor(width / minLabelSpacing);

        const possibleSteps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000, 2500];

        let step = possibleSteps[0];
        for (const s of possibleSteps) {
            if (range / s <= maxLabels) {
                step = s;
                break;
            }
        }

        const start = Math.ceil(data.xScaleMin / step) * step;
        const end = Math.floor(data.xScaleMax / step) * step;

        const labels = [];
        for (let v = end; v >= start; v -= step) labels.push(v);

        if (!labels.includes(data.xScaleMax)) labels.unshift(data.xScaleMax);
        if (!labels.includes(data.xScaleMin)) labels.push(data.xScaleMin);

        setXLabels(labels.reverse());
    }, [data.xScaleMax, data.xScaleMin, xSize]);

    useEffect(() => {
        if (!yAxisRef.current) return;

        const height = ySize.height;
        if (!height) return;

        const minLabelSpacing = 35;
        const range = data.yScaleMax - data.yScaleMin;
        const maxLabels = Math.floor(height / minLabelSpacing);

        const possibleSteps = [0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000];

        let step = possibleSteps[0];
        for (const s of possibleSteps) {
            if (range / s <= maxLabels) {
                step = s;
                break;
            }
        }

        const start = Math.ceil(data.yScaleMin / step) * step;
        const end = Math.floor(data.yScaleMax / step) * step;

        const labels = [];
        for (let v = end; v >= start; v -= step) labels.push(v);

        if (!labels.includes(data.yScaleMax)) labels.unshift(data.yScaleMax);
        if (!labels.includes(data.yScaleMin)) labels.push(data.yScaleMin);

        setYLabels(labels);
    }, [data.yScaleMax, data.yScaleMin, ySize]);

    return (
        <div className="grafana-xy-chart-panel" style={{maxWidth: data.maxPanelWidth, maxHeight: data.maxPanelHeight}}>
            <div className="grafana-xy-chart-panel-content">
                <div className="grafana-xy-chart-panel__chart">
                    <div className="grafana-xy-chart-panel__chart-y-axis" ref={yAxisRef}>
                        {yLabels.map((label, index) => (
                            <p
                                key={index}
                                className="grafana-xy-chart-panel__chart-y-axis__label"
                            >
                                {label}
                            </p>
                        ))}
                    </div>
                    <div className="grafana-xy-chart-panel__chart-visual-wrapper">
                        <div className="grafana-xy-chart-panel__chart-visual">
                            <div className="grafana-xy-chart-panel__chart-visual__background-horizontal">
                                {yLabels.map((label, index) => (
                                    <div key={index} className="grafana-xy-chart-panel__chart-visual__background-horizontal-line" />
                                ))}
                            </div>
                            <div className="grafana-xy-chart-panel__chart-visual__background-vertical">
                                {xLabels.map((label, index) => (
                                    <div key={index} className="grafana-xy-chart-panel__chart-visual__background-vertical-line" />
                                ))}
                            </div>
                            <svg
                                width="100%"
                                height="100%"
                                viewBox="0 0 500 400"
                                preserveAspectRatio="none"
                                className="grafana-xy-chart-panel__chart-visual__line"
                            >
                                <path
                                    d={catmullRomToBezier(data.dots, data.xScaleMin, data.xScaleMax, data.yScaleMin, data.yScaleMax)}
                                    fill="none"
                                    stroke="rgb(115, 191, 105)"
                                    strokeWidth="2"
                                />
                            </svg>
                            <div className="grafana-xy-chart-panel__chart-visual__dot-wrapper">
                                {data.dots.map((dotCoords, index) => (
                                    <div
                                        key={index}
                                        className="grafana-xy-chart-panel__chart-visual__dot"
                                        style={
                                            {
                                                left: `calc(${Math.round(((dotCoords[0] - data.xScaleMin) / (data.xScaleMax - data.xScaleMin)) * 100)}% - 2.5px)`,
                                                top: `calc(${100 - Math.round(((dotCoords[1] - data.yScaleMin) / (data.yScaleMax - data.yScaleMin)) * 100)}% - 2.5px)`,
                                            }
                                        }
                                    />
                                ))}
                            </div>
                            <div className="grafana-xy-chart-panel__chart-visual__dot-hover-wrapper">
                                {data.dots.map((dotCoords, index) => (
                                    <div
                                        key={index}
                                        className="grafana-xy-chart-panel__chart-visual__dot-hover"
                                        style={
                                            {
                                                left: `calc(${Math.round(((dotCoords[0] - data.xScaleMin) / (data.xScaleMax - data.xScaleMin)) * 100)}% - 4.5px)`,
                                                top: `calc(${100 - Math.round(((dotCoords[1] - data.yScaleMin) / (data.yScaleMax - data.yScaleMin)) * 100)}% - 4.5px)`,
                                            }
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="grafana-xy-chart-panel__chart-x-axis" ref={xAxisRef}>
                            {xLabels.map((label, index) => (
                                <p
                                    key={index}
                                    className="grafana-xy-chart-panel__chart-x-axis__label"
                                >
                                    {label + "€"}
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="grafana-xy-chart-panel__legend">
                    <div
                        className="grafana-xy-chart-panel__legend-color"
                        style={{backgroundColor: `rgb(${data.legend.color})`}}
                    />
                    <p className="grafana-xy-chart-panel__legend-text">
                        {data.legend.name}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default XYChartPanel;