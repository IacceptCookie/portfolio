import { API_ENDPOINTS, buildQuery } from "../../config/api";

export function searchFilters (
    searchText = "",
    page = 1
)
{
    const query = buildQuery({
        search: searchText,
        page: page.toString()
    });

    return fetch(`${API_ENDPOINTS.FILTERS.SEARCH}?${query}`)
        .then(response => response.json());
}

export function getFilterByIdAndType (
    id,
    type
)
{
    const endpoint = type === "tag"
        ? API_ENDPOINTS.TAGS.BY_ID(id)
        : API_ENDPOINTS.CATEGORIES.BY_ID(id);

    return fetch(endpoint)
        .then(response => response.json());
}