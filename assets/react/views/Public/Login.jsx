import React, {useEffect, useState} from "react";
import { useLocation } from "wouter";
import "./Login.css";
import AnimatedText from "../../components/Text/AnimatedText";
import EditorHeader from "../../components/Editor/EditorHeader/EditorHeader";

function Login() {
    const [, setLocation] = useLocation();
    const [error, setError] = useState("");
    const [, navigate] = useLocation();

    const params = new URLSearchParams(window.location.search);
    const redirectParam = decodeURI(params.get("redirect"));
    const redirectTo = redirectParam !== 'null' ? `?redirect=${redirectParam}` : '';

    useEffect(() => {
        const isWaitingFor2FA = sessionStorage.getItem("isWaitingFor2FA");
        if (isWaitingFor2FA === "true") {
            navigate(`/login/2fa${redirectTo}`);
        }
    }, [navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");

        const login = event.target.login.value;
        const password = event.target.password.value;

        try {
            const response = await fetch("/authentication/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ login, password }),
            });

            if (!response.ok) {
                throw new Error("Échec de l'authentification");
            }

            sessionStorage.setItem("isWaitingFor2FA", "true");
            setLocation(`/login/2fa${redirectTo}`);
        } catch (error) {
            setError("Identifiant ou mot de passe incorrect");
        }
    };

    return (
        <div className="login-view">
            <EditorHeader />
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Connexion</h1>
                    {error && <p className="error-message">{error}</p>}
                    <input type="text" name="login" placeholder="Identifiant" id="login" className={error === "" ? "normal" : "error"} required />
                    <input type="password" name="password" placeholder="Mot de passe" id="password" className={error === "" ? "normal" : "error"} required />
                    <input type="submit" value="Envoyer" id="submit" />
                </form>
                <AnimatedText
                    className="disclaimer-text"
                    text="Cette page est réservée à l'authentification des éditeurs. Si vous êtes un simple visiteur,
je vous recommande d'aller jeter un coup d'œil à mes travaux."
                    speed={10}
                />
            </div>
        </div>
    );
}

export default Login;
