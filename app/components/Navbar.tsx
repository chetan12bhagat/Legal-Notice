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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Browse Laws', href: '/laws' },
    { name: 'Dashboard', href: '/profile' },
    { name: 'How it Works', href: '#' },
    { name: 'About', href: '#' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center' }}>
        {/* Left: Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
          <div style={{ background: 'var(--primary-blue)', padding: '8px', borderRadius: '8px', display: 'flex' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v17m-9-5l9-2 9 2M3 10l9-2 9 2" />
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 900, color: 'var(--text-dark)', lineHeight: 1 }}>NYAY<span style={{ color: 'var(--primary-blue)' }}>PLATFORM</span></span>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Unified Legal Infrastructure</span>
          </div>
        </Link>

        {/* Center: Nav Links */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`nav-link ${pathname === link.href ? 'active' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right: User Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.5rem' }}>
          {user ? (
            <>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--text-dark)', textTransform: 'uppercase' }}>{user.name || user.email.split('@')[0]}</span>
              <Link href="/login" onClick={() => localStorage.removeItem('user')} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ef4444', textDecoration: 'none', fontWeight: 700, fontSize: '0.85rem' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4m7 14l5-5-5-5m5 5H9" />
                </svg>
                EXIT
              </Link>
            </>
          ) : (
            <>
              <Link href="/login" style={{ color: 'var(--text-dark)', fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none' }}>LOG IN</Link>
              <Link href="/consult" className="btn-premium btn-gold" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem', borderRadius: '8px' }}>
                GET STARTED
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
