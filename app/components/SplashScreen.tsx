"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="splash-v2 animate-fade" style={{ background: '#ffffff' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '2rem' }}>
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v17m-9-5l9-2 9 2" />
          </svg>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-dark)', letterSpacing: '-2px' }}>
            NYAY<span style={{ color: 'var(--primary-blue)' }}>PLATFORM</span>
          </h1>
        </div>
        
        <p style={{ color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '4px', fontSize: '0.8rem', fontWeight: 800 }}>
          Digital Legal Infrastructure
        </p>

        <div className="loading-indicator">
          <div className="loading-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}
