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
        paragraph: <Paragraph />,
        picture: <Picture />,
        quote: <Quote />,
        title: <Title />,
        video: <Video />,
        link: <Link />,
    };

    return variants[type]
}

export default Element;