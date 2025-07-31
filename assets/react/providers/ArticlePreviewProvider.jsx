import { createContext, useContext, useState } from "react";

const ArticlePreviewContext = createContext(null);

function ArticlePreviewProvider({ children }) {
    const [contextArticle, setContextArticle] = useState(null);

    return (
        <ArticlePreviewContext.Provider value={{ contextArticle, setContextArticle }}>
            {children}
        </ArticlePreviewContext.Provider>
    );
}


export default ArticlePreviewProvider;
export const useArticlePreview = () => useContext(ArticlePreviewContext);