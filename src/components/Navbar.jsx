import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = ({ onToggleSidebar }) => {
    const { user, logout } = useAuth();

    return (
        <nav className="glass-card" style={{
            margin: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            borderRadius: 'var(--radius-md)'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                    className="btn btn-glass mobile-only"
                    onClick={onToggleSidebar}
                    style={{ padding: '0.5rem', display: 'none' }} // Hidden by default, shown via CSS media query
                >
                    ☰
                </button>
                <div style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, var(--primary), var(--secondary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    FIS
                </div>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span className="desktop-only">Welcome, {user?.name || 'Guest'}</span>
                {user && (
                    <button onClick={logout} className="btn btn-glass" style={{ padding: '0.5rem 1rem' }}>
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
