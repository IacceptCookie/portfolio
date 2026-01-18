import {renameKeys} from "../../tools/remaper";
import { API_ENDPOINTS } from "../../config/api";

export function fetchCategories ()
{
    const mapping = { categoryLabel: "title" };

    return fetch(API_ENDPOINTS.CATEGORIES.LIST)
        .then(response => response.json())
        .then(categories => {
            return categories['hydra:member'].map(category => renameKeys(category, mapping));
        });
}