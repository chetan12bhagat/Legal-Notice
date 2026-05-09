'use client';

import React, { useState } from 'react';

export default function ConsultPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', background: 'var(--bg-obsidian)' }}>
        <div className="container">
          <div className="glass-card animate-up" style={{ textAlign: 'center', padding: '6rem 3rem', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ fontSize: '5rem', marginBottom: '2.5rem' }}>✨</div>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Inquiry <span className="gold-text">Transmitted.</span></h2>
            <p style={{ marginBottom: '3rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
              Your legal inquiry has been securely encrypted and routed to our specialist panel. 
              A verified legal consultant will review your case and contact you within 24 hours.
            </p>
            <button onClick={() => setSuccess(false)} className="btn-premium btn-gold">Submit New Inquiry</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', background: 'var(--bg-obsidian)', position: 'relative' }}>
      <div className="hero-grid"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
          <h1 className="animate-up" style={{ fontSize: '4.5rem', marginBottom: '1.5rem' }}>Legal <span className="gold-text">Consultation.</span></h1>
          <p className="animate-up" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto' }}>
            Initiate a high-level legal inquiry. Our platform connects you with the most 
            qualified legal experts in the country for a comprehensive case evaluation.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="animate-up">
          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', marginBottom: '8rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div className="glass-card">
                <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>01</span> Case Intelligence
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '1px' }}>Subject Matter</label>
                    <input type="text" placeholder="e.g. Strategic Corporate Restructuring Dispute" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.2rem', color: 'white', outline: 'none' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '1px' }}>Detailed Context</label>
                    <textarea placeholder="Provide the factual background and key legal questions..." rows={8} style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.2rem', color: 'white', outline: 'none', resize: 'none' }} required></textarea>
                  </div>
                </div>
              </div>

              <div className="glass-card">
                <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>02</span> Document Repository
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Attach all relevant evidence, previous court orders, or legal notices for a complete analysis.</p>
                <div style={{ border: '2px dashed var(--border-light)', borderRadius: '20px', padding: '4rem 2rem', textAlign: 'center', cursor: 'pointer', transition: 'var(--transition-smooth)' }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                  <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>📎</div>
                  <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Upload Legal Assets</h4>
                  <p style={{ fontSize: '0.9rem' }}>Drag and drop files or click to browse (Max 50MB)</p>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
              <div className="glass-card">
                <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>03</span> Domain Expertise
                </h3>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '1px' }}>Primary Legal Classification</label>
                <select style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.2rem', color: 'white', outline: 'none' }} required>
                  <option value="">Select Category</option>
                  <option value="corporate">Corporate & Commercial</option>
                  <option value="criminal">Constitutional & Criminal</option>
                  <option value="civil">Civil & Real Estate</option>
                  <option value="ip">Intellectual Property</option>
                </select>
              </div>

              <div className="glass-card">
                <h3 style={{ fontSize: '1.8rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>04</span> Security Credentials
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '1px' }}>Verified Legal Name</label>
                    <input type="text" placeholder="As per official identity document" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.2rem', color: 'white', outline: 'none' }} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.8rem', letterSpacing: '1px' }}>Secure Contact</label>
                    <input type="tel" placeholder="+91 XXX XXX XXXX" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.2rem', color: 'white', outline: 'none' }} required />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-premium btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '1.5rem' }} disabled={loading}>
                {loading ? 'Encrypting & Routing...' : 'Seal & Submit Inquiry'}
              </button>
              
              <div style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <span style={{ color: 'var(--accent-gold)' }}>🔒</span> End-to-End Encrypted Submission
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
