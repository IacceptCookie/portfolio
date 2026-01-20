import React from 'react';
import { render, screen, act, renderHook } from '@testing-library/react';
import ArticlePreviewProvider, { useArticlePreview } from '../ArticlePreviewProvider';

const TestComponent = ({ onMount }) => {
    const { contextArticle, setContextArticle } = useArticlePreview();

    React.useEffect(() => {
        if (onMount) onMount({ contextArticle, setContextArticle });
    }, []);

    return (
        <div>
            <div data-testid="article-title">{contextArticle?.title || 'No article'}</div>
            <button onClick={() => setContextArticle({ title: 'Test Article', id: 1 })}>
                Set Article
            </button>
            <button onClick={() => setContextArticle(null)}>Clear Article</button>
        </div>
    );
};

describe('ArticlePreviewProvider', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('should initialize with null article', () => {
        render(
            <ArticlePreviewProvider>
                <TestComponent />
            </ArticlePreviewProvider>
        );

        expect(screen.getByTestId('article-title')).toHaveTextContent('No article');
    });

    it('should initialize from sessionStorage if available', () => {
        const article = { title: 'Saved Article', id: 123 };
        sessionStorage.setItem('article', JSON.stringify(article));

        render(
            <ArticlePreviewProvider>
                <TestComponent />
            </ArticlePreviewProvider>
        );

        expect(screen.getByTestId('article-title')).toHaveTextContent('Saved Article');
    });

    it('should handle invalid JSON in sessionStorage', () => {
        sessionStorage.setItem('article', 'invalid json');
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(
            <ArticlePreviewProvider>
                <TestComponent />
            </ArticlePreviewProvider>
        );

        expect(screen.getByTestId('article-title')).toHaveTextContent('No article');
        expect(consoleSpy).toHaveBeenCalled();

        consoleSpy.mockRestore();
    });

    it('should update context and sessionStorage when article is set', () => {
        render(
            <ArticlePreviewProvider>
                <TestComponent />
            </ArticlePreviewProvider>
        );

        act(() => {
            screen.getByText('Set Article').click();
        });

        expect(screen.getByTestId('article-title')).toHaveTextContent('Test Article');
        const stored = JSON.parse(sessionStorage.getItem('article'));
        expect(stored).toEqual({ title: 'Test Article', id: 1 });
    });

    it('should clear context and sessionStorage when article is set to null', () => {
        const article = { title: 'Saved Article', id: 123 };
        sessionStorage.setItem('article', JSON.stringify(article));

        render(
            <ArticlePreviewProvider>
                <TestComponent />
            </ArticlePreviewProvider>
        );

        expect(screen.getByTestId('article-title')).toHaveTextContent('Saved Article');

        act(() => {
            screen.getByText('Clear Article').click();
        });

        expect(screen.getByTestId('article-title')).toHaveTextContent('No article');
        expect(sessionStorage.getItem('article')).toBeNull();
    });

    it('should provide contextArticle and setContextArticle', () => {
        let context;
        const onMount = (ctx) => {
            context = ctx;
        };

        render(
            <ArticlePreviewProvider>
                <TestComponent onMount={onMount} />
            </ArticlePreviewProvider>
        );

        expect(context.contextArticle).toBeNull();
        expect(typeof context.setContextArticle).toBe('function');
    });

    it('should handle storage events from other tabs', () => {
        render(
            <ArticlePreviewProvider>
                <TestComponent />
            </ArticlePreviewProvider>
        );

        expect(screen.getByTestId('article-title')).toHaveTextContent('No article');

        // Simulate storage event from another tab
        const newArticle = { title: 'Article from other tab', id: 999 };
        act(() => {
            const event = new StorageEvent('storage', {
                key: 'article',
                newValue: JSON.stringify(newArticle)
            });
            window.dispatchEvent(event);
        });

        expect(screen.getByTestId('article-title')).toHaveTextContent('Article from other tab');
    });

    it('should handle storage event with null value', () => {
        const article = { title: 'Initial Article', id: 1 };
        sessionStorage.setItem('article', JSON.stringify(article));

        render(
            <ArticlePreviewProvider>
                <TestComponent />
            </ArticlePreviewProvider>
        );

        expect(screen.getByTestId('article-title')).toHaveTextContent('Initial Article');

        // Simulate storage clear from another tab
        act(() => {
            const event = new StorageEvent('storage', {
                key: 'article',
                newValue: null
            });
            window.dispatchEvent(event);
        });

        expect(screen.getByTestId('article-title')).toHaveTextContent('No article');
    });

    it('should ignore storage events for other keys', () => {
        render(
            <ArticlePreviewProvider>
                <TestComponent />
            </ArticlePreviewProvider>
        );

        expect(screen.getByTestId('article-title')).toHaveTextContent('No article');

        // Simulate storage event for different key
        act(() => {
            const event = new StorageEvent('storage', {
                key: 'other-key',
                newValue: 'some value'
            });
            window.dispatchEvent(event);
        });

        expect(screen.getByTestId('article-title')).toHaveTextContent('No article');
    });
});
