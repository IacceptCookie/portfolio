import React from "react";
import ElementEditorButtonArea from "./ElementEditorButtonArea";
import {useElementTypes} from "../../../../providers/ElementTypesProvider";

function TitleEditor(
    {
        order,
        type,
        updateType,
        changeOrderUp,
        changeOrderDown,
        deleteElement,
        text = "",
        updateText,
    }
)
{
    const types = useElementTypes();

    return (
        <div className="element">
            <div className="element-main-editor-area">
                <select
                    className="element-type-selector"
                    required
                    onChange={(input) => {updateType(order, input.target.value)}}
                    value={type}
                >
                    {types
                        .map(type => (
                            <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))
                    }
                </select>
                <textarea
                    className="element-text"
                    rows={5}
                    placeholder="Saisir le texte du titre"
                    required
                    value={text}
                    onChange={(input) => updateText(order, input.target.value)}
                />
            </div>
            <div className="element-side-editor-area">
                <ElementEditorButtonArea
                    order={order}
                    changeOrderUp={changeOrderUp}
                    changeOrderDown={changeOrderDown}
                    deleteElement={deleteElement}
                />
            </div>
        </div>
    );
}

export default TitleEditor;