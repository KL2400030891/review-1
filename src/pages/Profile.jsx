import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '2rem' }}>
                    <div style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'linear-gradient(45deg, var(--primary), var(--secondary))',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '3rem'
                    }}>
                        {user?.name?.charAt(0)}
                    </div>
                    <div>
                        <h1 style={{ fontSize: '2.5rem' }}>{user?.name}</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem' }}>{user?.role?.toUpperCase()} | {user?.email}</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                    <div className="glass-card">
                        <h3>Academic Background</h3>
                        <div style={{ marginTop: '1rem' }}>
                            <p><strong>CGPA:</strong> 8.5/10</p>
                            <p><strong>Branch:</strong> Computer Science</p>
                            <p><strong>Graduation Year:</strong> 2025</p>
                        </div>
                    </div>
                    <div className="glass-card">
                        <h3>Skills & Portfolio</h3>
                        <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {['React', 'Node.js', 'MongoDB', 'Python', 'AWS'].map(skill => (
                                <span key={skill} style={{ padding: '0.25rem 0.75rem', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '20px', fontSize: '0.9rem' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <button className="btn btn-primary" style={{ marginTop: '2rem', width: '100%' }}>Edit Profile</button>
            </motion.div>
        </div>
    );
};

export default Profile;
