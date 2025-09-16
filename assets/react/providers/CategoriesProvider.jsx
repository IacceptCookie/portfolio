import React, {useContext, createContext, useState, useEffect} from "react";
import {fetchCategories} from "../services/api/Categories";

const CategoriesContext = createContext(null);

function CategoriesProvider({ children }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchCategories().then((response) => setCategories(response));
    }, [])

    return (
        <CategoriesContext.Provider value={categories}>
            {children}
        </CategoriesContext.Provider>
    );
}

export default CategoriesProvider;
export const useCategories = () => useContext(CategoriesContext);