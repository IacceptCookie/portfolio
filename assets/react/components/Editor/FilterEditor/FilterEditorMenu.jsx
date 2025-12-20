import React, {useEffect, useState} from "react";

function FilterEditorMenu (
    {
        filter,
        setFilter,
        updating = true
    }
)
{
    const [label, setLabel] = useState("");
    const [color, setColor] = useState("");
    const [type, setType] = useState("");

    useEffect(() => {
        if (!filter) return;

        setLabel(filter.label || "");
        setType(filter.type || "");
        setColor(filter.color || "");
    }, [filter?.id]);

    useEffect(() => {
        console.log("maj filter");
        setFilter(prev => {
            const updated = {
                ...prev,
                label,
                type,
                color
            };

            if (JSON.stringify(prev) !== JSON.stringify(updated)) {
                return updated;
            }
            return prev;
        });
    }, [label, type, color]);

    return (
        <div className="filter-editor-menu" style={{
            backgroundColor: `#${color}`,
            boxShadow: `2px 2px 3px color-mix(in srgb, #${color}, white 50%)`
        }}>
            <select
                className="filter-editor-input-type"
                required
                value={filter.type || "tag"}
                onChange={(e) => {
                    setType(e.target.value);
                }}
                disabled={updating}
            >
                <option key={1} defaultValue value="tag">Tag</option>
                <option key={2} value="category">Category</option>
            </select>
            <input
                type="text"
                name="label"
                placeholder="Label"
                className="filter-editor-input-label"
                required
                value={label}
                onChange={(e) => setLabel(e.target.value)}
            />
            <input
                type="text"
                name="color"
                placeholder="Color"
                className="filter-editor-input-color"
                required
                style={{visibility: type === "tag" ? "visible" : "hidden"}}
                value={color}
                onChange={(e) => setColor(e.target.value)}
            />
        </div>
    );
}

export default FilterEditorMenu;