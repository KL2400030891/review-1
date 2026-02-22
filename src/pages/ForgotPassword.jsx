import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            if (email.includes('@')) {
                setStatus('success');
            } else {
                setStatus('error');
            }
        }, 1500);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Reset Password</h2>
                    <p style={{ color: 'var(--text-secondary)' }}>Enter your email to receive recovery instructions.</p>
                </div>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{ textAlign: 'center', padding: '2rem 1rem' }}
                    >
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'rgba(16, 185, 129, 0.1)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1.5rem',
                            color: 'var(--success)',
                            fontSize: '1.5rem'
                        }}>✓</div>
                        <h3 style={{ marginBottom: '1rem' }}>Check your email</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            We have sent a password reset link to <strong>{email}</strong>.
                        </p>
                        <Link to="/login" className="btn btn-primary" style={{ width: '100%', textDecoration: 'none' }}>
                            Return to Login
                        </Link>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Email Address</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                style={{
                                    padding: '0.75rem',
                                    width: '100%',
                                    borderRadius: 'var(--radius-sm)',
                                    border: status === 'error' ? '1px solid var(--danger)' : '1px solid var(--glass-border)',
                                    background: 'var(--glass-bg)',
                                    color: 'white'
                                }}
                            />
                            {status === 'error' && (
                                <p style={{ color: 'var(--danger)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                    Please enter a valid email address.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={status === 'loading'}
                            style={{
                                width: '100%',
                                padding: '0.8rem',
                                opacity: status === 'loading' ? 0.7 : 1,
                                cursor: status === 'loading' ? 'not-allowed' : 'pointer'
                            }}
                        >
                            {status === 'loading' ? 'Sending Link...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}

                {status !== 'success' && (
                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.9rem' }}>
                            ← Back to Login
                        </Link>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default ForgotPassword;
