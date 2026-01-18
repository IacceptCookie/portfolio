import React, {useEffect, useState} from "react";
import SearchBar from "../../Search/SearchBar";
import Tag from "../../Tag/Tag";
import {searchTags} from "../../../services/api/Tags";
import {useCategories} from "../../../providers/CategoriesProvider";
import {useArticlePreview} from "../../../providers/ArticlePreviewProvider";
import {useLocation} from "wouter";
import imageCompression from 'browser-image-compression';

function ArticleEditorMenu (
    {
        article,
        setArticle
    }
)
{
    const categoriesContext = useCategories();
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState([]);
    const [privacy, updatePrivacy] = useState("");
    const [thumbnailPreview, setThumbnailPreview] = useState("");
    const [searchText, updateSearchText] = useState("");
    const [thumbnailInputLabel, updateThumbnailInputLabel] = useState("Choisir une miniature");
    const { setContextArticle } = useArticlePreview();
    const [_, navigate] = useLocation();

    useEffect(() => {
        searchTags(searchText).then((response) => {
            setTags(response);
        });
    }, [searchText]);

    useEffect(() => {
        if (!article) return;
        setTitle(article.title || "");
        setDescription(article.description || "");
        setCategories(article.categories || []);
        setThumbnailPreview(article.thumbnail || "");
        setTags(article.tags || []);
        updatePrivacy(article.visibility || "private");
    }, [article?.id]);

    useEffect(() => {
        console.log("maj article", privacy);
        setArticle(prev => {
            const updated = {
                ...prev,
                title,
                description,
                thumbnail: thumbnailPreview,
                visibility: privacy,
                categories,
            };

            if (JSON.stringify(prev) !== JSON.stringify(updated)) {
                return updated;
            }
            return prev;
        });

        console.log("après coup : ", article.visibility);
    }, [title, description, thumbnailPreview, privacy, categories]);

    const previewArticle = () => {
        setContextArticle(article);
        navigate("/article/preview");
    };

    const handleThumbnailChange = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            updateThumbnailInputLabel("Modifier la miniature");

            try {
                const options = {
                    maxSizeMB: 0.5,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true,
                    fileType: 'image/webp',
                    initialQuality: 0.85
                };

                const compressedFile = await imageCompression(file, options);

                const thumbnailReader = new FileReader();
                thumbnailReader.onload = () => {
                    setThumbnailPreview(thumbnailReader.result);
                };
                thumbnailReader.readAsDataURL(compressedFile);

            } catch (error) {
                updateThumbnailInputLabel("Erreur lors du traitement");
            }
        } else {
            updateThumbnailInputLabel("Choisir une miniature");
            setThumbnailPreview("");
        }
    };

    const handleTag = (e, tag) => {
        const isChecked = e.target.checked;

        setArticle(prev => {
            const currentTags = prev.tags ?? [];
            const alreadyExists = currentTags.some(t => t.id === tag.id);
            let updatedTags;

            if (isChecked && !alreadyExists) {
                updatedTags = [...prev.tags, tag];
            } else if (!isChecked && alreadyExists) {
                updatedTags = prev.tags.filter(t => t.id !== tag.id);
            } else {
                updatedTags = prev.tags;
            }

            return { ...prev, tags: updatedTags };
        });
    };

    return (
        <div className="article-editor-menu">
            <div className="article-editor-menu-main">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="article-editor-input-title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    rows={5}
                    className="article-editor-input-description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    className="article-editor-input-categories"
                    required
                    value={categories?.[0]?.id || ""}
                    onChange={(e) => {
                        const selected = categoriesContext.find(c => c.id === Number(e.target.value));
                        if (selected) {
                            setCategories([selected]);
                            setArticle(prev => ({ ...prev, categories: [selected] }));
                        }
                    }}
                >
                    <option defaultValue value="">Choisir la catégorie</option>
                    {
                        categoriesContext.map((category) => (
                            <option key={category.id} value={category.id}>{category.title.charAt(0).toUpperCase() + category.title.slice(1)}</option>
                        ))
                    }
                </select>
            </div>
            <div className="article-editor-menu-options">
                <div className="article-editor-menu-options-wrapper">
                    <div className="article-privacy-area">
                        <label className="switch-privacy">
                            <input
                                onChange={() => updatePrivacy(privacy === "private" ? "public" : "private")}
                                type="checkbox"
                                name="privacy"
                                checked={privacy === "public"}
                            />
                            <span className="switch-button-slider"></span>
                        </label>
                        <p className="privacy-label">
                            {privacy === "private" ? "Privé" : "Publique"}
                        </p>
                    </div>
                    <button
                        type="button"
                        className="article-editor-menu-preview-button"
                        onClick={previewArticle}
                    >
                        Voir l'aperçu
                    </button>
                </div>
                <div className="article-editor-menu-tags-selector">
                    <div className="article-editor-menu-tags-search-wrapper">
                        <SearchBar
                            inputName="searchTags"
                            updateTextState={updateSearchText}
                            value={searchText}
                            placeholder="Chercher des tags"
                        />
                        <p className="article-editor-menu-tags-counter">
                            {article.tags.length} tag{article.tags.length > 1 ? "s" : ""}
                        </p>
                    </div>
                    <div className="article-editor-menu-tags-result">
                        {
                            [...article.tags, ...tags]
                                .filter(
                                    (obj, index, self) =>
                                        index === self.findIndex((o) => o.id === obj.id)
                                )
                                .map((tag) => (
                                <label className="tag-label" key={tag.id}>
                                    <Tag tagTitle={tag.title} tagColorCode={tag.colorCode} />
                                    <input
                                        type="checkbox"
                                        className="tag-checkbox"
                                        name={tag.title}
                                        value={tag}
                                        checked={article.tags.some(t => t.id === tag.id)}
                                        onChange={(e) => handleTag(e, tag)}
                                    />
                                </label>
                            ))
                        }
                    </div>
                </div>
                <div className="article-editor-menu-options-wrapper">
                    <label className="article-editor-menu-thumbnail-selector-label">
                        {thumbnailInputLabel}
                        <input
                            className="article-editor-menu-thumbnail-selector"
                            type="file"
                            name="thumbnails"
                            accept=".jpg, .jpeg, .png, .webp"
                            onChange={handleThumbnailChange}
                        />
                    </label>
                    <img className="article-editor-menu-thumbnail-preview" src={thumbnailPreview} alt="aperçu de la miniature" />
                </div>
            </div>
        </div>
    );
}

export default ArticleEditorMenu;