import React, {useState} from "react";
import "./ElementEditor.css";
import ElementEditor from "./ElementEditor";

function ElementEditorMenu(
    {
        article,
        setArticle
    }
)
{
    const defaultElement = {
        type: "paragraph",
        text: "",
        href: "",
        image: "",
    };

    const updateElement = (order, updates) => {
        setArticle((prev) => {
            const updatedElements = prev.elements.map((el, index) =>
                index === order ? { ...el, ...updates } : el
            );
            return { ...prev, elements: updatedElements };
        });
    };

    const updateText = (order, value) => {
        updateElement(order, { text: value });
    };

    const updateHref = (order, value) => {
        updateElement(order, { href: value });
    };

    const updateImage = (order, value) => {
        updateElement(order, { image: value });
    };

    const updateType = (order, value) => {
        updateElement(order, { type: value });
    };

    const deleteElement = (order) => {
        setArticle((prev) => {
            const updatedElements = [...prev.elements];
            updatedElements.splice(order, 1);
            const reindexed = updatedElements.map((el, index) => ({
                ...el,
                order: index,
            }));
            return { ...prev, elements: reindexed };
        });
    };

    const changeOrderUp = (order) => {
        if (order <= 0) return;

        setArticle((prev) => {
            const updatedElements = [...prev.elements];
            [updatedElements[order - 1], updatedElements[order]] = [
                updatedElements[order],
                updatedElements[order - 1],
            ];
            const reordered = updatedElements.map((el, index) => ({
                ...el,
                order: index,
            }));
            return { ...prev, elements: reordered };
        });
    };

    const changeOrderDown = (order) => {
        setArticle((prev) => {
            if (order >= prev.elements.length - 1) return prev;
            const updatedElements = [...prev.elements];
            [updatedElements[order + 1], updatedElements[order]] = [
                updatedElements[order],
                updatedElements[order + 1],
            ];
            const reordered = updatedElements.map((el, index) => ({
                ...el,
                order: index,
            }));
            return { ...prev, elements: reordered };
        });
    };

    const addElement = () => {
        setArticle((prev) => ({
            ...prev,
            elements: [
                ...prev.elements,
                {
                    order: prev.elements.length,
                    ...defaultElement,
                },
            ],
        }));
    };

    return (
        <div className="element-editor">
            <div className="element-editor-menu">
                <button
                    type="button"
                    className="element-editor-add-button"
                    onClick={addElement}
                >
                    Ajouter un élément
                </button>
                <p className="element-editor-counter">
                    {article.elements.length} éléments
                </p>
                <p className="element-editor-readingtime-estimation">
                    Temps de lecture : {article.elements.length * 1.5} min
                </p>
            </div>
            <div className="element-list">
                {article.elements.map((el, index) => (
                    <ElementEditor
                        key={index}
                        order={index}
                        type={el.type}
                        updateType={updateType}
                        text={el.text}
                        updateText={updateText}
                        href={el.href}
                        updateHref={updateHref}
                        image={el.image}
                        updateImage={updateImage}
                        changeOrderUp={changeOrderUp}
                        changeOrderDown={changeOrderDown}
                        deleteElement={deleteElement}
                    />
                ))}
            </div>
        </div>
    );
}

export default ElementEditorMenu;