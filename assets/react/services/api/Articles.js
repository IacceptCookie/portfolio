export function getArticleBySlug (
    slug = ""
)
{
    return fetch(`/api/articles/${slug}`)
        .then(response => response);
}

export function getLatestArticles() {
    return fetch('/api/articles/latest')
        .then(response => response.json());
}

export function getFeaturedArticles() {
    return fetch('/api/articles/featured')
        .then(response => response.json());
}

export function searchArticles(
    searchText = '',
    publicOnly = false,
    tags = [],
    categories = [],
    page = 1
) {
    const query = new URLSearchParams();

    query.append("search", searchText);
    query.append("page", page.toString());

    tags.forEach(tag => query.append("tags[]", tag));
    categories.forEach(cat => query.append("categories[]", cat));
    if (publicOnly) {
        return fetch(`/api/articles/search?${query.toString()}`)
            .then(response => response.json());
    }

    return fetch(`/api/articles/editor/search?${query.toString()}`)
        .then(response => response.json());
}