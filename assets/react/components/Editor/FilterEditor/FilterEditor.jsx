import React, {useEffect, useState} from 'react';
import "./FilterEditor.css";
import {useLocation} from "wouter";
import FilterEditorMenu from "./FilterEditorMenu";

const defaultFilter = {
    type: "tag",
    id: undefined,
    label: undefined,
    color: undefined
}

function FilterEditor(
    {
        updateFilter = defaultFilter,
    }
)
{
    const [_, navigate] = useLocation();
    const [filter, setFilter] = useState(() => {
        const saved = sessionStorage.getItem("filter");
        if (saved) {
            try {
                const filter = JSON.parse(saved);
                if(filter.id === updateFilter.id) {
                    return filter;
                }
            } catch (e) {
                console.error("error while parsing filter :", e);
            }
        }
        return updateFilter;
    });

    useEffect(() => {
        console.log("update session storage")
        const prev = sessionStorage.getItem("filter");
        const next = JSON.stringify(filter);
        if (prev !== next) {
            sessionStorage.setItem("filter", next);
        }
    }, [filter]);

    const saveFilter = async (event) => {
        event.preventDefault();

        // check label
        if (filter.label === '') {
            alert("Title is empty");
            return
        }

        if (
            updateFilter !== defaultFilter
        ) {
            if (filter.type === "tag") {
                const payload = {
                    tagLabel: filter.label,
                    tagColor: filter.color
                };

                const response = await fetch(`/api/tags/${filter.id}`, {
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
                const payload = {
                    categoryLabel: filter.label
                };

                const response = await fetch(`/api/categories/${filter.id}`, {
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
            }
        } else {
            if (filter.type === "tag") {
                const payload = {
                    tagLabel: filter.label,
                    tagColor: filter.color
                };

                const response = await fetch("/api/tags", {
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
            } else {
                const payload = {
                    categoryLabel: filter.label
                };

                const response = await fetch("/api/categories", {
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
        }
        sessionStorage.removeItem("filter");
        navigate("/dashboard");
    }

    const deleteFilter = async () => {
        if (
            updateFilter !== defaultFilter
        ) {
            if (filter.type === "tag") {
                const response = await fetch(`/api/tags/${filter.id}`, {
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
            } else {
                const response = await fetch(`/api/categories/${filter.id}`, {
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
        }

        sessionStorage.removeItem("filter");
        navigate("/dashboard");
    }

    return (
        <form className="filter-editor">
            <FilterEditorMenu
                filter={filter}
                setFilter={setFilter}
                updating={defaultFilter !== updateFilter}
            />
            <div className="filter-editor-buttons">
                <button className="filter-save-button" type="submit" onClick={saveFilter}>
                    Enregistrer
                </button>
                <button className="filter-delete-button" type="button" onClick={deleteFilter}>
                    Supprimer
                </button>
            </div>
        </form>
    );
}

export default FilterEditor;