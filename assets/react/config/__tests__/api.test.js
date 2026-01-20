import { API_ENDPOINTS, buildQuery, authenticatedFetch } from '../api';

describe('API Configuration', () => {
    beforeEach(() => {
        sessionStorage.clear();
        global.fetch.mockClear();
    });

    describe('API_ENDPOINTS', () => {
        it('should have AUTH endpoints', () => {
            expect(API_ENDPOINTS.AUTH.TOKEN).toBe('/authentication/token');
            expect(API_ENDPOINTS.AUTH.TWO_FA).toBe('/authentication/2fa');
            expect(API_ENDPOINTS.AUTH.ME).toBe('/api/me');
        });

        it('should have ARTICLES endpoints', () => {
            expect(API_ENDPOINTS.ARTICLES.LIST).toBe('/api/articles');
            expect(API_ENDPOINTS.ARTICLES.SEARCH).toBe('/api/articles/search');
            expect(API_ENDPOINTS.ARTICLES.LATEST).toBe('/api/articles/latest');
        });

        it('should generate dynamic endpoints', () => {
            expect(API_ENDPOINTS.ARTICLES.BY_SLUG('my-article')).toBe('/api/articles/my-article');
            expect(API_ENDPOINTS.ARTICLES.BY_ID(123)).toBe('/api/articles/123');
            expect(API_ENDPOINTS.TAGS.BY_ID(456)).toBe('/api/tags/456');
            expect(API_ENDPOINTS.CATEGORIES.BY_ID(789)).toBe('/api/categories/789');
        });

        it('should have IMAGES endpoints', () => {
            expect(API_ENDPOINTS.IMAGES.UPLOAD).toBe('/api/images/upload');
            expect(API_ENDPOINTS.IMAGES.BY_ID(1)).toBe('/api/images/1');
        });
    });

    describe('buildQuery', () => {
        it('should build query string from simple params', () => {
            const query = buildQuery({ page: 1, search: 'test' });
            expect(query).toBe('page=1&search=test');
        });

        it('should handle array parameters', () => {
            const query = buildQuery({ tags: [1, 2, 3] });
            // URLSearchParams encodes brackets as %5B and %5D
            expect(query).toBe('tags%5B%5D=1&tags%5B%5D=2&tags%5B%5D=3');
        });

        it('should skip null and undefined values', () => {
            const query = buildQuery({
                page: 1,
                search: null,
                filter: undefined,
                active: true
            });
            expect(query).toBe('page=1&active=true');
        });

        it('should handle empty arrays', () => {
            const query = buildQuery({ tags: [] });
            expect(query).toBe('');
        });

        it('should handle mixed types', () => {
            const query = buildQuery({
                page: 1,
                tags: [1, 2],
                search: 'test',
                active: true
            });
            expect(query).toContain('page=1');
            expect(query).toContain('tags%5B%5D=1');
            expect(query).toContain('tags%5B%5D=2');
            expect(query).toContain('search=test');
            expect(query).toContain('active=true');
        });

        it('should handle special characters', () => {
            const query = buildQuery({ search: 'test & stuff' });
            expect(query).toBe('search=test+%26+stuff');
        });
    });

    describe('authenticatedFetch', () => {
        it('should add CSRF token to request headers', async () => {
            sessionStorage.setItem('csrf_token', 'test-token');
            global.fetch.mockResolvedValue({ ok: true });

            await authenticatedFetch('/test-url', { method: 'GET' });

            expect(global.fetch).toHaveBeenCalledWith('/test-url', {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': 'test-token'
                }
            });
        });

        it('should merge with existing headers', async () => {
            sessionStorage.setItem('csrf_token', 'test-token');
            global.fetch.mockResolvedValue({ ok: true });

            await authenticatedFetch('/test-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            expect(global.fetch).toHaveBeenCalledWith('/test-url', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': 'test-token',
                    'Content-Type': 'application/json'
                }
            });
        });

        it('should work without CSRF token', async () => {
            global.fetch.mockResolvedValue({ ok: true });

            await authenticatedFetch('/test-url', { method: 'GET' });

            expect(global.fetch).toHaveBeenCalledWith('/test-url', {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': null
                }
            });
        });

        it('should preserve request body', async () => {
            sessionStorage.setItem('csrf_token', 'test-token');
            global.fetch.mockResolvedValue({ ok: true });

            const body = JSON.stringify({ test: 'data' });
            await authenticatedFetch('/test-url', {
                method: 'POST',
                body
            });

            expect(global.fetch).toHaveBeenCalledWith('/test-url', {
                method: 'POST',
                body,
                headers: {
                    'X-CSRF-TOKEN': 'test-token'
                }
            });
        });
    });
});
