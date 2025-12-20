import React, {useContext, createContext, useState} from "react";

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [roles, setRoles] = useState([]);

    const fetchUser = async () => {
        try {
            const csrfToken = sessionStorage.getItem("csrf_token");

            const res = await fetch("/api/me", {
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    ...(csrfToken ? { "X-CSRF-Token": csrfToken } : {}),
                },
            });

            const data = await res.json();
            if (res.ok) {
                setRoles(data.roles || []);
            } else {
                setRoles([]);
            }
        } catch (error) {
            setRoles([]);
        }
    };

    const hasRole = (role) => roles.includes(role);

    return (
        <AuthContext.Provider value={{ roles, hasRole, fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);