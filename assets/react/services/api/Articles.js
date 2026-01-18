import { API_ENDPOINTS, buildQuery } from "../../config/api";

export function getArticleBySlug (
    slug = ""
)
{
    return fetch(API_ENDPOINTS.ARTICLES.BY_SLUG(slug))
        .then(response => response);
}

export function getLatestArticles() {
    return fetch(API_ENDPOINTS.ARTICLES.LATEST)
        .then(response => response.json());
}

export function getFeaturedArticles() {
    return fetch(API_ENDPOINTS.ARTICLES.FEATURED)
        .then(response => response.json());
}

export function searchArticles(
    searchText = '',
    publicOnly = false,
    tags = [],
    categories = [],
    page = 1
) {
    const query = buildQuery({
        search: searchText,
        page: page.toString(),
        tags,
        categories
    });

    const endpoint = publicOnly
        ? API_ENDPOINTS.ARTICLES.SEARCH
        : API_ENDPOINTS.ARTICLES.EDITOR_SEARCH;

    return fetch(`${endpoint}?${query}`)
        .then(response => response.json());
}