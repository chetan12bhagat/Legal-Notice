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
        
        <div className="container">
          <div className="hero-content animate-fade">
            <div className="hero-badge">
              <span style={{ fontSize: '1.2rem' }}>⚖️</span>
              India's Digital Legal Platform
            </div>
            
            <h1>
              Justice at Your <br/>
              <span className="gold-text">Fingertips</span>
            </h1>
            
            <p>
              Explore Indian laws in plain language, connect with verified lawyers, and 
              submit your case securely — all in one platform.
            </p>
            
            <div className="hero-btns">
              <Link href="/laws" className="btn-search">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                Search Laws
              </Link>
              <Link href="/lawyers" className="btn-lawyer">
                Find a Lawyer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Additional content sections can go here, styled with .light-section or similar if they should contrast */}
    </div>
  );
}
