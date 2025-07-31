import React from "react";

function Video({ src, legend }) {
    const isValidYouTubeUrl = (url) => {
        try {
            const parsedUrl = new URL(url);
            const host = parsedUrl.hostname;
            const isYouTubeHost =
                host === "www.youtube.com" || host === "youtube.com" || host === "youtu.be";

            const isWatch = parsedUrl.pathname === "/watch" && parsedUrl.searchParams.has("v");
            const isShort = host === "youtu.be" && parsedUrl.pathname.length > 1;
            const isEmbed = parsedUrl.pathname.startsWith("/embed/") &&
                parsedUrl.pathname.split("/")[2]?.length > 0;

            return isYouTubeHost && (isWatch || isShort || isEmbed);
        } catch (e) {
            return false;
        }
    }

    if (!isValidYouTubeUrl(src)) {
        return null;
    }

    return (
        <div className="element-video-wrapper">
            <iframe
                className="element-video"
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