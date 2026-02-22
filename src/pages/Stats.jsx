import React from 'react';
import { motion } from 'framer-motion';
import { mockStats } from '../data/mockData';

const Stats = () => {
    return (
        <div className="glass-card">
            <h2 style={{ marginBottom: '2rem' }}>Placement Statistics</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
                {mockStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card"
                        style={{ textAlign: 'center', borderTop: `4px solid ${stat.color}` }}
                    >
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{stat.label}</p>
                        <h2 style={{ color: stat.color }}>{stat.value}</h2>
                    </motion.div>
                ))}
            </div>

            <div className="glass-card">
                <h3>Regional Performance</h3>
                <div style={{ marginTop: '2rem', height: '200px', display: 'flex', alignItems: 'flex-end', gap: '1rem' }}>
                    {[60, 80, 45, 90, 70].map((height, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                            <motion.div
                                initial={{ height: 0 }}
                                animate={{ height: `${height}%` }}
                                style={{ width: '100%', background: 'var(--primary)', borderRadius: '4px 4px 0 0' }}
                            />
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Region {i + 1}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Stats;
