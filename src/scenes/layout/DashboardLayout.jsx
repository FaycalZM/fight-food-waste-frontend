import React from 'react'
import Sidebar from '../global/Sidebar'
import Topbar from '../global/Topbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = ({ userType }) => {
    return (
        <div className="app dashboard-layout">
            <Sidebar userType={userType} />
            <main className="content">
                <Topbar />
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout