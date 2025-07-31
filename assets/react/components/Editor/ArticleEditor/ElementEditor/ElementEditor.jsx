import React from "react";
import ParagraphEditor from "./ParagraphEditor";
import PictureEditor from "./PictureEditor";
import QuoteEditor from "./QuoteEditor";
import TitleEditor from "./TitleEditor";
import VideoEditor from "./VideoEditor";
import LinkEditor from "./LinkEditor";

function ElementEditor(
    {
        order,
        type,
        updateType,
        text,
        updateText,
        href,
        updateHref,
        image,
        updateImage,
        changeOrderUp,
        changeOrderDown,
        deleteElement
    }
)
{
    const variants = {
        paragraph:
            <ParagraphEditor
                order={order}
                type={type}
                updateType={updateType}
                changeOrderUp={changeOrderUp}
                changeOrderDown={changeOrderDown}
                deleteElement={deleteElement}
                text={text}
                updateText={updateText}
            />,
        picture:
            <PictureEditor
                order={order}
                type={type}
                updateType={updateType}
                changeOrderUp={changeOrderUp}
                changeOrderDown={changeOrderDown}
                deleteElement={deleteElement}
                text={text}
                updateText={updateText}
                image={image}
                updateImage={updateImage}
            />,
        quote:
            <QuoteEditor
                order={order}
                type={type}
                updateType={updateType}
                changeOrderUp={changeOrderUp}
                changeOrderDown={changeOrderDown}
                deleteElement={deleteElement}
                text={text}
                updateText={updateText}
            />,
        title:
            <TitleEditor
                order={order}
                type={type}
                updateType={updateType}
                changeOrderUp={changeOrderUp}
                changeOrderDown={changeOrderDown}
                deleteElement={deleteElement}
                text={text}
                updateText={updateText}
            />,
        video:
            <VideoEditor
                order={order}
                type={type}
                updateType={updateType}
                changeOrderUp={changeOrderUp}
                changeOrderDown={changeOrderDown}
                deleteElement={deleteElement}
                text={text}
                updateText={updateText}
                href={href}
                updateHref={updateHref}
            />,
        link:
            <LinkEditor
                order={order}
                type={type}
                updateType={updateType}
                changeOrderUp={changeOrderUp}
                changeOrderDown={changeOrderDown}
                deleteElement={deleteElement}
                text={text}
                updateText={updateText}
                href={href}
                updateHref={updateHref}
            />,
    };

    return variants[type]
}

export default ElementEditor;