import React from "react";
import Paragraph from "./Paragraph";
import Picture from "./Picture";
import Quote from "./Quote";
import Title from "./Title";
import Video from "./Video";
import Link from "./Link";
import PicturePreview from "./PicturePreview";

function Element(
    {
        isPreview = false,
        type,
        text = "",
        imageSrc = "",
        href = "",
        image = "",
    }
)
{
    let variants = {
        paragraph: <Paragraph text={text} />,
        picture: <Picture src={imageSrc} legend={text} />,
        quote: <Quote text={text} />,
        title: <Title text={text} />,
        video: <Video src={href} legend={text} />,
        link: <Link text={text} href={href} />,
    };

    if (isPreview) {
        variants = {
            paragraph: <Paragraph text={text} />,
            picture: <PicturePreview src={image} legend={text} />,
            quote: <Quote text={text} />,
            title: <Title text={text} />,
            video: <Video src={href} legend={text} />,
            link: <Link text={text} href={href} />,
        };
    }

    return variants[type]
}

export default Element;