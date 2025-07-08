import React from "react";
import "./Article.css";
import EditorHeader from "../../../components/Editor/EditorHeader";
import SearchBar from "../../../components/Search/SearchBar";

function Create() {
    const [searchText, updateSearchText] = React.useState("");

    return (
        <>
            <EditorHeader warning={true} />
            // TODO: Déplacer les menus dans un composant (pour mutualiser avec la page d'édition
            <form className="article-creator">
                <div className="article-creator-menu">
                    <div className="article-creator-menu-main">
                        <input type="text" name="title" placeholder="Title" className="article-creator-input-title" required />
                        <textarea name="description" placeholder="Description" className="article-creator-input-description" required />
                        <select className="article-creator-input-categories" required>
                            <option selected value="default">Choisir des catégories</option>
                            <option value="value">Une catégorie</option>
                        </select>
                    </div>
                    <div className="article-creator-menu-options">
                        <div className="article-creator-menu-options-wrapper">
                            <label>
                                <input type="checkbox" name="privacy" value="checked" />
                                Publique
                            </label>
                            <button className="article-creator-menu-preview-button">Voir l'aperçu</button>
                        </div>
                        <div className="article-creator-menu-tags-selector">
                            <div className="article-creator-menu-tags-search-wrapper">
                                <SearchBar
                                    inputName="searchTags"
                                    updateTextState={updateSearchText}
                                    value={searchText}
                                    placeholder="Chercher des tags"
                                />
                                <p className="article-creator-menu-tags-counter">
                                    5 tags
                                </p>
                            </div>
                            // TODO: Tag checkboxes
                        </div>
                        <div className="article-creator-menu-options-wrapper">
                            <input type="file" name="thumbnails" />
                            <img src="" alt="thumbnail preview" />
                        </div>
                    </div>
                </div>
                <div className="element-creator">
                    <div className="element-creator-menu">
                        // TODO: Menu de création d'élément
                    </div>
                    <div className="element-list">
                        // TODO: Exemple de menu d'un élément
                    </div>
                </div>
                <div className="article-creator-buttons">
                    <button className="article-save-button">
                        Enregistrer
                    </button>
                    <button className="article-delete-button">
                        Supprimer
                    </button>
                </div>
            </form>
        </>
    );
}

export default Create;