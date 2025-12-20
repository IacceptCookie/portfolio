import React, { useState, useRef, useEffect } from "react";
import "./TwoFactorCheck.css";
import AnimatedText from "../../components/Text/AnimatedText";
import { useLocation } from "wouter";
import EditorHeader from "../../components/Editor/EditorHeader/EditorHeader";

function TwoFactorCheck() {
    const [code, setCode] = useState(["", "", "", "", "", ""]);
    const [regenerateButtonText, setRegenerateButtonText] = useState("Renvoyer un code");
    const [errorMessage, setErrorMessage] = useState("");
    const inputsRef = useRef([]);
    const [, navigate] = useLocation();

    const params = new URLSearchParams(window.location.search);
    const redirectParam = decodeURI(params.get("redirect"));
    const redirectTo = redirectParam !== "null" ? `?redirect=${redirectParam}` : '';

    useEffect(() => {
        const isWaitingFor2FA = sessionStorage.getItem("isWaitingFor2FA");
        if (isWaitingFor2FA !== "true") {
            navigate(`/login${redirectTo}`);
        }
    }, [navigate]);

    const handleChange = (index, event) => {
        const value = event.target.value.replace(/\D/g, "");
        if (value.length > 1) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < 5) {
            inputsRef.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, event) => {
        if (event.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1].focus();
        }
    };

    const handlePaste = (event) => {
        const pasteData = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6).split("");
        if (pasteData.length === 6) {
            setCode(pasteData);
            pasteData.forEach((char, i) => {
                if (inputsRef.current[i]) {
                    inputsRef.current[i].value = char;
                }
            });
            inputsRef.current[5].focus();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("/authentication/2fa", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ code: code.join("") })
        })
            .then(response => response.json().then(data => ({ status: response.status, body: data })))
            .then(({ status, body }) => {
                if (status === 200) {
                    sessionStorage.setItem("isWaitingFor2FA", "false");
                    sessionStorage.setItem("csrf_token", body.csrf_token.value);
                    navigate(redirectParam !== 'null' ? redirectParam : '/dashboard');
                } else if (body.message.startsWith("User not found") || body.message.startsWith("Expired code")) {
                    sessionStorage.setItem("isWaitingFor2FA", "false");
                    navigate(`/login${redirectTo}`);
                } else if (body.message.startsWith("Invalid code")) {
                    setErrorMessage("Le code est incorrect");
                }
            })
            .catch(() => navigate(`/login${redirectTo}`));
    };

    return (
        <div className="login-view">
            <EditorHeader />
            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Vérification 2FA</h1>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <div className="code-inputs" onPaste={handlePaste}>
                        {code.map((value, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength="1"
                                value={value}
                                onChange={(event) => handleChange(index, event)}
                                onKeyDown={(event) => handleKeyDown(index, event)}
                                ref={(el) => (inputsRef.current[index] = el)}
                                required
                                className={errorMessage === "" ? "normal code-input" : "error code-input"}
                            />
                        ))}
                    </div>
                    <button
                        id="regenerate"
                        type="button"
                        onClick={() =>
                            fetch("/authentication/2fa/regenerate", { method: "GET" })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error("Redirection vers Login");
                                    } else {
                                        setRegenerateButtonText("Un nouveau code a été envoyé !");
                                        setTimeout(() => setRegenerateButtonText("Renvoyer un code"), 3000);
                                    }
                                })
                                .catch(() => navigate("/login"))
                        }
                    >
                        {regenerateButtonText}
                    </button>
                    <input type="submit" value="Vérifier" id="submit" disabled={code.some(digit => digit === "")} />
                </form>
                <AnimatedText
                    className="disclaimer-text"
                    text="Le code est envoyé à l'adresse mail associée à votre compte. Ce code est valable 5 minutes."
                    speed={10}
                />
            </div>
        </div>
    );
}

export default TwoFactorCheck;
