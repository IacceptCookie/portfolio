import React from "react";

function VideoLayer({src, videoType, objectPosition, zIndex}) {
    return (
        <video style={{zIndex: zIndex, objectPosition: objectPosition}} className="layer layer__video" autoPlay={true} muted={true} loop={true}>
            <source src={src} type={videoType} />
        </video>
    )
}

export default VideoLayer;