import React, {useEffect, useState} from 'react';
import "./ArticleEditor.css";
import ElementEditorMenu from "./ElementEditor/ElementEditorMenu";
import ArticleEditorMenu from "./ArticleEditorMenu";
import {useArticlePreview} from "../../../providers/ArticlePreviewProvider";
import {useLocation} from "wouter";
import {dataURLtoFile} from "../../../services/remaper";
import {getArticleBySlug} from "../../../services/api/Articles";

const defaultArticle = {
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
        console.log(article);
    }, [article]);

    const saveArticle = async (event) => {
        event.preventDefault();

        // check title
        if (article.title === '') {
            alert("Title is empty");
            return
        }

        if ((await getArticleBySlug(
                article.title.toString()
                    .trim()
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '')
            )).ok
        ) {
            alert("Title slug is already used");
            return
        }

        // check categories
        if (!article.categories || article.categories.length === 0) {
            alert("Missing a category");
            return
        }

        if (
            updateArticle !== defaultArticle
        ) {
            console.log("updating");
            // sauvegarde de l'article à rajouter ici (update)
        } else {
            console.log("creating");
            // sauvegarde de l'article à rajouter ici (création)
            let thumbnailPath = "";
            if (article.thumbnail !== "") {
                const formData = new FormData();
                formData.append("file", dataURLtoFile(article.thumbnail));
                // get thumbnail path after it has been uploaded
                const response = await fetch("/api/images/upload", {
                    method: "POST",
                    headers: {
                        "X-CSRF-TOKEN": sessionStorage.getItem("csrf_token"),
                        "accept": "application/json",
                    },
                    body: formData,
                })
                .catch(() => console.log(`fail on getting image with ${article.thumbnail}`))
                .then(response => response.json())
                .then(data => {
                    thumbnailPath += data['path'];
                });
            }

            article.elements.map(
                async (element) => {
                    if (element.image !== "") {
                        const formData = new FormData();
                        formData.append("file", dataURLtoFile(element.image));
                        const response = await fetch("/api/images/upload", {
                            method: "POST",
                            headers: {
                                "X-CSRF-TOKEN": sessionStorage.getItem("csrf_token"),
                                "accept": "application/json",
                            },
                            body: formData,
                        })
                        .catch(() => console.log(`fail on getting image with ${element.image}`))
                        .then(response => response.json())
                        .then(data =>
                            element.imagePath = data['path']
                        )
                    }
                }
            )

            const payload = {
                articleTitle: article.title,
                articleDescription: article.description,
                readingTime: 0,
                categories: article.categories.map((category) =>
                    `/api/categories/${category.id}`
                ),
                tags: article.tags.map((tag) =>
                    `/api/tags/${tag.id}`
                ),
                elements: article.elements.map((element) => ({
                    elementText: element.text,
                    elementComponentName: element.type,
                    elementNumber: element.order,
                    image: {
                        imagePath: element.imagePath ?? '',
                    },
                    elementHref: element.href,
                })),
                illustration: {
                    imagePath: thumbnailPath ?? '',
                },
                isPublic: article.visibility === "public",
            };

            console.log(payload);
            const response = await fetch("/api/articles", {
                method: "POST",
                headers: {
                    "X-CSRF-TOKEN": sessionStorage.getItem("csrf_token"),
                    "accept": "application/ld+json",
                    "Content-Type": "application/ld+json",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                alert("error while sending changes");
                return
            }

            console.log(response.json());
        }
        sessionStorage.removeItem("article");
        setContextArticle(null);
        navigate("/dashboard");
    }

    const deleteArticle = () => {
        if (
            updateArticle !== defaultArticle
        ) {
            // suppression de l'article si c'est une mise à jour
        }

        sessionStorage.removeItem("article");
        setContextArticle(null);
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