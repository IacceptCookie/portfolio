import { renderHook, act } from '@testing-library/react';
import { useImageUpload } from '../useImageUpload';

// Mock modules
jest.mock('../../tools/remaper', () => ({
    dataURLtoFile: jest.fn((dataURL) => {
        const mockFile = { name: 'test.jpg', type: 'image/jpeg' };
        return mockFile;
    })
}));

jest.mock('../../config/api', () => ({
    API_ENDPOINTS: {
        IMAGES: {
            UPLOAD: '/api/images/upload'
        }
    },
    authenticatedFetch: jest.fn()
}));

describe('useImageUpload', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return uploadImage function', () => {
        const { result } = renderHook(() => useImageUpload());
        expect(result.current.uploadImage).toBeDefined();
        expect(typeof result.current.uploadImage).toBe('function');
    });

    it('should return empty string for empty image data', async () => {
        const { result } = renderHook(() => useImageUpload());

        const path = await act(async () => {
            return await result.current.uploadImage('');
        });

        expect(path).toBe('');
    });

    it('should return empty string for null image data', async () => {
        const { result } = renderHook(() => useImageUpload());

        const path = await act(async () => {
            return await result.current.uploadImage(null);
        });

        expect(path).toBe('');
    });

    it('should return file path as-is if it matches FILE_PATH_REGEX', async () => {
        const { result } = renderHook(() => useImageUpload());
        const filePath = '/path/to/image.txt';

        const path = await act(async () => {
            return await result.current.uploadImage(filePath);
        });

        expect(path).toBe(filePath);
    });

    it('should upload data URL and return path from server', async () => {
        const { authenticatedFetch } = require('../../config/api');
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ path: '/uploads/image123.jpg' })
        };
        authenticatedFetch.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useImageUpload());
        const dataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDA...';

        const path = await act(async () => {
            return await result.current.uploadImage(dataURL);
        });

        expect(authenticatedFetch).toHaveBeenCalledWith(
            '/api/images/upload',
            expect.objectContaining({
                method: 'POST',
                headers: { accept: 'application/json' },
                body: expect.any(FormData)
            })
        );
        expect(path).toBe('/uploads/image123.jpg');
    });

    it('should throw error if upload fails', async () => {
        const { authenticatedFetch } = require('../../config/api');
        const mockResponse = {
            ok: false,
            status: 500
        };
        authenticatedFetch.mockResolvedValue(mockResponse);

        const { result } = renderHook(() => useImageUpload());
        const dataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDA...';

        await expect(async () => {
            await act(async () => {
                await result.current.uploadImage(dataURL);
            });
        }).rejects.toThrow('Upload failed with status 500');
    });

    it('should handle network errors', async () => {
        const { authenticatedFetch } = require('../../config/api');
        authenticatedFetch.mockRejectedValue(new Error('Network error'));

        const { result } = renderHook(() => useImageUpload());
        const dataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDA...';

        await expect(async () => {
            await act(async () => {
                await result.current.uploadImage(dataURL);
            });
        }).rejects.toThrow('Network error');
    });
});
