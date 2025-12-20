import React, {useRef, useState, useEffect} from "react";
import "./Grafana.css";

function BarChartPanel(
    {
        data
    }
) {
    const yAxisRef = useRef(null);
    const [yLabels, setYLabels] = useState([]);
    const [ySize, setYSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        if (!yAxisRef.current) return;
        const obs = new ResizeObserver(() => {
            setYSize({
                width: yAxisRef.current.offsetWidth,
                height: yAxisRef.current.offsetHeight
            });
        });
        obs.observe(yAxisRef.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        if (!yAxisRef.current) return;

        const height = ySize.height;
        if (!height) return;

        const minLabelSpacing = 35;

        const range = data.scaleMax - data.scaleMin;
        const maxLabels = Math.floor(height / minLabelSpacing);

        const possibleSteps = [1, 2, 5, 10, 20, 25, 50, 100, 200, 500, 1000];

        let step = possibleSteps[0];
        for (const s of possibleSteps) {
            if (range / s <= maxLabels) {
                step = s;
                break;
            }
        }

        const start = Math.ceil(data.scaleMin / step) * step;
        const end = Math.floor(data.scaleMax / step) * step;

        const labels = [];
        for (let v = end; v >= start; v -= step) {
            labels.push(v);
        }

        if (!labels.includes(data.scaleMax)) labels.unshift(data.scaleMax);
        if (!labels.includes(data.scaleMin)) labels.push(data.scaleMin);

        setYLabels(labels);
    }, [data.scaleMax, data.scaleMin, ySize]);

    return (
        <div className="grafana-bar-chart-panel" style={{maxWidth: data.maxPanelWidth, maxHeight: data.maxPanelHeight}}>
            <div className="grafana-bar-chart-panel-content">
                <div className="grafana-bar-chart-panel__chart">
                    <div className="grafana-bar-chart-panel__chart-y-axis" ref={yAxisRef}>
                        {yLabels.map((label, index) => (
                            <p
                                key={index}
                                className="grafana-bar-chart-panel__chart-y-axis__label"
                            >
                                {String(label) + data.unit}
                            </p>
                        ))}
                    </div>
                    <div className="grafana-bar-chart-panel__chart-visual-wrapper">
                        <div className="grafana-bar-chart-panel__chart-visual">
                            <div className="grafana-bar-chart-panel__chart-visual__background">
                                {yLabels.map((label, index) => (
                                    <div key={index} className="grafana-bar-chart-panel__chart-visual__background-line" />
                                ))}
                            </div>
                            <div className="grafana-bar-chart-panel__chart-visual__bar-wrapper">
                                {
                                    data.bars.map((bar, index) =>
                                        <div
                                            key={index}
                                            className="grafana-bar-chart-panel__chart-visual__bar"
                                            style={{
                                                backgroundColor: `rgba(${data.legend.color}, 0.8)`,
                                                border: `1px solid rgb(${data.legend.color})`,
                                                width: `${76 / data.bars.length}%`,
                                                height: `${(bar.value - data.scaleMin) / (data.scaleMax - data.scaleMin) * 100}%`
                                            }}
                                        />
                                    )
                                }
                            </div>
                            <div className="grafana-bar-chart-panel__chart-visual__bar-hover-wrapper">
                                {
                                    data.bars.map((bar, index) =>
                                        <div
                                            key={index}
                                            className="grafana-bar-chart-panel__chart-visual__bar-hover"
                                            style={{
                                                width: `${76 / data.bars.length}%`,
                                                height: `${(bar.value - data.scaleMin) / (data.scaleMax - data.scaleMin) * 100}%`
                                            }}
                                        />
                                    )
                                }
                            </div>
                        </div>
                        <div className="grafana-bar-chart-panel__chart-x-axis">
                            {
                                data.bars.map((bar, index) =>
                                    <p
                                        key={index}
                                        className="grafana-bar-chart-panel__chart-x-axis__label"
                                        style={{
                                            width: `${76 / data.bars.length}%`
                                        }}
                                    >
                                        {bar.label}
                                    </p>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="grafana-bar-chart-panel__legend">
                    <div
                        className="grafana-bar-chart-panel__legend-color"
                        style={{backgroundColor: `rgb(${data.legend.color})`}}
                    />
                    <p className="grafana-bar-chart-panel__legend-text">
                        {data.legend.name}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default BarChartPanel;