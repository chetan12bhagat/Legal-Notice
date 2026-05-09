'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface User {
  email: string;
  name?: string;
  role?: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

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

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo-section">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v17m-9-5l9-2 9 2M3 10l9-2 9 2M6 20h12" />
              <circle cx="12" cy="3" r="1" fill="var(--accent)" />
            </svg>
            <span className="brand-name">Nyay Platform</span>
          </Link>
        </div>
        
        <div className="nav-links">
          <Link href="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>Home</Link>
          <Link href="/laws" className={`nav-link ${isActive('/laws') ? 'active' : ''}`}>Law Explorer</Link>
          <Link href="/lawyers" className={`nav-link ${isActive('/lawyers') ? 'active' : ''}`}>Find Lawyers</Link>
          <Link href="/consult" className={`nav-link ${isActive('/consult') ? 'active' : ''}`}>Submit Case</Link>
        </div>

        <div className="nav-btns">
          {user ? (
            <div className="user-menu-wrapper">
              <button className="user-avatar-btn" onClick={() => setMenuOpen(!menuOpen)}>
                <div className="user-avatar">{initials}</div>
                <span className="user-display-name">{displayName}</span>
              </button>
              {menuOpen && (
                <div className="user-dropdown">
                  <Link href="/profile" className="dropdown-item">👤 Profile</Link>
                  <button className="dropdown-item logout" onClick={handleLogout}>🚪 Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="sign-in-link">Sign In</Link>
              <Link href="/login" className="get-started-btn">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
