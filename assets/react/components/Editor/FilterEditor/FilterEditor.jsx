import React, {useEffect, useState} from 'react';
import "./FilterEditor.css";
import {useLocation} from "wouter";
import FilterEditorMenu from "./FilterEditorMenu";
import { API_ENDPOINTS, authenticatedFetch } from "../../../config/api";
import { useNotification } from "../../../providers/NotificationProvider";

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
    const { notify } = useNotification();
    const isUpdateMode = updateFilter !== defaultFilter;

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
        const prev = sessionStorage.getItem("filter");
        const next = JSON.stringify(filter);
        if (prev !== next) {
            sessionStorage.setItem("filter", next);
        }
    }, [filter]);

    const saveFilter = async (event) => {
        event.preventDefault();

        if (!filter.label || filter.label.trim() === '') {
            notify.error("Label is empty");
            return;
        }

        const isTag = filter.type === "tag";
        const payload = isTag
            ? { tagLabel: filter.label, tagColor: filter.color }
            : { categoryLabel: filter.label };

        const endpoint = isUpdateMode
            ? (isTag ? API_ENDPOINTS.TAGS.BY_ID(filter.id) : API_ENDPOINTS.CATEGORIES.BY_ID(filter.id))
            : (isTag ? API_ENDPOINTS.TAGS.LIST : API_ENDPOINTS.CATEGORIES.LIST);

        const method = isUpdateMode ? "PATCH" : "POST";
        const contentType = isUpdateMode ? "application/merge-patch+json" : "application/ld+json";

        try {
            const response = await authenticatedFetch(endpoint, {
                method,
                headers: {
                    "accept": "application/ld+json",
                    "Content-Type": contentType,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                notify.error("Error while sending changes");
                return;
            }

            notify.success(isUpdateMode ? "Filter updated successfully" : "Filter created successfully");
            sessionStorage.removeItem("filter");
            navigate("/dashboard");
        } catch (error) {
            notify.error(`Failed to save filter: ${error.message}`);
        }
    };

    const deleteFilter = async () => {
        if (!isUpdateMode) {
            sessionStorage.removeItem("filter");
            navigate("/dashboard");
            return;
        }

        const isTag = filter.type === "tag";
        const endpoint = isTag
            ? API_ENDPOINTS.TAGS.BY_ID(filter.id)
            : API_ENDPOINTS.CATEGORIES.BY_ID(filter.id);

        try {
            const response = await authenticatedFetch(endpoint, {
                method: "DELETE",
                headers: {
                    "accept": "*/*",
                },
            });

            if (!response.ok) {
                notify.error("Error while deleting");
                return;
            }

            notify.success("Filter deleted successfully");
            sessionStorage.removeItem("filter");
            navigate("/dashboard");
        } catch (error) {
            notify.error(`Failed to delete filter: ${error.message}`);
        }
    };

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