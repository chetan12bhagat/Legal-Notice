'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [role, setRole] = useState('user'); // user or lawyer
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = { email, role, name: email.split('@')[0] };
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/';
    }, 1500);
  };

  return (
    <div className="login-wrapper">
      <div className="grid-overlay"></div>
      <div className="login-card animate-fade">
        <div className="login-header">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="var(--accent)">
              <path d="M12 3L4 9v2c0 5.25 3.41 10.19 8 11.5 4.59-1.31 8-6.25 8-11.5V9l-8-6zm0 2.18l6 4.5v1.32c0 4.28-2.67 8.31-6 9.5-3.33-1.19-6-5.22-6-9.5V9.68l6-4.5zM11 7v2h2V7h-2zm0 4v6h2v-6h-2z"/>
            </svg>
          </div>
          <h2 style={{ marginBottom: '0.5rem', color: 'white' }}>Welcome to Nyay</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>
            {step === 1 ? "Enter your email to access your account" : "Enter the verification code sent to your email"}
          </p>
        </div>

        {step === 1 && (
          <div className="role-selector" style={{ display: 'flex', padding: '0.5rem', borderRadius: '12px', marginBottom: '2rem' }}>
            <button 
              className={role === 'user' ? 'active' : ''} 
              onClick={() => setRole('user')}
              style={{
                flex: 1, padding: '0.8rem', borderRadius: '8px', 
                fontWeight: 600
              }}
            >
              For Clients
            </button>
            <button 
              className={role === 'lawyer' ? 'active' : ''} 
              onClick={() => setRole('lawyer')}
              style={{
                flex: 1, padding: '0.8rem', borderRadius: '8px', 
                fontWeight: 600
              }}
            >
              For Lawyers
            </button>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="login-form">
            <div className="login-input-group" style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: '#94a3b8' }}>Email Address</label>
              <input 
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Continue'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <div className="login-input-group" style={{ textAlign: 'left' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 700, color: '#94a3b8' }}>Verification Code</label>
              <input 
                type="text" 
                placeholder="0 0 0 0" 
                maxLength={4}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
                style={{ textAlign: 'center', letterSpacing: '1rem', fontSize: '1.5rem' }}
              />
            </div>
            <button type="submit" className="login-submit-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <button type="button" className="back-btn" onClick={() => setStep(1)} style={{ marginTop: '1rem', background: 'transparent', color: 'var(--text-light)', width: '100%' }}>
              ← Back to email
            </button>
          </form>
        )}
        
        <p style={{ marginTop: '2rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
          By continuing, you agree to our <span style={{ color: 'var(--accent)', fontWeight: 700 }}>Terms of Service</span>
        </p>
      </div>
    </div>
  );
}
