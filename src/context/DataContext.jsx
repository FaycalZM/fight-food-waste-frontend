import apiUrl from "@/base";
import axios from "axios";
import { useState, createContext, useEffect } from "react";


const merchantsInitialState = {
    pending: [],
    active: [],
    expired: []
}


export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    // Auth state
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userType, setUserType] = useState(null);

    // Merchants state
    const [merchants, setMerchants] = useState(merchantsInitialState);
    useEffect(() => {
        axios
            .get(`${apiUrl}/admin/all_merchants`)
            .then((res) => {
                setMerchants({
                    pending: res.data.filter((merchant) => merchant.membership_status === "pending"),
                    active: res.data.filter((merchant) => merchant.membership_status === "active"),
                    expired: res.data.filter((merchant) => merchant.membership_status === "expired"),
                })
            })
    }, []);

    // Auth functions
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
                logout,
                merchants,
                setMerchants,
            }}>
            {children}
        </DataContext.Provider>
    )
}