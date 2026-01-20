import { ELEMENT_TYPES, getAllElementTypes, isValidElementType, ELEMENT_DEFAULTS } from '../elementTypes';

describe('elementTypes constants', () => {
    describe('ELEMENT_TYPES', () => {
        it('should have all required element types', () => {
            expect(ELEMENT_TYPES.TITLE).toBe('Title');
            expect(ELEMENT_TYPES.PARAGRAPH).toBe('Paragraph');
            expect(ELEMENT_TYPES.PICTURE).toBe('Picture');
            expect(ELEMENT_TYPES.QUOTE).toBe('Quote');
            expect(ELEMENT_TYPES.LINK).toBe('Link');
        });

        it('should have exactly 5 element types', () => {
            expect(Object.keys(ELEMENT_TYPES)).toHaveLength(5);
        });
    });

    describe('getAllElementTypes', () => {
        it('should return array of all element type values', () => {
            const types = getAllElementTypes();

            expect(types).toContain('Title');
            expect(types).toContain('Paragraph');
            expect(types).toContain('Picture');
            expect(types).toContain('Quote');
            expect(types).toContain('Link');
            expect(types).toHaveLength(5);
        });

        it('should return a new array each time', () => {
            const types1 = getAllElementTypes();
            const types2 = getAllElementTypes();

            expect(types1).toEqual(types2);
            expect(types1).not.toBe(types2); // Different array instances
        });
    });

    describe('isValidElementType', () => {
        it('should return true for valid element types', () => {
            expect(isValidElementType('Title')).toBe(true);
            expect(isValidElementType('Paragraph')).toBe(true);
            expect(isValidElementType('Picture')).toBe(true);
            expect(isValidElementType('Quote')).toBe(true);
            expect(isValidElementType('Link')).toBe(true);
        });

        it('should return false for invalid element types', () => {
            expect(isValidElementType('InvalidType')).toBe(false);
            expect(isValidElementType('title')).toBe(false); // case sensitive
            expect(isValidElementType('')).toBe(false);
            expect(isValidElementType(null)).toBe(false);
            expect(isValidElementType(undefined)).toBe(false);
            expect(isValidElementType(123)).toBe(false);
        });
    });

    describe('ELEMENT_DEFAULTS', () => {
        it('should have defaults for all element types', () => {
            expect(ELEMENT_DEFAULTS[ELEMENT_TYPES.TITLE]).toBeDefined();
            expect(ELEMENT_DEFAULTS[ELEMENT_TYPES.PARAGRAPH]).toBeDefined();
            expect(ELEMENT_DEFAULTS[ELEMENT_TYPES.PICTURE]).toBeDefined();
            expect(ELEMENT_DEFAULTS[ELEMENT_TYPES.QUOTE]).toBeDefined();
            expect(ELEMENT_DEFAULTS[ELEMENT_TYPES.LINK]).toBeDefined();
        });

        it('should have consistent structure for all defaults', () => {
            Object.values(ELEMENT_TYPES).forEach(type => {
                const defaults = ELEMENT_DEFAULTS[type];
                expect(defaults).toHaveProperty('text');
                expect(defaults).toHaveProperty('href');
                expect(defaults).toHaveProperty('image');
                expect(defaults).toHaveProperty('imagePath');
            });
        });

        it('should initialize all fields as empty strings', () => {
            Object.values(ELEMENT_TYPES).forEach(type => {
                const defaults = ELEMENT_DEFAULTS[type];
                expect(defaults.text).toBe('');
                expect(defaults.href).toBe('');
                expect(defaults.image).toBe('');
                expect(defaults.imagePath).toBe('');
            });
        });

        it('should have exactly 5 default configurations', () => {
            expect(Object.keys(ELEMENT_DEFAULTS)).toHaveLength(5);
        });
    });
});
