import React from "react";
import Paragraph from "./Paragraph";
import Picture from "./Picture";
import Quote from "./Quote";
import Title from "./Title";
import Video from "./Video";
import Link from "./Link";

function Element(
    {
        type,
        text = "",
        imageSrc = "",
        href = "",
    }
)
{
    const variants = {
        paragraph: <Paragraph text={text} />,
        picture: <Picture src={imageSrc} legend={text} />,
        quote: <Quote text={text} />,
        title: <Title text={text} />,
        video: <Video src={href} legend={text} />,
        link: <Link text={text} href={href} />,
    };

    return variants[type]
}

export default Element;