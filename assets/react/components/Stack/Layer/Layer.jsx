import React from "react";
import "../Stack.css";
import ImageLayer from "./ImageLayer";
import SingleColorLayer from "./SingleColorLayer";
import VideoLayer from "./VideoLayer";

function Layer(
    {
        type,
        zIndex,
        src = '',
        alt = '',
        color = 'black',
        opacity = '1',
        videoType = 'video/mp4',
    }
)
{
    const variants = {
        image: <ImageLayer src={src} alt={alt} zIndex={zIndex} />,
        singleColor: <SingleColorLayer color={color} opacity={opacity} zIndex={zIndex} />,
        video: <VideoLayer src={src} videoType={videoType} zIndex={zIndex} />,
    };

    return variants[type]
}

export default Layer;