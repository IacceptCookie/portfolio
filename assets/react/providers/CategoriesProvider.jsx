import React, {useContext, createContext} from "react";

const CategoriesContext = createContext(null);

function CategoriesProvider({ children }) {
    const categories = ['article', 'projet'];

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    );
}

export default CategoriesProvider;
export const useCategories = () => useContext(CategoriesContext);