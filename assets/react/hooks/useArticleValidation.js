import { getArticleBySlug } from "../services/api/Articles";

/**
 * Generates a slug from a title
 * @param {string} title - The title to slugify
 * @returns {string} - The generated slug
 */
const slugify = (title) => {
    return title
        .toString()
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
};

/**
 * Custom hook to validate article data
 * @returns {Object} - Validation functions
 */
export const useArticleValidation = () => {
    /**
     * Validates article data before saving
     * @param {Object} article - The article to validate
     * @param {boolean} isUpdate - Whether this is an update operation
     * @returns {Promise<{valid: boolean, error: string|null}>}
     */
    const validateArticle = async (article, isUpdate = false) => {
        // Check title
        if (!article.title || article.title.trim() === '') {
            return { valid: false, error: "Title is empty" };
        }

        // Check categories
        if (!article.categories || article.categories.length === 0) {
            return { valid: false, error: "Missing a category" };
        }

        // For new articles, check if slug is available
        if (!isUpdate) {
            const slug = slugify(article.title);
            const response = await getArticleBySlug(slug);

            if (response.ok) {
                return { valid: false, error: "Title slug is already used" };
            }
        }

        return { valid: true, error: null };
    };

    return { validateArticle, slugify };
};
