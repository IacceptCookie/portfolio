import { useImageUpload } from "./useImageUpload";
import { useArticleValidation } from "./useArticleValidation";
import { API_ENDPOINTS, authenticatedFetch } from "../config/api";

/**
 * Custom hook to handle article save operations (create and update)
 * @returns {Object} - Save functions
 */
export const useArticleSave = () => {
    const { uploadImage } = useImageUpload();
    const { validateArticle } = useArticleValidation();

    /**
     * Transforms article data to API payload format
     * @param {Object} article - The article data
     * @param {string} thumbnailPath - The uploaded thumbnail path
     * @returns {Object} - The API payload
     */
    const buildPayload = (article, thumbnailPath) => ({
        articleTitle: article.title,
        articleDescription: article.description,
        readingTime: Math.round(article.elements.length * 1.5),
        categories: article.categories.map((category) => API_ENDPOINTS.CATEGORIES.BY_ID(category.id)),
        tags: article.tags.map((tag) => API_ENDPOINTS.TAGS.BY_ID(tag.id)),
        elements: article.elements.map((element) => ({
            elementText: element.text,
            elementComponentName: element.type,
            elementNumber: element.order,
            image: {
                imagePath: element.imagePath ?? '',
            },
            elementHref: element.href,
        })),
        illustration: {
            imagePath: thumbnailPath ?? '',
        },
        isPublic: article.visibility === "public",
    });

    /**
     * Uploads all images (thumbnail and element images) for an article
     * @param {Object} article - The article with images to upload
     * @param {Object|null} originalArticle - The original article (for updates)
     * @returns {Promise<string>} - The uploaded thumbnail path
     */
    const uploadArticleImages = async (article, originalArticle = null) => {
        // Upload thumbnail
        let thumbnailPath = "";
        if (article.thumbnail && article.thumbnail !== "") {
            // Only upload if it's different from original (for updates) or if it's a new article
            if (!originalArticle || article.thumbnail !== originalArticle.thumbnail) {
                thumbnailPath = await uploadImage(article.thumbnail);
            }
        }

        // Upload element images
        await Promise.all(
            article.elements.map(async (element, index) => {
                if (element.image && element.image !== "") {
                    // Only upload if it's different from original (for updates) or if it's a new article
                    const shouldUpload = !originalArticle ||
                        !originalArticle.elements[index] ||
                        element.image !== originalArticle.elements[index].image;

                    if (shouldUpload) {
                        element.imagePath = await uploadImage(element.image);
                    } else {
                        element.imagePath = element.image;
                    }
                }
            })
        );

        return thumbnailPath;
    };

    /**
     * Creates a new article
     * @param {Object} article - The article to create
     * @returns {Promise<{success: boolean, error: string|null}>}
     */
    const createArticle = async (article) => {
        // Validate
        const validation = await validateArticle(article, false);
        if (!validation.valid) {
            return { success: false, error: validation.error };
        }

        try {
            // Upload images
            const thumbnailPath = await uploadArticleImages(article);

            // Build payload
            const payload = buildPayload(article, thumbnailPath);

            // Send request
            const response = await authenticatedFetch(API_ENDPOINTS.ARTICLES.LIST, {
                method: "POST",
                headers: {
                    "accept": "application/ld+json",
                    "Content-Type": "application/ld+json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                return { success: false, error: "Error while sending changes" };
            }

            return { success: true, error: null };
        } catch (error) {
            console.error("Error creating article:", error);
            return { success: false, error: error.message };
        }
    };

    /**
     * Updates an existing article
     * @param {Object} article - The article to update
     * @param {Object} originalArticle - The original article data
     * @returns {Promise<{success: boolean, error: string|null}>}
     */
    const updateArticle = async (article, originalArticle) => {
        // Validate
        const validation = await validateArticle(article, true);
        if (!validation.valid) {
            return { success: false, error: validation.error };
        }

        try {
            // Upload images
            const thumbnailPath = await uploadArticleImages(article, originalArticle);

            // Build payload
            const payload = buildPayload(article, thumbnailPath);

            // Send request
            const response = await authenticatedFetch(API_ENDPOINTS.ARTICLES.BY_ID(article.id), {
                method: "PATCH",
                headers: {
                    "accept": "application/ld+json",
                    "Content-Type": "application/merge-patch+json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                return { success: false, error: "Error while sending changes" };
            }

            return { success: true, error: null };
        } catch (error) {
            console.error("Error updating article:", error);
            return { success: false, error: error.message };
        }
    };

    /**
     * Deletes an article
     * @param {number} articleId - The ID of the article to delete
     * @returns {Promise<{success: boolean, error: string|null}>}
     */
    const deleteArticle = async (articleId) => {
        if (!articleId) {
            return { success: false, error: "No article ID provided" };
        }

        try {
            const response = await authenticatedFetch(API_ENDPOINTS.ARTICLES.BY_ID(articleId), {
                method: "DELETE",
                headers: {
                    "accept": "*/*",
                },
            });

            if (!response.ok) {
                return { success: false, error: "Error while deleting" };
            }

            return { success: true, error: null };
        } catch (error) {
            console.error("Error deleting article:", error);
            return { success: false, error: error.message };
        }
    };

    return { createArticle, updateArticle, deleteArticle };
};
