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
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
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

      <style jsx>{`
        .user-menu-wrapper {
          position: relative;
        }
        .user-avatar-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1.5px solid var(--border);
          border-radius: 50px;
          padding: 6px 14px 6px 6px;
          cursor: pointer;
          transition: all 0.2s;
          color: var(--primary);
          font-weight: 600;
          font-size: 0.9rem;
        }
        .user-avatar-btn:hover {
          border-color: var(--accent);
          background: rgba(197,160,89,0.05);
        }
        .user-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.8rem;
          font-family: var(--font-serif);
          flex-shrink: 0;
        }
        .user-avatar.large {
          width: 46px;
          height: 46px;
          font-size: 1rem;
        }
        .user-display-name {
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .user-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          background: white;
          border: 1px solid var(--border);
          border-radius: 16px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
          min-width: 240px;
          z-index: 1001;
          overflow: hidden;
          animation: dropIn 0.2s ease;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .user-dropdown-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: #f8fafc;
        }
        .user-dropdown-header strong {
          display: block;
          font-size: 0.95rem;
          color: var(--primary);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 160px;
        }
        .user-dropdown-header span {
          display: block;
          font-size: 0.78rem;
          color: var(--text-light);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: 160px;
        }
        .user-dropdown hr {
          border: none;
          border-top: 1px solid var(--border);
          margin: 0;
        }
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          font-size: 0.9rem;
          color: var(--primary);
          font-weight: 500;
          cursor: pointer;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          transition: background 0.15s;
          text-decoration: none;
        }
        .dropdown-item:hover {
          background: #f8fafc;
        }
        .dropdown-item.logout {
          color: #ef4444;
        }
      `}</style>
    </nav>
  );
}
