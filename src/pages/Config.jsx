import React from 'react';

const Config = () => {
    return (
        <div className="glass-card">
            <h2 style={{ marginBottom: '2rem' }}>System Configuration</h2>
            <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-card">
                    <h3>General Settings</h3>
                    <div style={{ marginTop: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Platform Name</label>
                        <input type="text" defaultValue="Placement Interaction System" />
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Admin Email</label>
                        <input type="email" defaultValue="admin@fis.com" />
                    </div>
                </div>

                <div className="glass-card">
                    <h3>Maintenance Mode</h3>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                        <span>Enable Maintenance Mode</span>
                        <button className="btn btn-glass">Switch</button>
                    </div>
                </div>

                <button className="btn btn-primary">Save Changes</button>
            </div>
        </div>
    );
};

export default Config;
