import React from "react";
import Stack from "../../components/Stack/Stack";
import Layer from "../../components/Stack/Layer/Layer";
import backgroundVideo from "../../../video/back.webm";

function Articles() {
    return (
        <>
            <Stack aspectRatio="16/9" width="100%" maxHeight="60vh">
                <Layer
                    type="video"
                    src={backgroundVideo}
                    zIndex={1}
                />
                <Layer
                    type="linearGradient"
                    linearGradient="linear-gradient(360deg, rgba(8,9,87,1) 0%, rgba(255,255,255,0) 70%)"
                    zIndex={2}
                />
            </Stack>
            <h1>let's go</h1>
        </>
    );
}

export default Articles;