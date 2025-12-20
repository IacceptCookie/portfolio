import {renameKeys} from "../../tools/remaper";

export function searchTags (
    searchText = ""
)
{
    if (searchText === "") {
        return Promise.resolve([]);
    }


    const mapping = { tagLabel: "title", tagColor: "colorCode" };

    return fetch(`/api/tags/search?search=${encodeURIComponent(searchText)}`)
        .then(response => response.json())
        .then(tags => {
            return tags.map(tag => renameKeys(tag, mapping));
        });
}