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
      <div className="hero-bg-accent"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '4rem', alignItems: 'center', minHeight: '80vh' }}>
          
          <div className="animate-up">
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              background: '#e0f2fe', 
              color: '#0369a1', 
              padding: '0.6rem 1.2rem', 
              borderRadius: '100px', 
              fontSize: '0.8rem', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '1px',
              marginBottom: '2.5rem'
            }}>
              Student Legal Research Platform
            </div>
            
            <h1 style={{ fontSize: '5.5rem', lineHeight: 1, marginBottom: '2.5rem', color: '#1e293b' }}>
              Fuel Your Future <br/>
              with <span style={{ color: 'var(--primary-blue)' }}>Legal Excellence.</span>
            </h1>
            
            <p style={{ fontSize: '1.3rem', maxWidth: '600px', marginBottom: '3.5rem', color: '#64748b', lineHeight: 1.6 }}>
              The first platform designed exclusively for law students to gain professional 
              experience and earn by solving real-world legal tasks for growth-focused firms.
            </p>
            
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <Link href="/profile" className="btn-premium btn-gold" style={{ background: 'var(--primary-blue)', borderRadius: '100px', padding: '1rem 2.5rem' }}>
                Go to Dashboard
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
              </Link>
              <Link href="/laws" className="btn-premium btn-outline" style={{ borderRadius: '100px', padding: '1rem 2.5rem', border: '1.5px solid #e2e8f0' }}>
                Browse Laws
              </Link>
            </div>
          </div>

          <div className="animate-up" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ 
                width: '450px', 
                height: '450px', 
                background: 'var(--bg-blue-tint)', 
                borderRadius: '40px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                boxShadow: 'inset 0 0 40px rgba(14, 165, 233, 0.1)'
              }}>
                <svg width="240" height="240" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                  <path d="M12 3v17m-9-5l9-2 9 2M3 10l9-2 9 2M6 20h12" />
                </svg>
              </div>
              <div style={{ 
                position: 'absolute', 
                bottom: '-20px', 
                right: '-20px', 
                background: 'white', 
                padding: '1.5rem', 
                borderRadius: '20px', 
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: '15px'
              }}>
                <div style={{ background: '#22c55e', width: '12px', height: '12px', borderRadius: '50%' }}></div>
                <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>450+ Active Tasks</span>
              </div>
            </div>
          </div>

        </div>
      </div>

        {/* Feature Grid */}
        <section className="section-padding">
          <div style={{ marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Precision Tools for <br/> <span style={{ color: 'var(--primary-blue)' }}>Legal Professionals.</span></h2>
          </div>
          
          <div className="features-grid">
            <div className="glass-card animate-up">
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>📡</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Real-time Case Tracking</h3>
              <p>Instant updates on court proceedings, hearing dates, and order status across all Indian judicial tiers.</p>
            </div>
            
            <div className="glass-card animate-up" style={{ animationDelay: '0.1s' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>🧠</div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>AI Legal Intelligence</h3>
              <p>Analyze complex legal documents and precedents with advanced AI. Extract insights in seconds, not hours.</p>
            </div>
            
            <div className="glass-card animate-up" style={{ animationDelay: '0.2s' }}>
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
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>98%</div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>Resolution Rate</p>
            </div>
            <div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>2.5M</div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>Cases Tracked</p>
            </div>
            <div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>15k+</div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>Verified Lawyers</p>
            </div>
            <div>
              <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>100%</div>
              <p style={{ textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-dark)' }}>Data Security</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
