/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Temporary bypass: Added a default mock user
    const getInitialUser = () => {
        try {
            const saved = localStorage.getItem('user');
            return saved && saved !== 'undefined' ? JSON.parse(saved) : {
                id: 'mock-123',
                name: 'Default Student',
                email: 'student@university.edu',
                role: 'student'
            };
        } catch {
            return {
                id: 'mock-123',
                name: 'Default Student',
                email: 'student@university.edu',
                role: 'student'
            };
        }
    };

    const [user, setUser] = useState(getInitialUser());
    const [token, setToken] = useState(localStorage.getItem('token') || 'mock-token-123');

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
