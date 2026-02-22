import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobApplicants = () => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchApps = async () => {
            try {
                // In a real app, we'd fetch for a specific job or all jobs of the employer
                // For demo, we fetch all applications (the backend route needs careful filtering)
                const res = await axios.get('http://localhost:5000/api/applications/my', {
                    headers: { 'x-auth-token': localStorage.getItem('token') }
                });
                setApplications(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchApps();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            await axios.patch(`http://localhost:5000/api/applications/${id}/status`, { status }, {
                headers: { 'x-auth-token': localStorage.getItem('token') }
            });
            setApplications(applications.map(app => app._id === id ? { ...app, status } : app));
        } catch {
            alert('Failed to update status');
        }
    };

    return (
        <div className="glass-card">
            <h2>Applications Received</h2>
            <div style={{ marginTop: '2rem', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                            <th style={{ padding: '1rem' }}>Applicant</th>
                            <th style={{ padding: '1rem' }}>Job Role</th>
                            <th style={{ padding: '1rem' }}>Applied Date</th>
                            <th style={{ padding: '1rem' }}>Status</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applications.map(app => (
                            <tr key={app._id} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                                <td style={{ padding: '1rem' }}>{app.student?.name || 'Student Name'}</td>
                                <td style={{ padding: '1rem' }}>{app.job?.title}</td>
                                <td style={{ padding: '1rem' }}>{new Date(app.appliedOn).toLocaleDateString()}</td>
                                <td style={{ padding: '1rem' }}>
                                    <span style={{
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '20px',
                                        fontSize: '0.8rem',
                                        background: app.status === 'offered' ? 'var(--success)' : app.status === 'rejected' ? 'var(--danger)' : 'var(--primary)'
                                    }}>
                                        {app.status}
                                    </span>
                                </td>
                                <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                                    <button onClick={() => updateStatus(app._id, 'interviewing')} className="btn btn-glass" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem' }}>Shortlist</button>
                                    <button onClick={() => updateStatus(app._id, 'offered')} className="btn btn-glass" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: 'var(--success)' }}>Offer</button>
                                    <button onClick={() => updateStatus(app._id, 'rejected')} className="btn btn-glass" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', color: 'var(--danger)' }}>Reject</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {applications.length === 0 && !loading && <p style={{ textAlign: 'center', padding: '2rem' }}>No applications found.</p>}
            </div>
        </div>
    );
};

export default JobApplicants;
