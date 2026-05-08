'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface User {
  email: string;
  name?: string;
  role?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const updateUser = () => {
      const stored = localStorage.getItem('user');
      if (stored) {
        try { setUser(JSON.parse(stored)); } catch {}
      } else {
        setUser(null);
      }
    };

    updateUser();
    window.addEventListener('storage', updateUser);
    return () => window.removeEventListener('storage', updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const displayName = user?.name || user?.email?.split('@')[0] || '';
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <nav className="navbar glass">
      <div className="nav-container">
        <div className="logo-section">
          <Link href="/">
            <img src="/images/logo.png" alt="Legal Notice" className="nav-logo" />
          </Link>
          <Link href="/" className="brand-name">Legal Notice</Link>
        </div>
        <div className="nav-links">
          <Link href="/">Feed</Link>
          <Link href="/laws">Indian Laws</Link>
          <Link href="/consult">Consult Lawyer</Link>

          {user ? (
            <div className="user-menu-wrapper">
              <button className="user-avatar-btn" onClick={() => setMenuOpen(!menuOpen)}>
                <div className="user-avatar">{initials}</div>
                <span className="user-display-name">{displayName}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 8L1 3h10L6 8z"/>
                </svg>
              </button>
              {menuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="user-avatar large">{initials}</div>
                    <div>
                      <strong>{user.name || 'My Account'}</strong>
                      <span>{user.email}</span>
                    </div>
                  </div>
                  <hr />
                  <Link href="/profile" className="dropdown-item" onClick={() => setMenuOpen(false)}>
                    👤 My Profile
                  </Link>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" className="login-btn">Login</Link>
          )}
        </div>
      </div>

    </nav>
  );
}
