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
      <div className="login-card animate-fade">
        <div className="login-header">
          <img src="/images/logo.png" alt="Legal Notice" className="login-logo" style={{filter: 'brightness(0) invert(1)'}} />
          <h2 style={{color: 'white', marginBottom: '1rem'}}>Welcome to Legal Notice</h2>
          <p style={{color: 'var(--text-light)', marginBottom: '2rem'}}>
            {step === 1 ? "Secure access to your legal dashboard" : "Verify your identity"}
          </p>
        </div>

        {step === 1 && (
          <div className="role-selector" style={{display: 'flex', background: 'rgba(0,0,0,0.3)', padding: '0.5rem', borderRadius: '12px', marginBottom: '2rem'}}>
            <button 
              className={role === 'user' ? 'active' : ''} 
              onClick={() => setRole('user')}
              style={{
                flex: 1, padding: '0.8rem', borderRadius: '8px', 
                background: role === 'user' ? 'var(--accent)' : 'transparent',
                color: role === 'user' ? 'var(--primary)' : 'white',
                fontWeight: 700
              }}
            >
              For Clients
            </button>
            <button 
              className={role === 'lawyer' ? 'active' : ''} 
              onClick={() => setRole('lawyer')}
              style={{
                flex: 1, padding: '0.8rem', borderRadius: '8px', 
                background: role === 'lawyer' ? 'var(--accent)' : 'transparent',
                color: role === 'lawyer' ? 'var(--primary)' : 'white',
                fontWeight: 700
              }}
            >
              For Lawyers
            </button>
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOtp} className="login-form">
            <div className="login-input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="login-submit-btn" disabled={loading} style={{width: '100%'}}>
              {loading ? 'Processing...' : 'Get Verification Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <div className="login-input-group">
              <label>Enter 4-Digit OTP</label>
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
            <button type="submit" className="login-submit-btn" disabled={loading} style={{width: '100%'}}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <button type="button" className="back-btn" onClick={() => setStep(1)} style={{marginTop: '1.5rem'}}>
              ← Back to email
            </button>
          </form>
        )}
        
        <p style={{marginTop: '2.5rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)'}}>
          By continuing, you agree to our <span style={{color: 'var(--accent)'}}>Terms of Service</span>
        </p>
      </div>
    </div>
  );
}
