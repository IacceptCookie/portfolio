import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faChevronUp, faXmark} from "@fortawesome/free-solid-svg-icons";

function ElementEditorButtonArea (
    {
        order,
        changeOrderUp,
        changeOrderDown,
        deleteElement,
    }
)
{
    return (
        <div className="element-editor-button-area">
            <button className="element-up-button" type="button" onClick={() => {changeOrderUp(order)}}>
                <FontAwesomeIcon icon={faChevronUp} />
            </button>
            <button className="element-down-button" type="button" onClick={() => {changeOrderDown(order)}}>
                <FontAwesomeIcon icon={faChevronDown} />
            </button>
            <button className="element-delete-button" type="button" onClick={() => {deleteElement(order)}}>
                <FontAwesomeIcon icon={faXmark} />
            </button>
        </div>
    );
}

export default ElementEditorButtonArea;