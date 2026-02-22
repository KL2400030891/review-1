import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
    const closeSidebar = () => setIsSidebarOpen(false);

    return (
        <div className="dashboard-container">
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Overlay for mobile when sidebar is open */}
            {isSidebarOpen && (
                <div
                    onClick={closeSidebar}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.5)',
                        zIndex: 40,
                        backdropFilter: 'blur(4px)'
                    }}
                    className="mobile-overlay"
                />
            )}

            <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100vh', width: '100%' }}>
                <Navbar onToggleSidebar={toggleSidebar} />
                <main style={{ padding: '1rem', overflowY: 'auto', flex: 1, width: '100%' }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
