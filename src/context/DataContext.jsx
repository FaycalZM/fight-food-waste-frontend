import apiUrl from "@/base";
import axios from "axios";
import { useState, createContext, useEffect } from "react";


const merchantsInitialState = {
    pending: [],
    active: [],
    expired: []
}
const volunteersInitialState = {
    pending: [],
    active: [],
}

const collectionsInitialState = {
    scheduled: [],
    in_progress: [],
    completed: [],
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
            }).catch((error) => {
                console.log(error);
            })
    }, []);

    // Volunteers state
    const [volunteers, setVolunteers] = useState(volunteersInitialState);
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        // fetch all volunteers
        axios
            .get(`${apiUrl}/admin/all_volunteers`)
            .then((res) => {
                setVolunteers({
                    pending: res.data.filter((volunteer) => volunteer.membership_status === "pending"),
                    active: res.data.filter((volunteer) => volunteer.membership_status === "active"),
                })
            }).catch((error) => {
                console.log(error);
            })
        // fetch all skills
        // Fetch skills
        axios
            .get(`${apiUrl}/admin/all_skills`)
            .then((res) => {
                const fetchedSkills = res.data;
                setSkills(fetchedSkills);

                // Custom logic to update volunteers based on skills
                setVolunteers((prevVolunteers) => {
                    const updatedPending = prevVolunteers.pending.map((volunteer) => {
                        // Example: Add the skill name to each volunteer based on their skill_id
                        const skill = fetchedSkills.find((skill) => skill.id === volunteer.skill_id);
                        return {
                            ...volunteer,
                            skillName: skill ? skill.name : "Unknown", // Add skill name or 'Unknown'
                        };
                    });

                    const updatedActive = prevVolunteers.active.map((volunteer) => {
                        const skill = fetchedSkills.find((skill) => skill.id === volunteer.skill_id);
                        return {
                            ...volunteer,
                            skillName: skill ? skill.name : "Unknown",
                        };
                    });

                    return {
                        pending: updatedPending,
                        active: updatedActive,
                    };
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    // Stocks state
    const [stocks, setStocks] = useState([]);

    useEffect(() => {
        // fetch stocks
        axios
            .get(`${apiUrl}/admin/all_stocks`)
            .then((res) => {
                setStocks(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }, []);

    // Products state
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // fetch products
        axios
            .get(`${apiUrl}/admin/all_products`)
            .then((res) => {
                setProducts(res.data);
            }).catch((error) => {
                console.log(error);
            })
    }, []);

    // Collections state
    const [collections, setCollections] = useState(collectionsInitialState);

    useEffect(() => {
        // fetch collections
        axios
            .get(`${apiUrl}/admin/all_collections`)
            .then((res) => {
                setCollections({
                    scheduled: res.data.filter((collection) => collection.collection_status === "Scheduled"),
                    in_progress: res.data.filter((collection) => collection.collection_status === "In Progress"),
                    completed: res.data.filter((collection) => collection.collection_status === "Completed"),
                });
            }).catch((error) => {
                console.log(error);
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
                volunteers,
                stocks,
                products,
                collections,
                setMerchants,
                setVolunteers,
                setStocks,
                setProducts,
                setCollections,
            }}>
            {children}
        </DataContext.Provider>
    )
}