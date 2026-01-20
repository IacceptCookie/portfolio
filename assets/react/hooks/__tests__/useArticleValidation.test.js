import { renderHook, act } from '@testing-library/react';
import { useArticleValidation } from '../useArticleValidation';

// Mock the API
jest.mock('../../services/api/Articles', () => ({
    getArticleBySlug: jest.fn()
}));

describe('useArticleValidation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return validation functions', () => {
        const { result } = renderHook(() => useArticleValidation());

        expect(result.current.validateArticle).toBeDefined();
        expect(result.current.slugify).toBeDefined();
        expect(typeof result.current.validateArticle).toBe('function');
        expect(typeof result.current.slugify).toBe('function');
    });

    describe('slugify', () => {
        it('should convert title to slug', () => {
            const { result } = renderHook(() => useArticleValidation());

            expect(result.current.slugify('Hello World')).toBe('hello-world');
            expect(result.current.slugify('  Spaces   Everywhere  ')).toBe('spaces-everywhere');
            expect(result.current.slugify('Special!@#Characters')).toBe('specialcharacters');
            expect(result.current.slugify('Multiple---Dashes')).toBe('multiple-dashes');
            expect(result.current.slugify('---Leading Dashes---')).toBe('leading-dashes');
        });
    });

    describe('validateArticle', () => {
        it('should reject empty title', async () => {
            const { result } = renderHook(() => useArticleValidation());

            const article = { title: '', categories: [{ id: 1 }] };

            const validation = await act(async () => {
                return await result.current.validateArticle(article, false);
            });

            expect(validation.valid).toBe(false);
            expect(validation.error).toBe('Title is empty');
        });

        it('should reject whitespace-only title', async () => {
            const { result } = renderHook(() => useArticleValidation());

            const article = { title: '   ', categories: [{ id: 1 }] };

            const validation = await act(async () => {
                return await result.current.validateArticle(article, false);
            });

            expect(validation.valid).toBe(false);
            expect(validation.error).toBe('Title is empty');
        });

        it('should reject missing categories', async () => {
            const { result } = renderHook(() => useArticleValidation());

            const article = { title: 'Valid Title', categories: [] };

            const validation = await act(async () => {
                return await result.current.validateArticle(article, false);
            });

            expect(validation.valid).toBe(false);
            expect(validation.error).toBe('Missing a category');
        });

        it('should reject null categories', async () => {
            const { result } = renderHook(() => useArticleValidation());

            const article = { title: 'Valid Title', categories: null };

            const validation = await act(async () => {
                return await result.current.validateArticle(article, false);
            });

            expect(validation.valid).toBe(false);
            expect(validation.error).toBe('Missing a category');
        });

        it('should check slug availability for new articles', async () => {
            const { getArticleBySlug } = require('../../services/api/Articles');
            getArticleBySlug.mockResolvedValue({ ok: true }); // Slug exists

            const { result } = renderHook(() => useArticleValidation());

            const article = { title: 'My Article', categories: [{ id: 1 }] };

            const validation = await act(async () => {
                return await result.current.validateArticle(article, false);
            });

            expect(getArticleBySlug).toHaveBeenCalledWith('my-article');
            expect(validation.valid).toBe(false);
            expect(validation.error).toBe('Title slug is already used');
        });

        it('should pass validation for new article with unique slug', async () => {
            const { getArticleBySlug } = require('../../services/api/Articles');
            getArticleBySlug.mockResolvedValue({ ok: false }); // Slug doesn't exist

            const { result } = renderHook(() => useArticleValidation());

            const article = { title: 'My Unique Article', categories: [{ id: 1 }] };

            const validation = await act(async () => {
                return await result.current.validateArticle(article, false);
            });

            expect(validation.valid).toBe(true);
            expect(validation.error).toBeNull();
        });

        it('should skip slug check for updates', async () => {
            const { getArticleBySlug } = require('../../services/api/Articles');

            const { result } = renderHook(() => useArticleValidation());

            const article = { title: 'Updated Article', categories: [{ id: 1 }] };

            const validation = await act(async () => {
                return await result.current.validateArticle(article, true);
            });

            expect(getArticleBySlug).not.toHaveBeenCalled();
            expect(validation.valid).toBe(true);
            expect(validation.error).toBeNull();
        });
    });
});
