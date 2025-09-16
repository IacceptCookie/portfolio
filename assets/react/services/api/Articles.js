export function getArticleBySlug (
    slug = ""
)
{
    return fetch(`/api/articles/${slug}`)
        .then(response => response);
}