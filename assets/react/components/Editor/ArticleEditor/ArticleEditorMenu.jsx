import React, { useEffect, useState } from "react";
import SearchBar from "../../Search/SearchBar";
import Tag from "../../Tag/Tag";
import { searchTags } from "../../../services/api/Tags";
import { useCategories } from "../../../providers/CategoriesProvider";
import { useArticlePreview } from "../../../providers/ArticlePreviewProvider";
import { useLocation } from "wouter";
import imageCompression from 'browser-image-compression';

function ArticleEditorMenu({ article, setArticle }) {
    const categoriesContext = useCategories();
    const [searchText, updateSearchText] = useState("");
    const [availableTags, setAvailableTags] = useState([]);
    const { setContextArticle } = useArticlePreview();
    const [_, navigate] = useLocation();

    // Load tags for search
    useEffect(() => {
        searchTags(searchText).then(setAvailableTags);
    }, [searchText]);

    const previewArticle = () => {
        setContextArticle(article);
        navigate("/article/preview");
    };

    const handleThumbnailChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) {
            setArticle(prev => ({ ...prev, thumbnail: "" }));
            return;
        }

        try {
            const options = {
                maxSizeMB: 0.5,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
                fileType: 'image/webp',
                initialQuality: 0.85
            };

            const compressedFile = await imageCompression(file, options);
            const reader = new FileReader();
            reader.onload = () => {
                setArticle(prev => ({ ...prev, thumbnail: reader.result }));
            };
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error("Error compressing image:", error);
        }
    };

    const handleTagToggle = (e, tag) => {
        const isChecked = e.target.checked;
        setArticle(prev => {
            const currentTags = prev.tags ?? [];
            if (isChecked) {
                return { ...prev, tags: [...currentTags, tag] };
            } else {
                return { ...prev, tags: currentTags.filter(t => t.id !== tag.id) };
            }
        });
    };

    const handleCategoryChange = (e) => {
        const selected = categoriesContext.find(c => c.id === Number(e.target.value));
        if (selected) {
            setArticle(prev => ({ ...prev, categories: [selected] }));
        }
    };

    const handlePrivacyToggle = () => {
        setArticle(prev => ({
            ...prev,
            visibility: prev.visibility === "private" ? "public" : "private"
        }));
    };

    // Merge selected tags with search results, removing duplicates
    const allTags = [...(article.tags || []), ...availableTags]
        .filter((tag, index, self) => index === self.findIndex(t => t.id === tag.id));

    return (
        <div className="article-editor-menu">
            <div className="article-editor-menu-main">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="article-editor-input-title"
                    required
                    value={article.title || ""}
                    onChange={(e) => setArticle(prev => ({ ...prev, title: e.target.value }))}
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    rows={5}
                    className="article-editor-input-description"
                    required
                    value={article.description || ""}
                    onChange={(e) => setArticle(prev => ({ ...prev, description: e.target.value }))}
                />
                <select
                    className="article-editor-input-categories"
                    required
                    value={article.categories?.[0]?.id || ""}
                    onChange={handleCategoryChange}
                >
                    <option value="">Choisir la catégorie</option>
                    {categoriesContext.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title.charAt(0).toUpperCase() + category.title.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
            <div className="article-editor-menu-options">
                <div className="article-editor-menu-options-wrapper">
                    <div className="article-privacy-area">
                        <label className="switch-privacy">
                            <input
                                type="checkbox"
                                name="privacy"
                                checked={article.visibility === "public"}
                                onChange={handlePrivacyToggle}
                            />
                            <span className="switch-button-slider"></span>
                        </label>
                        <p className="privacy-label">
                            {article.visibility === "private" ? "Privé" : "Publique"}
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
                            {(article.tags || []).length} tag{(article.tags || []).length > 1 ? "s" : ""}
                        </p>
                    </div>
                    <div className="article-editor-menu-tags-result">
                        {allTags.map((tag) => (
                            <label className="tag-label" key={tag.id}>
                                <Tag tagTitle={tag.title} tagColorCode={tag.colorCode} />
                                <input
                                    type="checkbox"
                                    className="tag-checkbox"
                                    name={tag.title}
                                    checked={(article.tags || []).some(t => t.id === tag.id)}
                                    onChange={(e) => handleTagToggle(e, tag)}
                                />
                            </label>
                        ))}
                    </div>
                </div>
                <div className="article-editor-menu-options-wrapper">
                    <label className="article-editor-menu-thumbnail-selector-label">
                        {article.thumbnail ? "Modifier la miniature" : "Choisir une miniature"}
                        <input
                            className="article-editor-menu-thumbnail-selector"
                            type="file"
                            name="thumbnails"
                            accept=".jpg, .jpeg, .png, .webp"
                            onChange={handleThumbnailChange}
                        />
                    </label>
                    <img
                        className="article-editor-menu-thumbnail-preview"
                        src={article.thumbnail || ""}
                        alt="aperçu de la miniature"
                    />
                </div>
            </div>
        </div>
    );
}

export default ArticleEditorMenu;
