'use client';

import React, { useState } from 'react';
import { api } from '@/lib/api';
import styles from './login.module.css';

export default function LoginPage() {
  const [role, setRole] = useState<'user' | 'lawyer'>('user');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.sendOtp(email, role);
      if (res.success) {
        setStep('otp');
      } else {
        alert(res.message || "Failed to send code.");
      }
    } catch (err) {
      alert("Failed to connect to server. Please ensure the backend is running.");
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
        setSuccess(true);
        localStorage.setItem('user', JSON.stringify(res.user));
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } else {
        alert(res.message || "Invalid OTP.");
      }
    } catch (err) {
      alert("Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={`${styles.loginCard} animate-fade`}>
        <div className={styles.loginHeader}>
          <img src="/images/logo.png" alt="Legal Notice" className={styles.loginLogo} />
          <h2>Welcome Back</h2>
          <p>Access your professional e-court dashboard</p>
        </div>

        <div className={styles.roleSelector}>
          <button 
            className={role === 'user' ? styles.active : ''} 
            onClick={() => setRole('user')}
          >
            I am a User
          </button>
          <button 
            className={role === 'lawyer' ? styles.active : ''} 
            onClick={() => setRole('lawyer')}
          >
            I am a Lawyer
          </button>
        </div>

        {success ? (
          <div className={`${styles.successState} animate-fade`}>
            <div className={styles.successIcon}>✓</div>
            <h3>Authenticated</h3>
            <p>Entering secure dashboard...</p>
          </div>
        ) : step === 'email' ? (
          <form onSubmit={handleSendOtp} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label>Email Address</label>
              <input 
                type="email" 
                placeholder="e.g. name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Processing...' : 'Get Security Code'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className={styles.loginForm}>
            <div className={styles.inputGroup}>
              <label>Verification Code</label>
              <input 
                type="text" 
                maxLength={6} 
                placeholder="••••••" 
                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.5rem' }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required 
              />
              <p className={styles.resendText}>Didn't receive code? <span>Resend</span></p>
            </div>
            <button type="submit" className={styles.submitBtn} disabled={loading}>
              {loading ? 'Verifying...' : 'Verify & Continue'}
            </button>
            <button type="button" className={styles.backBtn} onClick={() => setStep('email')}>
              ← Change Email
            </button>
          </form>
        )}

        <div className={styles.loginFooter}>
          <p>By continuing, you agree to our <span>Terms</span> and <span>Privacy Policy</span>.</p>
        </div>
      </div>
    </div>
  );
}
