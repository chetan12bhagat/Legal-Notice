'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const LAWS_DATA = [
  { id: 1, title: 'Indian Penal Code (IPC)', category: 'Criminal', description: 'The primary criminal code of India covering offenses like theft, murder, and fraud.' },
  { id: 2, title: 'Code of Civil Procedure (CPC)', category: 'Civil', description: 'Governs the procedure for civil lawsuits and trials in Indian courts.' },
  { id: 3, title: 'Information Technology Act', category: 'Cyber', description: 'The primary law dealing with cybercrime and electronic commerce.' },
  { id: 4, title: 'Hindu Marriage Act', category: 'Family', description: 'Codifies laws relating to marriage and divorce among Hindus.' },
  { id: 5, title: 'Indian Contract Act', category: 'Corporate', description: 'Defines laws relating to contracts and agreements in India.' },
  { id: 6, title: 'Constitution of India', category: 'General', description: 'The supreme law of India laying down the fundamental framework.' },
];

export default function LawsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredLaws = LAWS_DATA.filter(law => {
    const matchesFilter = filter === 'All' || law.category === filter;
    const matchesSearch = law.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main style={{ minHeight: '100vh', paddingTop: '120px', background: 'var(--bg-obsidian)', position: 'relative' }}>
      <div className="hero-grid"></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <h1 className="animate-up" style={{ fontSize: '4.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Indian Laws <span className="gold-text">Directory.</span>
          </h1>
          <p className="animate-up" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto' }}>
            Navigate the legal statutes of India with our AI-enhanced directory. 
            Simplified, indexed, and accessible for everyone.
          </p>
          
          <div className="search-container animate-up" style={{ margin: '3.5rem auto' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" style={{ marginRight: '1rem' }}>
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input 
              type="text" 
              className="search-input" 
              placeholder="Search laws, sections, or keywords..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn-premium btn-gold" style={{ padding: '0.8rem 2.5rem', fontSize: '0.85rem' }}>Search Database</button>
          </div>

          <div className="animate-up" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {['All', 'Criminal', 'Civil', 'Cyber', 'Family', 'Corporate'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setFilter(cat)}
                style={{ 
                  background: filter === cat ? 'var(--accent-gold)' : 'rgba(255,255,255,0.03)', 
                  border: '1px solid',
                  borderColor: filter === cat ? 'var(--accent-gold)' : 'var(--border-light)',
                  color: filter === cat ? '#000' : 'var(--text-secondary)', 
                  padding: '0.7rem 1.8rem', 
                  borderRadius: '100px', 
                  fontSize: '0.9rem', 
                  cursor: 'pointer', 
                  fontWeight: 600,
                  transition: 'var(--transition-smooth)' 
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="features-grid" style={{ paddingBottom: '8rem' }}>
          {filteredLaws.map((law, idx) => (
            <div key={idx} className="glass-card animate-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '2.5px' }}>{law.category}</span>
                <div style={{ padding: '8px', background: 'rgba(197, 160, 89, 0.1)', borderRadius: '10px' }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
              </div>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '1.2rem', lineHeight: 1.2 }}>{law.title}</h3>
              <p style={{ marginBottom: '2.5rem', fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{law.description}</p>
              <Link href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', color: 'white', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none', transition: 'var(--transition-smooth)' }}>
                <span style={{ borderBottom: '1px solid var(--border-gold)', paddingBottom: '2px' }}>Read Full Statute</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2">
                  <path d="M5 12h14m-7-7l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
