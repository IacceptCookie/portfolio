import { createContext, useContext, useState, useCallback, useEffect } from "react";

const ArticlePreviewContext = createContext(null);

const STORAGE_KEY = "article";

/**
 * ArticlePreviewProvider
 * Manages article preview state by synchronizing with sessionStorage
 * This ensures a single source of truth for the article being edited/previewed
 */
function ArticlePreviewProvider({ children }) {
    const [contextArticle, setContextArticleState] = useState(() => {
        try {
            const saved = sessionStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (e) {
            console.error("Error parsing article from sessionStorage:", e);
            return null;
        }
    });

    // Wrapper that also updates sessionStorage
    const setContextArticle = useCallback((article) => {
        if (article === null) {
            sessionStorage.removeItem(STORAGE_KEY);
            setContextArticleState(null);
        } else {
            sessionStorage.setItem(STORAGE_KEY, JSON.stringify(article));
            setContextArticleState(article);
        }
    }, []);

    // Listen for storage events from other tabs/windows
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === STORAGE_KEY) {
                try {
                    const newValue = e.newValue ? JSON.parse(e.newValue) : null;
                    setContextArticleState(newValue);
                } catch (err) {
                    console.error("Error parsing storage event:", err);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <ArticlePreviewContext.Provider value={{ contextArticle, setContextArticle }}>
            {children}
        </ArticlePreviewContext.Provider>
    );
}


export default ArticlePreviewProvider;
export const useArticlePreview = () => useContext(ArticlePreviewContext);