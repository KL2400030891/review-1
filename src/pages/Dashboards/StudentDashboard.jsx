import { useState } from 'react';
import { motion } from 'framer-motion';
import { mockJobs } from '../../data/mockData';

const JobCard = ({ job, onApply }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="glass-card"
        style={{ marginBottom: '1rem' }}
    >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
                <h3 style={{ color: 'var(--primary)' }}>{job.title}</h3>
                <p style={{ fontWeight: '600' }}>{job.companyName}</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{job.location} | {job.salary}</p>
            </div>
            <button onClick={() => onApply(job.id)} className="btn btn-primary">Apply Now</button>
        </div>
        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1rem' }}>
            <p style={{ fontSize: '0.9rem' }}>{job.description}</p>
        </div>
    </motion.div>
);

const StudentDashboard = () => {
    const [jobs] = useState(mockJobs);
    const [loading] = useState(false);

    const handleApply = async (_jobId) => {
        alert('Application successful! (Mock Mode)');
    };

    return (
        <div>
            <h2 style={{ marginBottom: '2rem' }}>Available Job Opportunities</h2>
            {loading ? (
                <p>Loading jobs...</p>
            ) : (
                <div style={{ display: 'grid', gap: '1rem' }}>
                    {jobs.map(job => (
                        <JobCard key={job.id} job={job} onApply={handleApply} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default StudentDashboard;
