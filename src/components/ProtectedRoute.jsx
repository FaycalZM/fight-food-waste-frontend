import React, { useContext } from 'react'
import { Navigate } from 'react-router'
import { DataContext } from '@/context/DataContext'

const ProtectedRoute = ({ role, children }) => {
    const { isAuthenticated, userType } = useContext(DataContext);

    if (!isAuthenticated || (userType !== role)) {
        return <Navigate to={`/${role}/login`} />
    }
    // user is authenticated & authorized
    return children
}

export default ProtectedRoute