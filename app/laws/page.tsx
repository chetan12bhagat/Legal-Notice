'use client';

import React, { useState } from 'react';

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
    <div className="laws-wrapper">
      <div className="container">
        <div className="laws-header animate-fade">
          <h1>Indian Laws Directory</h1>
          <p>Search and understand the legal framework of India.</p>
        </div>

        <div className="search-bar-container animate-fade">
          <input 
            type="text" 
            placeholder="Search for laws, sections, or keywords..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="filter-tags animate-fade">
          {['All', 'Criminal', 'Civil', 'Cyber', 'Family', 'Corporate'].map(cat => (
            <button 
              key={cat} 
              className={filter === cat ? 'active' : ''}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="laws-grid animate-fade">
          {filteredLaws.map(law => (
            <div key={law.id} className="law-card">
              <span className="law-badge">{law.category}</span>
              <h3 style={{fontSize: '1.5rem', marginBottom: '1rem'}}>{law.title}</h3>
              <p style={{color: 'var(--text-light)', marginBottom: '1.5rem'}}>{law.description}</p>
              <button style={{color: 'var(--primary)', fontWeight: '700'}}>Read Full Section →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
