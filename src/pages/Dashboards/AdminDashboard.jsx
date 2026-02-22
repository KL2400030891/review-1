import React from 'react';

const AdminDashboard = () => {
    return (
        <div style={{ display: 'grid', gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-card">
                    <h4>Total Users</h4>
                    <h2 style={{ color: 'var(--primary)' }}>1,500+</h2>
                </div>
                <div className="glass-card">
                    <h4>Registered Employers</h4>
                    <h2 style={{ color: 'var(--secondary)' }}>45</h2>
                </div>
                <div className="glass-card">
                    <h4>Active Job Posts</h4>
                    <h2 style={{ color: 'var(--success)' }}>128</h2>
                </div>
            </div>

            <div className="glass-card">
                <h3>User Management Quick Actions</h3>
                <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <button className="btn btn-glass">Approve Employers</button>
                    <button className="btn btn-glass">Audit System Logs</button>
                    <button className="btn btn-glass">Configure Deadlines</button>
                    <button className="btn btn-glass">Export All Data</button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
