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
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="grid-overlay"></div>
        <div className="hero-glow"></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="hero-content animate-fade">
            <div className="hero-badge" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', color: 'white' }}>
              <span style={{ color: 'var(--accent)' }}>✦</span>
              Most Trusted Digital Legal Platform in India
            </div>
            
            <h1 style={{ fontSize: '5.5rem', letterSpacing: '-2px', fontWeight: 800 }}>
              Justice at Your <br/>
              <span className="gold-gradient">Fingertips.</span>
            </h1>
            
            <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '550px', marginBottom: '3rem' }}>
              Bridge the gap between complexity and clarity. Access verified legal experts, 
              simplified law directories, and secure consultation — built for the modern citizen.
            </p>
            
            <div className="hero-btns" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              <Link href="/laws" className="get-started-btn" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
                Start Exploring
              </Link>
              <Link href="/lawyers" className="sign-in-link" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem' }}>
                Find a Lawyer
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
              </Link>
            </div>

            <div className="hero-stats" style={{ display: 'flex', gap: '4rem', marginTop: '5rem', borderTop: '1px solid var(--border)', paddingTop: '3rem' }}>
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>50k+</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Verified Laws</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>10k+</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Legal Experts</p>
              </div>
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>24/7</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Secure Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section" style={{ padding: '8rem 0', background: '#050811' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>Comprehensive Legal <span className="gold-gradient">Solutions.</span></h2>
            <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto' }}>From individual advice to corporate compliance, we provide a full spectrum of legal services tailored to your needs.</p>
          </div>
          
          <div className="services-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            <div className="glass-panel" style={{ padding: '3rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(197, 160, 89, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '2rem' }}>
                <span style={{ fontSize: '1.5rem' }}>⚖️</span>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Civil Litigation</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Expert guidance through civil disputes, property matters, and family law with a focus on resolution.</p>
            </div>
            
            <div className="glass-panel" style={{ padding: '3rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(197, 160, 89, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '2rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🛡️</span>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Criminal Defense</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Robust defense strategies for all criminal matters, ensuring your rights are protected at every step.</p>
            </div>
            
            <div className="glass-panel" style={{ padding: '3rem' }}>
              <div style={{ width: '50px', height: '50px', background: 'rgba(197, 160, 89, 0.1)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyCenter: 'center', marginBottom: '2rem' }}>
                <span style={{ fontSize: '1.5rem' }}>💼</span>
              </div>
              <h3 style={{ marginBottom: '1rem' }}>Corporate Law</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>End-to-end legal support for businesses, including contracts, compliance, and intellectual property.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional content sections can go here, styled with .light-section or similar if they should contrast */}
    </div>
  );
}
