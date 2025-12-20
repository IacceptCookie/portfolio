import {renameKeys} from "../../tools/remaper";

export function fetchCategories ()
{
    const mapping = { categoryLabel: "title" };

    return fetch(`/api/categories`)
        .then(response => response.json())
        .then(categories => {
            return categories['hydra:member'].map(category => renameKeys(category, mapping));
        });
}