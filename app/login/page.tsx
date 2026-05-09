'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Email, 2: OTP
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1200);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const user = { email, name: email.split('@')[0] };
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/';
    }, 1200);
  };

  return (
    <div className="login-wrapper">
      <div className="auth-container animate-fade">
        {/* Left Side: Brand & Visuals */}
        <div className="auth-left">
          <div className="auth-brand">
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: 'white', borderRadius: '12px', padding: '8px' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#1e3a8a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3v17m-9-5l9-2 9 2M3 10l9-2 9 2M6 20h12" />
                </svg>
              </div>
              <span style={{ fontSize: '1.8rem', fontWeight: 800, letterSpacing: '-1px' }}>NYAY<span style={{ opacity: 0.7 }}>PLATFORM</span></span>
            </Link>
          </div>

          <div className="auth-visual-text">
            <p style={{ fontSize: '0.9rem', opacity: 0.8, marginBottom: '0.5rem' }}>You can easily</p>
            <h1 style={{ fontSize: '3.5rem', lineHeight: 1.1, fontWeight: 800 }}>
              Get access your <br/>
              personal hub for <br/>
              clarity and <br/>
              productivity.
            </h1>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="auth-right">
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#0f172a">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
              {step === 1 ? 'Welcome back' : 'Verify Identity'}
            </h2>
            <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.5 }}>
              {step === 1 
                ? 'Sign in to access your personalized legal hub and manage your cases.' 
                : `Enter the 6-digit code sent to ${email}`}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <div className="form-group">
                <label className="auth-label">Your Email</label>
                <input 
                  type="email" 
                  className="auth-input"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <label className="auth-label" style={{ margin: 0 }}>Password</label>
                  <a href="#" style={{ fontSize: '0.75rem', fontWeight: 700, color: '#3b82f6' }}>Forgot password?</a>
                </div>
                <input 
                  type="password" 
                  className="auth-input"
                  placeholder="••••••••••••"
                />
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Processing...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label className="auth-label">One-Time Password</label>
                <input 
                  type="text" 
                  className="auth-input"
                  placeholder="0 0 0 0 0 0"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{ textAlign: 'center', letterSpacing: '0.5rem', fontSize: '1.2rem' }}
                  required
                />
              </div>

              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Verifying...' : 'Verify & Sign In'}
              </button>
              
              <button type="button" onClick={() => setStep(1)} style={{ width: '100%', marginTop: '1rem', background: 'none', color: '#64748b', fontSize: '0.85rem', fontWeight: 600 }}>
                ← Change Email Address
              </button>
            </form>
          )}

          <div className="divider-container">
            <div className="divider-line"></div>
            <span>Or continue with</span>
            <div className="divider-line"></div>
          </div>

          <div className="social-auth-grid">
            <button className="social-btn">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="18" height="18" alt="Google" />
              Google
            </button>
            <button className="social-btn">
              <img src="https://www.svgrepo.com/show/475654/github-color.svg" width="18" height="18" alt="GitHub" />
              GitHub
            </button>
          </div>

          <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#64748b' }}>
            Don't have an account? <Link href="/login" style={{ color: '#0f172a', fontWeight: 800 }}>Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
