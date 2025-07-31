import React, {useContext, createContext} from "react";

const ElementTypesContext = createContext(null);

function ElementTypesProvider({ children }) {
    const types = ['paragraph', 'picture', 'video', 'title', 'link', 'quote'];

    return (
        <ElementTypesContext.Provider value={types}>
            {children}
        </ElementTypesContext.Provider>
    );
}

export default ElementTypesProvider;
export const useElementTypes = () => useContext(ElementTypesContext);