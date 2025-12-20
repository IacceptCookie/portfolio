export function searchFilters (
    searchText = "",
    page = 1
)
{
    const query = new URLSearchParams();

    query.append("search", searchText);
    query.append("page", page.toString());

    return fetch(`/api/search/filter?${query.toString()}`)
        .then(response => response.json());
}

export function getFilterByIdAndType (
    id,
    type
)
{
    if (type === "tag") {
        return fetch(`/api/tags/${id.toString()}`)
            .then(response => response.json());
    }
    return fetch(`/api/categories/${id.toString()}`)
        .then(response => response.json());
}