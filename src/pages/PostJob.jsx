import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const PostJob = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        companyName: '',
        location: '',
        salary: '',
        requirements: '',
        roleType: 'Full-time'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(`${apiUrl}/api/jobs`,
                { ...formData, requirements: formData.requirements.split(',') },
                { headers: { 'x-auth-token': localStorage.getItem('token') } }
            );
            alert('Job posted successfully!');
            setFormData({
                title: '', description: '', companyName: '', location: '', salary: '', requirements: '', roleType: 'Full-time'
            });
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to post job');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card">
                <h2>Post a New Job Opportunity</h2>
                <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
                    <input
                        placeholder="Job Title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Company Name"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Salary Range"
                        value={formData.salary}
                        onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    />
                    <select value={formData.roleType} onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}>
                        <option value="Full-time">Full-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select>
                    <textarea
                        placeholder="Job Description"
                        rows="4"
                        style={{ width: '100%', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', color: 'white', marginBottom: '1rem' }}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                    />
                    <input
                        placeholder="Requirements (comma separated)"
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    />
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Post Job</button>
                </form>
            </motion.div>
        </div>
    );
};

export default PostJob;
