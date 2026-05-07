'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';

export default function LoginPage() {
  const [role, setRole] = useState<'user' | 'lawyer'>('user');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.sendOtp(email, role);
      if (res.success) {
        setStep('otp');
        if (res.debug_otp) {
          alert(`Debug OTP: ${res.debug_otp}`);
        }
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert("Failed to send OTP. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.verifyOtp(email, otp);
      if (res.success) {
        // Store user data
        localStorage.setItem('user', JSON.stringify(res.user));
        window.location.href = '/';
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card animate-fade">
        <div className="login-header">
          <img src="/images/logo.png" alt="Legal Notice" className="login-logo" />
          <h2>Welcome to Legal Notice</h2>
          <p>Login to your professional e-court dashboard</p>
        </div>

        <div className="role-selector">
          <button 
            className={role === 'user' ? 'active' : ''} 
            onClick={() => setRole('user')}
          >
            I am a User
          </button>
          <button 
            className={role === 'lawyer' ? 'active' : ''} 
            onClick={() => setRole('lawyer')}
          >
            I am a Lawyer
          </button>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleSendOtp} className="login-form">
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending Code...' : 'Get Verification Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="login-form">
            <div className="input-group">
              <label>Enter 6-Digit OTP</label>
              <input 
                type="text" 
                maxLength={6} 
                placeholder="000000" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
              />
              <p className="resend-text">Didn't receive code? <span>Resend</span></p>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Login'}
            </button>
            <button type="button" className="back-btn" onClick={() => setStep('email')}>
              Back to Email
            </button>
          </form>
        )}

        <div className="login-footer">
          <p>By continuing, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.</p>
        </div>
      </div>

      <style jsx>{`
        .login-wrapper {
          min-height: calc(100vh - 80px);
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
          padding: 2rem;
        }
        .login-card {
          background: white;
          width: 100%;
          max-width: 450px;
          padding: 3rem;
          border-radius: 20px;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid var(--border);
        }
        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        .login-logo {
          height: 80px;
          margin-bottom: 1.5rem;
        }
        .login-header h2 {
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
        }
        .login-header p {
          color: var(--text-light);
          font-size: 0.95rem;
        }

        .role-selector {
          display: flex;
          background: #f1f5f9;
          padding: 0.4rem;
          border-radius: 12px;
          margin-bottom: 2rem;
        }
        .role-selector button {
          flex: 1;
          padding: 0.8rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          color: var(--text-light);
          background: transparent;
        }
        .role-selector button.active {
          background: white;
          color: var(--primary);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .input-group label {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary);
        }
        .input-group input {
          padding: 0.8rem 1.2rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          font-size: 1rem;
          transition: all 0.2s;
        }
        .input-group input:focus {
          border-color: var(--accent);
          outline: none;
          box-shadow: 0 0 0 3px rgba(197, 160, 89, 0.1);
        }

        .submit-btn {
          background: var(--primary);
          color: white;
          padding: 1rem;
          border-radius: 10px;
          font-weight: 600;
          font-size: 1rem;
          margin-top: 0.5rem;
        }
        .submit-btn:hover {
          background: var(--accent);
          transform: translateY(-2px);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .back-btn {
          background: transparent;
          color: var(--text-light);
          font-size: 0.9rem;
          text-decoration: underline;
        }

        .resend-text {
          font-size: 0.85rem;
          color: var(--text-light);
          margin-top: 0.5rem;
        }
        .resend-text span {
          color: var(--accent);
          font-weight: 600;
          cursor: pointer;
        }

        .login-footer {
          margin-top: 2.5rem;
          text-align: center;
          font-size: 0.8rem;
          color: var(--text-light);
          line-height: 1.5;
        }
        .login-footer span {
          color: var(--primary);
          font-weight: 600;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
