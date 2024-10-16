import React from "react";

function VideoLayer({src, videoType, zIndex}) {
    return (
        <video style={{zIndex: zIndex}} className="layer layer__video" autoPlay={true} muted={true} loop={true}>
            <source src={src} type={videoType} />
        </video>
    )
}

export default VideoLayer;