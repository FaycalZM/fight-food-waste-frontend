import React from 'react'
import Sidebar from '../global/Sidebar'
import Topbar from '../global/Topbar'
import { Outlet } from 'react-router-dom'

const DashboardLayout = ({ isSidebar, setIsSidebar }) => {
    return (
        <div className="app dashboard-layout">
            <Sidebar isSidebar={isSidebar} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout