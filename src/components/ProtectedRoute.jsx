import React from 'react'
import { Navigate } from 'react-router'
const ProtectedRoute = ({ isAuthenticated, role, userType, children }) => {
    if (!isAuthenticated || (userType !== role)) {
        return <Navigate to={`/${role}/login`} />
    }
    // user is authenticated & authorized
    return children
}

export default ProtectedRoute