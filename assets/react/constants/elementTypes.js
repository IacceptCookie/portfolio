/**
 * Element types constants
 * These match the component names used in elementComponentName field
 */
export const ELEMENT_TYPES = {
    TITLE: 'Title',
    PARAGRAPH: 'Paragraph',
    PICTURE: 'Picture',
    QUOTE: 'Quote',
    LINK: 'Link',
};

/**
 * Get all element types as an array
 * @returns {string[]} Array of element type values
 */
export const getAllElementTypes = () => Object.values(ELEMENT_TYPES);

/**
 * Check if a given type is valid
 * @param {string} type - The type to check
 * @returns {boolean} True if the type is valid
 */
export const isValidElementType = (type) => {
    return getAllElementTypes().includes(type);
};

/**
 * Default element configuration for each type
 */
export const ELEMENT_DEFAULTS = {
    [ELEMENT_TYPES.TITLE]: {
        text: '',
        href: '',
        image: '',
        imagePath: '',
    },
    [ELEMENT_TYPES.PARAGRAPH]: {
        text: '',
        href: '',
        image: '',
        imagePath: '',
    },
    [ELEMENT_TYPES.PICTURE]: {
        text: '',
        href: '',
        image: '',
        imagePath: '',
    },
    [ELEMENT_TYPES.QUOTE]: {
        text: '',
        href: '',
        image: '',
        imagePath: '',
    },
    [ELEMENT_TYPES.LINK]: {
        text: '',
        href: '',
        image: '',
        imagePath: '',
    },
};
