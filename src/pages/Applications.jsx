import React from 'react';
import { motion } from 'framer-motion';
import { mockApplications } from '../data/mockData';

const Applications = () => {
    return (
        <div className="glass-card">
            <h2 style={{ marginBottom: '2rem' }}>My Applications</h2>
            <div style={{ display: 'grid', gap: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                            <th style={{ padding: '1rem' }}>Job Title</th>
                            <th style={{ padding: '1rem' }}>Company</th>
                            <th style={{ padding: '1rem' }}>Date Applied</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockApplications.map((app, index) => (
                            <motion.tr
                                key={app.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                            >
                                <td style={{ padding: '1rem' }}>{app.jobTitle}</td>
                                <td style={{ padding: '1rem' }}>{app.companyName}</td>
                                <td style={{ padding: '1rem' }}>{app.date}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '12px',
                                        fontSize: '0.8rem',
                                        background: app.status === 'Interviewing' ? 'var(--primary)' : 'var(--glass-bg)',
                                        border: '1px solid var(--glass-border)'
                                    }}>
                                        {app.status}
                                    </span>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Applications;
