import React, {useEffect, useState} from "react";
import "./Search.css";
import CommonSearchBar from "./CommonSearchBar";
import {useCategories} from "../../providers/CategoriesProvider";
import {searchTags} from "../../services/api/Tags";
import Tag from "../Tag/Tag";

function FilterSearchBar(
    {
        inputName,
        updateTextState,
        placeholder = "Recherchez",
        value = "",
        selectedTags,
        updateSelectedTags,
        selectedCategories,
        updateSelectedCategories,
        resultNumber = 0
    }
) {
    const categoriesContext = useCategories();
    const [tags, setTags] = useState([]);
    const [searchText, updateSearchText] = useState("");
    const [selectedSection, setSelectedSection] = useState();

    useEffect(() => {
        searchTags(searchText).then((response) => {
            setTags(response);
        });
    }, [searchText]);

    const handleTag = (e, tag) => {
        const isChecked = e.target.checked;

        updateSelectedTags(prev => {
            const currentTags = prev ?? [];
            const alreadyExists = currentTags.some(t => t.id === tag.id);
            let updatedTags;

            if (isChecked && !alreadyExists) {
                updatedTags = [...prev, tag];
            } else if (!isChecked && alreadyExists) {
                updatedTags = prev.filter(t => t.id !== tag.id);
            } else {
                updatedTags = prev;
            }

            return updatedTags;
        });
    };

    const handleSelectedSection = (section) => {
        setSelectedSection(prev => prev === section ? undefined : section);
    };

    return (
        <div className="filter-searchbar">
            <CommonSearchBar
                inputName={inputName}
                updateTextState={updateTextState}
                placeholder={placeholder}
                value={value}
                disabledMargin={true}
            />
            <div className="filter-bar">
                <div className="filter-bar-menu">
                    <p className="filter-bar-label">
                        Filtres
                    </p>
                    <div className="filter-bar-menu-buttons">
                        <button
                            className="filter-bar-menu-buttons__add-tags"
                            onClick={() => {handleSelectedSection("tags")}}
                        >
                            Ajouter des tags
                        </button>
                        <button
                            className="filter-bar-menu-buttons__add-categories"
                            onClick={() => {handleSelectedSection("categories")}}
                        >
                            Ajouter des catégories
                        </button>
                    </div>
                    <p className="filter-bar-result-number">
                        {resultNumber} résultat(s)
                    </p>
                </div>
                <div className="filter-bar-foldable-section">
                    <div className={selectedSection === 'tags' ? "filter-bar-foldable-section__tags-selection" : "hidden-section filter-bar-foldable-section__tags-selection"}>
                        <CommonSearchBar
                            inputName="tags-filter-search"
                            updateTextState={updateSearchText}
                            placeholder="Recherchez des tags"
                            value={searchText}
                            disabledMargin={true}
                        />
                        <div className="filter-bar-foldable-section__tags-list">
                            {
                                [...selectedTags, ...tags]
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
                                                checked={selectedTags.some(t => t.id === tag.id)}
                                                onChange={(e) => handleTag(e, tag)}
                                            />
                                        </label>
                                    ))
                            }
                        </div>
                    </div>
                    <div className={selectedSection === 'categories' ? "filter-bar-foldable-section__categories-selection" : "hidden-section filter-bar-foldable-section__categories-selection"}>
                        <select
                            className="filter-bar-foldable-section__categories-picker"
                            value={selectedCategories?.[0]?.id || ""}
                            onChange={(e) => {
                                const selected = categoriesContext.find(c => c.id === Number(e.target.value));
                                if (selected) {
                                    updateSelectedCategories([selected]);
                                }

                                if (e.target.value === "") {
                                    updateSelectedCategories([]);
                                }
                            }}
                        >
                            <option defaultValue value="">Aucune catégorie selectionnée</option>
                            {
                                categoriesContext.map((category) => (
                                    <option key={category.id} value={category.id}>{category.title.charAt(0).toUpperCase() + category.title.slice(1)}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterSearchBar;