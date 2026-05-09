"use client";

import { useEffect, useState } from "react";

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Show splash screen for 2 seconds
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for fade out animation to finish (0.8s)
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 800);
      return () => clearTimeout(removeTimer);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`splash-screen ${isFadingOut ? "fade-out" : ""}`}>
      <div className="logo-wrapper">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
          <path d="M12 3v17m-9-5l9-2 9 2M3 10l9-2 9 2M6 20h12" />
        </svg>
        <h1 className="splash-title" style={{ color: 'var(--accent)', fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>Nyay Platform</h1>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ background: 'var(--accent)' }}></div>
        </div>
      </div>
    </div>
  );
}
