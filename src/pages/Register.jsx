import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState('');

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'password') {
            checkPasswordStrength(e.target.value);
        }
    };

    const checkPasswordStrength = (pass) => {
        if (pass.length === 0) setPasswordStrength('');
        else if (pass.length < 6) setPasswordStrength('Weak');
        else if (pass.match(/[a-zA-Z]/) && pass.match(/[0-9]/) && pass.length >= 8) setPasswordStrength('Strong');
        else setPasswordStrength('Medium');
    };

    const getStrengthColor = () => {
        if (passwordStrength === 'Weak') return 'var(--danger)';
        if (passwordStrength === 'Medium') return 'var(--warning)';
        if (passwordStrength === 'Strong') return 'var(--success)';
        return 'transparent';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Simulate network delay
        setTimeout(() => {
            try {
                const mockUser = {
                    id: 'mock-' + Math.random().toString(36).substr(2, 9),
                    ...formData
                };

                login(mockUser, 'mock-token-' + Date.now());
                navigate('/dashboard');
            } catch {
                setError('Registration failed. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 1500);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ width: '100%', maxWidth: '450px' }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>Create Account</h2>

                {error && (
                    <div style={{
                        background: 'rgba(239, 68, 68, 0.1)',
                        border: '1px solid var(--danger)',
                        color: 'var(--danger)',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        marginBottom: '1rem',
                        textAlign: 'center'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

                    <div>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Full Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                        />
                    </div>

                    <div>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                        />

                        {/* Real-time Password Strength Indicator */}
                        {passwordStrength && (
                            <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                                <span style={{ color: 'var(--text-secondary)' }}>Strength:</span>
                                <span style={{
                                    color: getStrengthColor(),
                                    fontWeight: 'bold',
                                    padding: '0.1rem 0.4rem',
                                    borderRadius: '4px',
                                    background: 'rgba(255,255,255,0.05)'
                                }}>
                                    {passwordStrength}
                                </span>
                            </div>
                        )}
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                            Use 8+ characters with letters and numbers.
                        </p>
                    </div>

                    <div>
                        <label htmlFor="role" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Select Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            style={{ padding: '0.8rem', width: '100%', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.05)', color: 'white' }}
                        >
                            <option value="student" style={{ color: 'black' }}>Student</option>
                            <option value="employer" style={{ color: 'black' }}>Employer</option>
                            <option value="officer" style={{ color: 'black' }}>Teacher / Placement Officer</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            marginTop: '0.5rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem',
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link to="/login" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Login</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
