import { useState, createContext } from "react";


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);

    const login = (userType) => {
        setIsAuthenticated(true);
        setUserType(userType);
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUserType(null);
        localStorage.removeItem("id");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
    };


    return (
        <DataContext.Provider
            value={{
                isAuthenticated,
                userType,
                login,
                logout
            }}>
            {children}
        </DataContext.Provider>
    )
}