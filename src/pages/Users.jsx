import React from 'react';
import { motion } from 'framer-motion';
import { mockUsers } from '../data/mockData';

const Users = () => {
    return (
        <div className="glass-card">
            <h2 style={{ marginBottom: '2rem' }}>User Management</h2>
            <div className="glass-card" style={{ padding: '0' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ background: 'var(--glass-bg)', textAlign: 'left' }}>
                            <th style={{ padding: '1.25rem' }}>Name</th>
                            <th style={{ padding: '1.25rem' }}>Email</th>
                            <th style={{ padding: '1.25rem' }}>Role</th>
                            <th style={{ padding: '1.25rem' }}>Status</th>
                            <th style={{ padding: '1.25rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mockUsers.map((user, index) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.05 }}
                                style={{ borderBottom: '1px solid var(--glass-border)' }}
                            >
                                <td style={{ padding: '1.25rem' }}>{user.name}</td>
                                <td style={{ padding: '1.25rem' }}>{user.email}</td>
                                <td style={{ padding: '1.25rem' }}>
                                    <span style={{ textTransform: 'capitalize' }}>{user.role}</span>
                                </td>
                                <td style={{ padding: '1.25rem' }}>
                                    <span style={{
                                        color: user.status === 'Active' ? 'var(--success)' : 'var(--warning)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <span style={{
                                            width: '8px',
                                            height: '8px',
                                            borderRadius: '50%',
                                            background: user.status === 'Active' ? 'var(--success)' : 'var(--warning)'
                                        }} />
                                        {user.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1.25rem' }}>
                                    <button className="btn btn-glass" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Edit</button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
