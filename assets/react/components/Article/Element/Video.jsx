import React from "react";

function Video(
    {
        src,
        legend,
    }
) {
    return (
        <div className="element-video-wrapper">
            <iframe className="element-video"
                    src={src}
                    frameBorder="0"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
            />
            <p className="element-video-legend">{legend}</p>
        </div>
    );
}

export default Video;