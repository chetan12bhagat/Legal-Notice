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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Directorate', href: '/laws' },
    { name: 'Case Tracker', href: '#' },
    { name: 'Inquiry', href: '/consult' },
    { name: 'Experts', href: '/lawyers' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v17m-9-5l9-2 9 2M3 10l9-2 9 2M6 20h12" />
          </svg>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: 'var(--font-serif)', letterSpacing: '-1px' }}>NYAY<span style={{ opacity: 0.6 }}>PLATFORM</span></span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(255,255,255,0.03)', padding: '0.4rem', borderRadius: '100px', border: '1px solid var(--border-light)' }}>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                style={{ 
                  background: pathname === link.href ? 'var(--accent-gold)' : 'transparent',
                  color: pathname === link.href ? '#000' : 'var(--text-secondary)'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <Link href="/login" style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.9rem' }}>Sign In</Link>
            <Link href="/consult" className="btn-premium btn-gold" style={{ padding: '0.7rem 1.8rem', fontSize: '0.85rem' }}>
              Portal Access
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
