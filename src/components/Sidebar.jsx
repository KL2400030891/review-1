import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
    const { user } = useAuth();
    const location = useLocation();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close sidebar on route change for mobile
    useEffect(() => {
        if (isMobile) onClose();
    }, [location.pathname, isMobile, onClose]);

    const getLinks = () => {
        switch (user?.role) {
            case 'student':
                return [
                    { name: 'Dashboard', path: '/dashboard' },
                    { name: 'Jobs', path: '/jobs' },
                    { name: 'My Applications', path: '/applications' },
                    { name: 'Profile', path: '/profile' }
                ];
            case 'employer':
                return [
                    { name: 'Dashboard', path: '/dashboard' },
                    { name: 'Post a Job', path: '/post-job' },
                    { name: 'Applicants', path: '/applicants' }
                ];
            case 'officer':
                return [
                    { name: 'Dashboard', path: '/dashboard' },
                    { name: 'Placement Stats', path: '/stats' },
                    { name: 'User Management', path: '/users' }
                ];
            case 'admin':
                return [
                    { name: 'Dashboard', path: '/dashboard' },
                    { name: 'System Logs', path: '/logs' },
                    { name: 'Config', path: '/config' }
                ];
            default:
                return [];
        }
    };

    const sidebarContent = (
        <aside className="glass-card sidebar" style={{
            height: '100%',
            margin: isMobile ? 0 : '1rem',
            padding: '2rem 1rem',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div style={{ marginBottom: '2rem', textAlign: 'center', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ color: 'var(--text-secondary)' }}>{user?.role?.toUpperCase()}</h3>
                {isMobile && (
                    <button onClick={onClose} className="btn btn-glass" style={{ padding: '0.4rem' }}>
                        ✕
                    </button>
                )}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {getLinks().map(link => (
                    <NavLink
                        key={link.path}
                        to={link.path}
                        style={({ isActive }) => ({
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            textDecoration: 'none',
                            color: isActive ? 'white' : 'var(--text-secondary)',
                            background: isActive ? 'var(--primary)' : 'transparent',
                            transition: 'var(--transition)',
                            display: 'block'
                        })}
                    >
                        {link.name}
                    </NavLink>
                ))}
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            {!isMobile && (
                <div style={{ height: '100vh', position: 'sticky', top: 0 }}>
                    {sidebarContent}
                </div>
            )}

            {/* Mobile Sidebar */}
            {isMobile && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: '280px',
                    zIndex: 50,
                    transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out',
                    background: 'var(--background)'
                }}>
                    {sidebarContent}
                </div>
            )}
        </>
    );
};

export default Sidebar;
