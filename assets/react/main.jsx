import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import AuthProvider from "./providers/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <App />
    </AuthProvider>
);
