import React, {useEffect, useState} from 'react';
import "./ArticleEditor.css";
import ElementEditorMenu from "./ElementEditor/ElementEditorMenu";
import ArticleEditorMenu from "./ArticleEditorMenu";
import {useArticlePreview} from "../../../providers/ArticlePreviewProvider";
import {useLocation} from "wouter";
import {dataURLtoFile} from "../../../tools/remaper";
import {getArticleBySlug} from "../../../services/api/Articles";

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

const filePathRegex = /^([a-z]:)?([\\/][a-z0-9\s_@\-^!#$%&+={}\[\]]+)+\.(?!jpg|jpeg|png|webp)[a-z0-9]+$/i;

function ArticleEditor(
    {
        updateArticle = defaultArticle,
    }
)
{
    const {contextArticle, setContextArticle} = useArticlePreview();
    const [_, navigate] = useLocation();
    const [article, setArticle] = useState(() => {
        const saved = sessionStorage.getItem("article");
        if (saved) {
            try {
                const article = JSON.parse(saved);
                if(article.id === updateArticle.id) {
                    return article;
                }
            } catch (e) {
                console.error("error while parsing articlePreview :", e);
            }
        }
        return updateArticle;
    });

    useEffect(() => {
        console.log("reading context article")
        if (contextArticle && JSON.stringify(contextArticle) !== JSON.stringify(article)) {
            console.log("update article using context")
            setArticle(contextArticle);
        }
    }, [contextArticle]);

    useEffect(() => {
        console.log("update session storage")
        const prev = sessionStorage.getItem("article");
        const next = JSON.stringify(article);
        if (prev !== next) {
            sessionStorage.setItem("article", next);
        }
    }, [article]);

    const saveArticle = async (event) => {
        event.preventDefault();

        // check title
        if (article.title === '') {
            alert("Title is empty");
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
            let thumbnailPath = "";
            if (article.thumbnail !== updateArticle.thumbnail && article.thumbnail !== "") {
                if (!filePathRegex.test(article.thumbnail)) {
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
                } else {
                    thumbnailPath += article.thumbnail;
                }
            }

            await Promise.all(
                article.elements.map(
                    async (element, index) => {
                        if (element.image !== updateArticle.elements[index].image && element.image !== "") {
                            if (!filePathRegex.test(element.image)) {
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
                                .then(data => {
                                        element.imagePath = data['path']
                                    }
                                )
                            } else {
                                element.imagePath = element.image;
                            }
                        }
                    }
                )
            );

            const payload = {
                articleTitle: article.title,
                articleDescription: article.description,
                readingTime: Math.round(article.elements.length * 1.5),
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

            const response = await fetch(`/api/articles/${article.id}`, {
                method: "PATCH",
                headers: {
                    "X-CSRF-TOKEN": sessionStorage.getItem("csrf_token"),
                    "accept": "application/ld+json",
                    "Content-Type": "application/merge-patch+json",
                },
                body: JSON.stringify(payload),
            });
            if (!response.ok) {
                alert("error while sending changes");
                return
            }
        } else {

            // check title is available
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

            let thumbnailPath = "";
            if (article.thumbnail !== "") {
                if (!filePathRegex.test(article.thumbnail)) {
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
                } else {
                    thumbnailPath += article.thumbnail;
                }
            }

            await Promise.all(
                article.elements.map(
                    async (element) => {
                        if (element.image !== "") {
                            if (!filePathRegex.test(element.image)) {
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
                                .then(data => {
                                        element.imagePath = data['path']
                                    }
                                )
                            } else {
                                element.imagePath = element.image;
                            }
                        }
                    }
                )
            );

            const payload = {
                articleTitle: article.title,
                articleDescription: article.description,
                readingTime: Math.round(article.elements.length * 1.5),
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
        }
        sessionStorage.removeItem("article");
        setContextArticle(null);
        navigate("/dashboard");
    }

    const deleteArticle = async () => {
        if (
            updateArticle !== defaultArticle
        ) {
            const response = await fetch(`/api/articles/${article.id}`, {
                method: "DELETE",
                headers: {
                    "X-CSRF-TOKEN": sessionStorage.getItem("csrf_token"),
                    "accept": "*/*",
                },
            });
            if (!response.ok) {
                alert("error while deleting");
                return
            }
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