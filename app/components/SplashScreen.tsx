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
      <div className="splash-content">
        <div className="logo-wrapper">
          <img
            src="/images/logo.png"
            alt="Legal Notice Logo"
            className="splash-logo"
          />
        </div>
        <h1 className="splash-title">Legal Notice</h1>
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      </div>
    </div>
  );
}
