import React from "react";
import "./Grafana.css";

const coloredBackground = {
    green: 'linear-gradient(120deg, rgb(77, 172, 73), rgb(115, 191, 105))',
    blue: 'linear-gradient(120deg, rgb(24, 64, 152), rgb(31, 96, 196))',
    red: 'linear-gradient(120deg, rgb(239, 25, 32), rgb(242, 73, 92))'
};

function TablePanel(
    {
        data
    }
) {
    const columnsWidth = data.header.map(h => h.width);

    return (
        <div className="grafana-table-panel" style={{maxWidth: data.maxPanelWidth, maxHeight: data.maxPanelHeight}}>
            <div className="grafana-table-panel-content">
                <div className="grafana-table-panel__header">
                    {data.header.map((header, i) => (
                        <div
                            key={i}
                            className="grafana-table-panel__header-cell"
                            style={{ width: columnsWidth[i] }}
                        >
                            <span>{header.name}</span>
                        </div>
                    ))}
                </div>

                {data.rows.map((row, rIndex) => (
                    <div key={rIndex} className="grafana-table-panel__row">
                        {row.map((cell, cIndex) => {
                            const isLast = cIndex === row.length - 1
                            const bg =
                                cell.background && coloredBackground[cell.background]
                                    ? coloredBackground[cell.background]
                                    : 'transparent'

                            const cellStyle = {
                                width: columnsWidth[cIndex],
                                color: cell.background ? 'rgb(247, 248, 250)' : '#CCCCDCFF',
                                background: bg,
                                borderRight: isLast ? 'none' : '1px solid #2e3036'
                            }

                            return (
                                <div
                                    key={cIndex}
                                    className="grafana-table-panel__row-cell"
                                    style={cellStyle}
                                >
                                    <span>{cell.value}</span>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TablePanel;