import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import AuthProvider from "./providers/AuthProvider";
import ElementTypesProvider from "./providers/ElementTypesProvider";
import CategoriesProvider from "./providers/CategoriesProvider";
import ArticlePreviewProvider from "./providers/ArticlePreviewProvider";
import { NotificationProvider } from "./providers/NotificationProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
    <NotificationProvider>
        <AuthProvider>
            <CategoriesProvider>
                <ElementTypesProvider>
                    <ArticlePreviewProvider>
                        <App />
                    </ArticlePreviewProvider>
                </ElementTypesProvider>
            </CategoriesProvider>
        </AuthProvider>
    </NotificationProvider>
);
