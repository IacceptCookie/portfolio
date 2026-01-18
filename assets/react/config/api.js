/**
 * Centralized API configuration
 * All API endpoints are defined here to avoid hardcoded URLs throughout the application
 */

const API_BASE = '/api';
const AUTH_BASE = '/authentication';
const EMAIL_BASE = '/email';

export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        TOKEN: `${AUTH_BASE}/token`,
        TWO_FA: `${AUTH_BASE}/2fa`,
        TWO_FA_REGENERATE: `${AUTH_BASE}/2fa/regenerate`,
        LOGOUT: `${AUTH_BASE}/logout`,
        ME: `${API_BASE}/me`,
    },

    // Articles
    ARTICLES: {
        LIST: `${API_BASE}/articles`,
        BY_SLUG: (slug) => `${API_BASE}/articles/${slug}`,
        BY_ID: (id) => `${API_BASE}/articles/${id}`,
        SEARCH: `${API_BASE}/articles/search`,
        EDITOR_SEARCH: `${API_BASE}/articles/editor/search`,
        LATEST: `${API_BASE}/articles/latest`,
        FEATURED: `${API_BASE}/articles/featured`,
    },

    // Categories
    CATEGORIES: {
        LIST: `${API_BASE}/categories`,
        BY_ID: (id) => `${API_BASE}/categories/${id}`,
    },

    // Tags
    TAGS: {
        LIST: `${API_BASE}/tags`,
        BY_ID: (id) => `${API_BASE}/tags/${id}`,
        SEARCH: `${API_BASE}/tags/search`,
    },

    // Images
    IMAGES: {
        UPLOAD: `${API_BASE}/images/upload`,
        BY_ID: (id) => `${API_BASE}/images/${id}`,
    },

    // Filters (combined search)
    FILTERS: {
        SEARCH: `${API_BASE}/search/filter`,
    },

    // Email
    EMAIL: {
        CONTACT: `${EMAIL_BASE}/contact`,
    },
};

/**
 * Build a query string from parameters
 * @param {Object} params - Query parameters
 * @returns {string} - Query string
 */
export const buildQuery = (params) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(v => query.append(`${key}[]`, v));
        } else if (value !== undefined && value !== null) {
            query.append(key, value);
        }
    });
    return query.toString();
};

/**
 * Helper to make authenticated requests
 * @param {string} url - The URL to fetch
 * @param {Object} options - Fetch options
 * @returns {Promise<Response>}
 */
export const authenticatedFetch = (url, options = {}) => {
    const csrfToken = sessionStorage.getItem('csrf_token');

    return fetch(url, {
        ...options,
        headers: {
            'X-CSRF-TOKEN': csrfToken,
            ...options.headers,
        },
    });
};
