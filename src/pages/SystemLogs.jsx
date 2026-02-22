import React from 'react';

const SystemLogs = () => {
    const logs = [
        { id: 1, type: 'info', message: 'User "john_doe" logged in', time: '2 mins ago' },
        { id: 2, type: 'warning', message: 'Failed login attempt from IP 192.168.1.1', time: '15 mins ago' },
        { id: 3, type: 'success', message: 'New job posted by "TechGlobal"', time: '1 hour ago' },
        { id: 4, type: 'info', message: 'System maintenance scheduled for midnight', time: '3 hours ago' },
    ];

    return (
        <div className="glass-card">
            <h2 style={{ marginBottom: '2rem' }}>System Logs</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {logs.map((log) => (
                    <div key={log.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '1rem',
                        background: 'var(--glass-bg)',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: `4px solid ${log.type === 'error' ? 'var(--danger)' : log.type === 'warning' ? 'var(--warning)' : 'var(--primary)'}`
                    }}>
                        <span>{log.message}</span>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{log.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SystemLogs;
