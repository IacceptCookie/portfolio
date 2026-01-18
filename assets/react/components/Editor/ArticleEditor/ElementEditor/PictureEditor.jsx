import React from "react";
import imageCompression from 'browser-image-compression';
import ElementEditorButtonArea from "./ElementEditorButtonArea";
import {useElementTypes} from "../../../../providers/ElementTypesProvider";

function PictureEditor(
    {
        order,
        type,
        updateType,
        changeOrderUp,
        changeOrderDown,
        deleteElement,
        text = "",
        updateText,
        image= "",
        updateImage
    }
)
{
    const types = useElementTypes();

    const handleElementImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const options = {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                    fileType: 'image/webp',
                    initialQuality: 0.85
                };

                const compressedFile = await imageCompression(file, options);

                const reader = new FileReader();
                reader.onload = () => {
                    updateImage(order, reader.result);
                };
                reader.readAsDataURL(compressedFile);
            } catch (error) {
                updateImage(order, "");
            }
        } else {
            updateImage(order, "");
        }
    };

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
                    placeholder="Saisir la légende de l'image"
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
                <label className="element-image-displayer">
                    <img className="element-image" src={image} alt="Choisir une image" />
                    <input
                        className="element-image-selector"
                        type="file"
                        name="element-image"
                        accept=".jpg, .jpeg, .png, .webp"
                        onChange={handleElementImageChange}
                    />
                </label>
            </div>
        </div>
    );
}

export default PictureEditor;