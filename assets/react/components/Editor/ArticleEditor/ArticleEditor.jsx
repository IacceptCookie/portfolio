import React, {useEffect, useState, useRef, useCallback} from 'react';
import "./ArticleEditor.css";
import ElementEditorMenu from "./ElementEditor/ElementEditorMenu";
import ArticleEditorMenu from "./ArticleEditorMenu";
import {useArticlePreview} from "../../../providers/ArticlePreviewProvider";
import {useLocation} from "wouter";
import { useArticleSave } from "../../../hooks/useArticleSave";
import { useNotification } from "../../../providers/NotificationProvider";

const defaultArticle = {
    id: undefined,
    title: "",
    description: "",
    categories: [],
    visibility: "private",
    tags: [],
    thumbnail: "",
    elements: [],
}

function ArticleEditor(
    {
        updateArticle = defaultArticle,
    }
)
{
    const {contextArticle, setContextArticle, isLoading} = useArticlePreview();
    const [_, navigate] = useLocation();
    const { createArticle, updateArticle: updateArticleRequest, deleteArticle: deleteArticleRequest } = useArticleSave();
    const { notify } = useNotification();
    const isUpdateMode = updateArticle !== defaultArticle;
    const hasInitialized = useRef(false);

    // Initialize article state
    const [article, setArticleState] = useState(updateArticle);

    // Update article AND sync to IndexedDB in one operation
    const setArticle = useCallback((updater) => {
        setArticleState(prev => {
            const newArticle = typeof updater === 'function' ? updater(prev) : updater;
            // Sync to IndexedDB immediately with the new value
            setContextArticle(newArticle);
            return newArticle;
        });
    }, [setContextArticle]);

    // When contextArticle is loaded from IndexedDB, use it if it matches
    useEffect(() => {
        if (isLoading) return;

        if (!hasInitialized.current) {
            if (contextArticle && contextArticle.id === updateArticle.id) {
                setArticleState(contextArticle);
            }
            hasInitialized.current = true;
        }
    }, [isLoading, contextArticle, updateArticle.id]);

    const saveArticle = async (event) => {
        event.preventDefault();

        let result;
        if (isUpdateMode) {
            result = await updateArticleRequest(article, updateArticle);
        } else {
            result = await createArticle(article);
        }

        if (result.success) {
            notify.success(isUpdateMode ? "Article updated successfully" : "Article created successfully");
            setContextArticle(null); // Clears both context and sessionStorage
            navigate("/dashboard");
        } else {
            notify.error(result.error);
        }
    };

    const deleteArticle = async () => {
        if (!isUpdateMode) {
            // No article to delete in create mode
            setContextArticle(null); // Clears both context and sessionStorage
            navigate("/dashboard");
            return;
        }

        const result = await deleteArticleRequest(article.id);

        if (result.success) {
            notify.success("Article deleted successfully");
            setContextArticle(null); // Clears both context and sessionStorage
            navigate("/dashboard");
        } else {
            notify.error(result.error);
        }
    };

    return (
        <form className="article-editor">
            <ArticleEditorMenu
                article={article}
                setArticle={setArticle}
            />
            <ElementEditorMenu
                article={article}
                setArticle={setArticle}
            />
            <div className="article-editor-buttons">
                <button className="article-save-button" type="submit" onClick={saveArticle}>
                    Enregistrer
                </button>
                <button className="article-delete-button" type="button" onClick={deleteArticle}>
                    Supprimer
                </button>
            </div>
        </form>
    );
}

export default ArticleEditor;