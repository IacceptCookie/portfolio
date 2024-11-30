import React from "react";
import "../Stack.css";
import ImageLayer from "./ImageLayer";
import SingleColorLayer from "./SingleColorLayer";
import VideoLayer from "./VideoLayer";
import LinearGradientLayer from "./LinearGradientLayer";
import TextLayer from "./TextLayer";

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
        wrapperClassName = '',
        textClassName = '',
        objectPosition = 'top',
    }
)
{
    const variants = {
        image: <ImageLayer src={src} alt={alt} objectPosition={objectPosition} zIndex={zIndex} />,
        singleColor: <SingleColorLayer color={color} opacity={opacity} zIndex={zIndex} />,
        linearGradient: <LinearGradientLayer linearGradient={linearGradient} opacity={opacity} zIndex={zIndex} />,
        video: <VideoLayer src={src} videoType={videoType} objectPosition={objectPosition} zIndex={zIndex} />,
        text: <TextLayer text={text} zIndex={zIndex} wrapperClassName={wrapperClassName} textClassName={textClassName} />
    };

    return variants[type]
}

export default Layer;