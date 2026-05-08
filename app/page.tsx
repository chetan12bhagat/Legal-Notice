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

  const displayName = user?.name || user?.email?.split('@')[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="container">
          <div className="hero-content animate-fade">
            <h1>Expert Legal Guidance, <br/><span className="text-accent">Available 24/7</span></h1>
            <p style={{fontSize: '1.2rem', opacity: 0.8, marginBottom: '2rem'}}>Access Indian laws, connect with verified lawyers, and get your legal queries resolved in minutes.</p>
            <div className="hero-btns">
              <Link href="/consult" className="btn-primary-hero">Get Free Consultation</Link>
              <Link href="/laws" className="btn-secondary-hero">Explore Indian Laws</Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="main-layout">
          <aside>
            <div className="home-card">
              <div className="profile-bg"></div>
              <div className="avatar-large">{initials}</div>
              <div style={{textAlign: 'center'}}>
                <h3>{displayName}</h3>
                <p style={{color: 'var(--text-light)', fontSize: '0.9rem'}}>Pro Member</p>
              </div>
            </div>
            <div className="home-card">
              <h4 style={{marginBottom: '1rem'}}>Categories</h4>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li style={{marginBottom: '0.8rem'}}>⚖️ Criminal Law</li>
                <li style={{marginBottom: '0.8rem'}}>🏠 Property Law</li>
                <li style={{marginBottom: '0.8rem'}}>💍 Family Law</li>
              </ul>
            </div>
          </aside>

          <div className="home-main-content">
            <div className="home-card">
              <button className="post-trigger">What is your legal concern today?</button>
            </div>

            <div className="home-card">
              <div style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
                <div style={{width: '50px', height: '50px', borderRadius: '50%', background: '#eee'}}></div>
                <div>
                  <h4 style={{margin: 0}}>Adv. Vikram Singh</h4>
                  <p style={{margin: 0, fontSize: '0.8rem', color: 'var(--text-light)'}}>Property Expert • 2h ago</p>
                </div>
              </div>
              <p>New updates in the Real Estate (Regulation and Development) Act, 2016. Homebuyers now have more protection against delayed possession.</p>
              <div style={{borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem', display: 'flex', gap: '2rem'}}>
                <span style={{fontSize: '0.9rem', color: 'var(--text-light)'}}>👍 Helpful</span>
                <span style={{fontSize: '0.9rem', color: 'var(--text-light)'}}>💬 Comment</span>
              </div>
            </div>
          </div>

          <aside>
            <div className="home-card">
              <h4 style={{marginBottom: '1rem'}}>Legal Trends</h4>
              <p style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}><strong>#NewITRules2024</strong></p>
              <p style={{fontSize: '0.9rem', marginBottom: '0.5rem'}}><strong>#RERAHearing</strong></p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
