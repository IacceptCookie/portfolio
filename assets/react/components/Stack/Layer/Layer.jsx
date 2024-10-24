import React from "react";
import "../Stack.css";
import ImageLayer from "./ImageLayer";
import SingleColorLayer from "./SingleColorLayer";
import VideoLayer from "./VideoLayer";
import LinearGradientLayer from "./LinearGradientLayer";
import CenteredTextLayer from "./CenteredTextLayer";

function Layer(
    {
        type,
        zIndex,
        src = '',
        alt = '',
        color = 'black',
        linearGradient = '',
        opacity = '1',
        videoType = 'video/mp4',
        text = '',
        className = '',
    }
)
{
    const variants = {
        image: <ImageLayer src={src} alt={alt} zIndex={zIndex} />,
        singleColor: <SingleColorLayer color={color} opacity={opacity} zIndex={zIndex} />,
        linearGradient: <LinearGradientLayer linearGradient={linearGradient} opacity={opacity} zIndex={zIndex} />,
        video: <VideoLayer src={src} videoType={videoType} zIndex={zIndex} />,
        centeredText: <CenteredTextLayer text={text} zIndex={zIndex} className={className} />
    };

    return variants[type]
}

export default Layer;