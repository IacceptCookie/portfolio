import React, {useEffect, useState} from 'react';
import "./ArticleEditor.css";
import ElementEditorMenu from "./ElementEditor/ElementEditorMenu";
import ArticleEditorMenu from "./ArticleEditorMenu";
import {useArticlePreview} from "../../../providers/ArticlePreviewProvider";
import {useLocation} from "wouter";

function ArticleEditor(
    {
        updateArticle = {
            title: "",
            description: "",
            category: "article",
            visibility: "private",
            tags: [],
            thumbnail: "",
            elements: [],
        }
    }
)
{
    const [article, setArticle] = useState(updateArticle);
    const {contextArticle, setContextArticle} = useArticlePreview();
    const [_, navigate] = useLocation();

    useEffect(() => {
        if (contextArticle) {
            setArticle(contextArticle);
        }
    }, [contextArticle]);

    useEffect(() => {
        const saved = sessionStorage.getItem("article");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setArticle(parsed);
            } catch (e) {
                console.error("Erreur parsing articlePreview :", e);
            }
        }
    }, []);

    useEffect(() => {
        sessionStorage.setItem("article", JSON.stringify(article));
    }, [article]);

    const deleteArticle = () => {
        sessionStorage.removeItem("article");
        setContextArticle(null);
        if (
            updateArticle !== {
                title: "",
                description: "",
                category: "article",
                visibility: "private",
                tags: [],
                thumbnail: "",
                elements: [],
            }
        ) {
        }
        navigate("/dashboard");
    }

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
                <button className="article-save-button">
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