import { register } from "../services/authService.js";

import { useState, useEffect, createContext } from "react";

export const UserContext = createContext();

export function UserProvider({children}) {
    const [user, setUser] = useState(null);

    // Save user to localStorage
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user');
        }
        
    }, [user]);

    // Load user from localStorage
    useEffect(() => {
        const stored = localStorage.getItem('user');

        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    const registerHandler = async (email, password) => {
        const result = await register(email, password);
        console.log(result);
        setUser(result);
    }

    const contextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler
    }

    return (
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    )
}