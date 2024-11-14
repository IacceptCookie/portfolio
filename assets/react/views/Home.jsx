import React from "react";
import Stack from "../components/Stack/Stack";
import Layer from "../components/Stack/Layer/Layer";
import backgroundVideo from "../../video/back.webm";

function Home() {
    return (
        <>
            <Stack aspectRatio="16/9" width="100%" maxHeight="100vh">
                <Layer
                    type="video"
                    src={backgroundVideo}
                    zIndex={1}
                />
                <Layer
                    type="linearGradient"
                    linearGradient="linear-gradient(360deg, rgba(12,28,60,1) 0%, rgba(255,255,255,0) 70%)"
                    zIndex={2}
                />
                <Layer type="centeredText" text="This is centered" zIndex={3} />
            </Stack>
            <h1>hello react</h1>
        </>
    );
}

export default Home;
