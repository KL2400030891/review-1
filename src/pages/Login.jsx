import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    // Real-time email validation
    useEffect(() => {
        if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Please enter a valid email address.');
        } else {
            setEmailError('');
        }
    }, [email]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (emailError) {
            setError('Please fix the errors before submitting.');
            return;
        }

        setLoading(true);

        // Simulate network delay to show loading state
        setTimeout(() => {
            try {
                const mockUser = {
                    id: 'mock-' + Math.random().toString(36).substr(2, 9),
                    name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
                    email: email,
                    role: role
                };

                // In a real app, we would use 'rememberMe' to set persistent storage vs session storage
                if (rememberMe) {
                    localStorage.setItem('remembered_email', email);
                }

                login(mockUser, 'mock-token-' + Date.now());
                navigate('/dashboard');
            } catch {
                setError('Login failed. Please try again.');
            } finally {
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '1rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card"
                style={{ width: '100%', maxWidth: '400px' }}
            >
                <h2 style={{ textAlign: 'center', marginBottom: '0.5rem', fontSize: '2rem' }}>Welcome Back</h2>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Please enter your details to sign in.</p>

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

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

                    <div>
                        <label htmlFor="role" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>I am a...</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            disabled={loading}
                            style={{
                                padding: '0.8rem',
                                borderRadius: '4px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                width: '100%',
                                cursor: 'pointer'
                            }}
                        >
                            <option value="student" style={{ color: 'black' }}>Student</option>
                            <option value="employer" style={{ color: 'black' }}>Employer / Recruiter</option>
                            <option value="officer" style={{ color: 'black' }}>Teacher / Placement Officer</option>
                            <option value="admin" style={{ color: 'black' }}>Administrator</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email Address</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={emailError ? "true" : "false"}
                            style={{
                                padding: '0.8rem',
                                borderRadius: '4px',
                                border: `1px solid ${emailError ? 'var(--danger)' : 'rgba(255,255,255,0.2)'}`,
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                width: '100%'
                            }}
                        />
                        {emailError && <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.25rem', display: 'block' }}>{emailError}</span>}
                    </div>

                    <div style={{ position: 'relative' }}>
                        <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Password</label>
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                padding: '0.8rem',
                                borderRadius: '4px',
                                border: '1px solid rgba(255,255,255,0.2)',
                                background: 'rgba(255,255,255,0.05)',
                                color: 'white',
                                width: '100%'
                            }}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '38px',
                                background: 'transparent',
                                border: 'none',
                                color: 'var(--text-secondary)',
                                cursor: 'pointer',
                                fontSize: '0.8rem'
                            }}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{ width: 'auto', margin: 0 }}
                            />
                            Remember me
                        </label>
                        <Link to="/forgot-password" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Forgot Password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading || !!emailError}
                        style={{
                            width: '100%',
                            padding: '0.8rem',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '0.5rem',
                            opacity: (loading || !!emailError) ? 0.7 : 1,
                            cursor: (loading || !!emailError) ? 'not-allowed' : 'pointer',
                            marginTop: '0.5rem'
                        }}
                    >
                        {loading ? (
                            <>
                                <span style={{
                                    width: '16px',
                                    height: '16px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTop: '2px solid white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite',
                                    display: 'inline-block'
                                }}></span>
                                Signing In...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </form>
                <p style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)' }}>
                    Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Register</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
