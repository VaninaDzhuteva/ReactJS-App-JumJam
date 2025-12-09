import usePersistedState from "../hooks/usePersistedState.js";
import { login, logout, register } from "../services/authService.js";
import { createContext, useContext } from "react";

export const UserContext = createContext({
    isAuthenticated: false,
    user: {
        email: '',
        password: '',
        _createdOn: 0,
        _id: '',
        accessToken: '',
    },
    registerHandler() { },
    loginHandler() { },
    logoutHandler() { },
});

export function UserProvider({children}) {
    const [user, setUser] = usePersistedState(null, 'user');

    // Register
    const registerHandler = async (email, password) => {
        const result = await register(email, password);
        setUser(result);
    }

    // Login
    const loginHandler = async(email, password) => {
        const result = await login(email, password);
        setUser(result);
    }

    // Logout
    const logoutHandler = async () => {
        if (user.accessToken) {
            await logout(user.accessToken);
        } 

        setUser(null);
    }

    const userContextValues = {
        user,
        isAuthenticated: !!user?.accessToken,
        registerHandler,
        loginHandler,
        logoutHandler
    }

    return (
        <UserContext.Provider value={userContextValues}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserContext() {
    const contextData = useContext(UserContext);

    return contextData;
}

export default UserContext;