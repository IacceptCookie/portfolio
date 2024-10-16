import React from "react";
import Stack from "../components/Stack/Stack";
import Layer from "../components/Stack/Layer/Layer";
import topImage from "../../img/background.jpg";

function Home() {
    return (
        <>
            <Stack aspectRatio="16/9" width="100%" maxHeight="100vh">
                <Layer type="video" src="https://videos.pexels.com/video-files/2715412/2715412-uhd_3840_2160_30fps.mp4" zIndex={1} />
            </Stack>
            <h1>hello react</h1>
        </>
    );
}

export default Home;
