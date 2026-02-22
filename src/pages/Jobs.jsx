import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { mockJobs } from '../data/mockData';

const Jobs = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = mockJobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.companyName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="glass-card">
            <h2 style={{ marginBottom: '1.5rem' }}>Find Your Dream Job</h2>
            <div style={{ marginBottom: '2rem' }}>
                <input
                    type="text"
                    placeholder="Search jobs or companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="glass-input"
                />
            </div>

            <div style={{ display: 'grid', gap: '1.5rem' }}>
                {filteredJobs.map(job => (
                    <motion.div
                        key={job.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass-card"
                        style={{ borderLeft: '4px solid var(--primary)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ color: 'var(--primary)' }}>{job.title}</h3>
                                <p style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{job.companyName}</p>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{job.location} • {job.salary}</p>
                            </div>
                            <span style={{
                                padding: '0.25rem 0.75rem',
                                background: 'var(--glass-bg)',
                                borderRadius: '20px',
                                fontSize: '0.8rem',
                                border: '1px solid var(--glass-border)'
                            }}>
                                {job.category}
                            </span>
                        </div>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>{job.description}</p>
                        <div style={{ marginTop: '1.5rem' }}>
                            <button className="btn btn-primary">Apply Now</button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Jobs;
