import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '2rem'
        }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ maxWidth: '500px' }}
            >
                <h1 style={{ fontSize: '4rem', color: 'var(--primary)', marginBottom: '1rem' }}>404</h1>
                <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link to="/dashboard" className="btn btn-primary">
                    Return to Dashboard
                </Link>
            </motion.div>
        </div>
    );
};

export default NotFound;
