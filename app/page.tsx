'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  return (
    <main className="hero-v2">
      <div className="hero-grid"></div>
      <div className="hero-bg-accent"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        {/* Hero Section */}
        <div className="section-padding" style={{ paddingBottom: '4rem' }}>
          <div className="animate-up">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', padding: '0.6rem 1.2rem', borderRadius: '100px', marginBottom: '2.5rem' }}>
              <span style={{ color: 'var(--accent-gold)' }}>●</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>India's Unified E-Court Interface</span>
            </div>
            
            <h1 style={{ fontSize: '6.5rem', lineHeight: 0.95, marginBottom: '2.5rem', maxWidth: '900px' }}>
              Justice Evolved. <br/>
              <span className="gold-text">Digitally Empowered.</span>
            </h1>
            
            <p style={{ fontSize: '1.25rem', maxWidth: '600px', marginBottom: '4rem', color: 'var(--text-secondary)' }}>
              Navigate the legal landscape with unprecedented precision. From real-time case tracking 
              to AI-driven legal intelligence, we redefine the judicial experience.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="/laws" className="btn-premium btn-gold">
                Explore Law Directory
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/consult" className="btn-premium btn-outline">
                Submit Legal Inquiry
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <section className="section-padding">
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Precision Tools for <br/> <span className="gold-text">Legal Professionals.</span></h2>
          </div>
          
          <div className="features-grid">
            <div className="glass-card animate-up">
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>📡</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Real-time Case Tracking</h3>
              <p>Instant updates on court proceedings, hearing dates, and order status across all Indian judicial tiers.</p>
            </div>
            
            <div className="glass-card animate-up" style={{ animationDelay: '0.2s' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🧠</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>AI Legal Intelligence</h3>
              <p>Analyze complex legal documents and precedents with advanced AI. Extract insights in seconds, not hours.</p>
            </div>
            
            <div className="glass-card animate-up" style={{ animationDelay: '0.4s' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🏛️</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Virtual Courtroom</h3>
              <p>Secure, end-to-end encrypted video conferencing for virtual hearings and legal consultations.</p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding" style={{ borderTop: '1px solid var(--border-light)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem' }}>
            <div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>98%</div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 700 }}>Resolution Rate</p>
            </div>
            <div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>2.5M</div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 700 }}>Cases Tracked</p>
            </div>
            <div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>15k+</div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 700 }}>Verified Lawyers</p>
            </div>
            <div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>100%</div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 700 }}>Data Security</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
