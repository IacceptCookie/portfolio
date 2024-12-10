import React from "react";
import Stack from "../components/Stack/Stack";
import Layer from "../components/Stack/Layer/Layer";
import "./Login.css";
import backgroundVideo from "../../video/back.webm";
import AnimatedText from "../components/AnimatedText";

function Login() {
    return (
        <div className="login-view">
            <Stack aspectRatio="16/9" width="100%" maxHeight="25vh">
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
            <div className="login-container">
                <form className="login-form">
                    <h1>Connexion</h1>
                    <input type="text" name="email" placeholder="Adresse email" id="email"/>
                    <input type="password" name="password" placeholder="Mot de passe" id="password"/>
                    <input type="submit" value="Envoyer" id="submit" />
                </form>
                <AnimatedText
                    className="disclaimer-text"
                    text="Cette page est réservée à l'authentification des éditeurs. Si vous êtes un simple visiteur,
                    je vous recommande d'allez jeter un coup d'oeil à mes travaux."
                    speed={10}
                />
            </div>
        </div>
    );
}

export default Login;