import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        if (token) {
            try {
                const payloadBase64 = token.split(".")[1];

                // Fix padding for base64 decoding
                const base64 = payloadBase64.replace(/-/g, "+").replace(/_/g, "/");
                const decodedPayload = JSON.parse(atob(base64));

                // Adjust depending on your backend role structure
                const roles =
                    decodedPayload.roles ||
                    decodedPayload.authorities ||
                    decodedPayload.role ||
                    [];

                const adminCheck = Array.isArray(roles)
                    ? roles.includes("ADMIN") || roles.includes("ROLE_ADMIN")
                    : roles === "ADMIN" || roles === "ROLE_ADMIN";

                setIsAdmin(adminCheck);
            } catch (err) {
                console.error("Invalid JWT:", err);
                setIsAdmin(false);
            }
        } else {
            setIsAdmin(false);
        }
    }, [token]);

    const login = (newToken) => {
        localStorage.setItem("token", newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ token, isAdmin, login, logout, setToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);