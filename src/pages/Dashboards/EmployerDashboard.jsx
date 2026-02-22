import React from 'react';
import { motion } from 'framer-motion';

const EmployerDashboard = () => {
    // Basic stats for employer
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <motion.div className="glass-card" initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
                <h3>Welcome back!</h3>
                <p style={{ color: 'var(--text-secondary)', marginTop: '1rem' }}>
                    Manage your job listings and track applicants from here.
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                    <div className="glass-card" style={{ flex: 1, textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--primary)' }}>5</h2>
                        <p>Active Jobs</p>
                    </div>
                    <div className="glass-card" style={{ flex: 1, textAlign: 'center' }}>
                        <h2 style={{ color: 'var(--secondary)' }}>12</h2>
                        <p>New Applicants</p>
                    </div>
                </div>
            </motion.div>

            <div className="glass-card">
                <h3>Quick Actions</h3>
                <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <button className="btn btn-glass" style={{ justifyContent: 'flex-start' }}>View All Listings</button>
                    <button className="btn btn-glass" style={{ justifyContent: 'flex-start' }}>Review Pending Applications</button>
                    <button className="btn btn-glass" style={{ justifyContent: 'flex-start' }}>Update Company Profile</button>
                </div>
            </div>
        </div>
    );
};

export default EmployerDashboard;
