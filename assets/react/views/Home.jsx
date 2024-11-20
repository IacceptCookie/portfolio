import React from "react";
import Stack from "../components/Stack/Stack";
import Layer from "../components/Stack/Layer/Layer";
import backgroundVideo from "../../video/back.webm";
import AnimatedText from "../components/AnimatedText";
import "./Home.css";

function Home() {
    return (
        <>
            <Stack aspectRatio="16/9" width="100%" maxHeight="100vh" className="presentation-visual-area">
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
            </Stack>
            <AnimatedText
                className="presentation-text-area"
                text="
                Bienvenue sur mon site internet, ceci est le premier texte, il est donc le premier à bénéficier
                du dynamisme de React !"
                speed={10}
            />
        </>
    );
}

export default Home;
