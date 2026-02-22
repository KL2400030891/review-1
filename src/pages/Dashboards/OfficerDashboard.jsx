import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, color }) => (
    <div className="glass-card" style={{ textAlign: 'center' }}>
        <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{title}</h4>
        <h2 style={{ color }}>{value}</h2>
    </div>
);

const OfficerDashboard = () => {
    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Teacher / Placement Officer Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard title="Total Students" value="1,240" color="var(--primary)" />
                <StatCard title="Placed" value="856" color="var(--success)" />
                <StatCard title="Unplaced" value="384" color="var(--danger)" />
                <StatCard title="Avg. Package" value="$12 LPA" color="var(--warning)" />
            </div>

            <div className="glass-card">
                <h3>Placement Status by Branch</h3>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {[
                        { name: 'CSE', pct: 85 },
                        { name: 'ECE', pct: 72 },
                        { name: 'MECH', pct: 64 },
                        { name: 'CIVIL', pct: 60 }
                    ].map(branch => (
                        <div key={branch.name}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                <span>{branch.name}</span>
                                <span>{branch.pct}%</span>
                            </div>
                            <div style={{ background: 'var(--glass-bg)', height: '8px', borderRadius: '4px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${branch.pct}%` }}
                                    style={{ background: 'var(--primary)', height: '100%' }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OfficerDashboard;
