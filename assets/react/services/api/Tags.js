import {renameKeys} from "../../tools/remaper";
import { API_ENDPOINTS, buildQuery } from "../../config/api";

export function searchTags (
    searchText = ""
)
{
    if (searchText === "") {
        return Promise.resolve([]);
    }

    const mapping = { tagLabel: "title", tagColor: "colorCode" };
    const query = buildQuery({ search: searchText });

    return fetch(`${API_ENDPOINTS.TAGS.SEARCH}?${query}`)
        .then(response => response.json())
        .then(tags => {
            return tags.map(tag => renameKeys(tag, mapping));
        });
}