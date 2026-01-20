import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";

const ArticlePreviewContext = createContext(null);

const DB_NAME = "ArticlePreviewDB";
const STORE_NAME = "articles";
const ARTICLE_KEY = "current";

/**
 * IndexedDB helper functions
 * Using IndexedDB instead of sessionStorage to handle large base64 images
 * sessionStorage is limited to ~5MB, IndexedDB can store hundreds of MB
 */
const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);

        request.onerror = () => reject(request.error);
        request.onsuccess = () => resolve(request.result);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME);
            }
        };
    });
};

const saveToIndexedDB = async (article) => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(article, ARTICLE_KEY);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);

            transaction.oncomplete = () => db.close();
        });
    } catch (e) {
        console.error("Error saving to IndexedDB:", e);
        return false;
    }
};

const loadFromIndexedDB = async () => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readonly");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(ARTICLE_KEY);

            request.onsuccess = () => resolve(request.result || null);
            request.onerror = () => reject(request.error);

            transaction.oncomplete = () => db.close();
        });
    } catch (e) {
        console.error("Error loading from IndexedDB:", e);
        return null;
    }
};

const deleteFromIndexedDB = async () => {
    try {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(STORE_NAME, "readwrite");
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(ARTICLE_KEY);

            request.onsuccess = () => resolve(true);
            request.onerror = () => reject(request.error);

            transaction.oncomplete = () => db.close();
        });
    } catch (e) {
        console.error("Error deleting from IndexedDB:", e);
        return false;
    }
};

/**
 * ArticlePreviewProvider
 * Manages article preview state by synchronizing with IndexedDB
 * This ensures a single source of truth for the article being edited/previewed
 * Uses IndexedDB instead of sessionStorage to handle large images (base64)
 */
function ArticlePreviewProvider({ children }) {
    const [contextArticle, setContextArticleState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const isInitialized = useRef(false);

    // Load from IndexedDB on mount
    useEffect(() => {
        const loadArticle = async () => {
            const saved = await loadFromIndexedDB();
            if (saved) {
                setContextArticleState(saved);
            }
            setIsLoading(false);
            isInitialized.current = true;
        };
        loadArticle();
    }, []);

    // Wrapper that also updates IndexedDB
    const setContextArticle = useCallback(async (article) => {
        if (article === null) {
            await deleteFromIndexedDB();
            setContextArticleState(null);
        } else {
            // Update state immediately for responsiveness
            setContextArticleState(article);
            // Then persist to IndexedDB (async)
            await saveToIndexedDB(article);
        }
    }, []);

    return (
        <ArticlePreviewContext.Provider value={{ contextArticle, setContextArticle, isLoading }}>
            {children}
        </ArticlePreviewContext.Provider>
    );
}

export default ArticlePreviewProvider;
export const useArticlePreview = () => useContext(ArticlePreviewContext);
