'use client';

import React, { useState } from 'react';

const LAWS_DB = [
  { id: 1, title: "Indian Penal Code (IPC) / Bharatiya Nyaya Sanhita (BNS)", description: "The primary criminal code of India. It covers offenses like theft, murder, assault, and fraud.", category: "Criminal" },
  { id: 2, title: "Code of Civil Procedure (CPC)", description: "Governs the procedure for civil lawsuits in India. It defines how trials are conducted in civil courts.", category: "Civil" },
  { id: 3, title: "Information Technology Act, 2000", description: "The primary law in India dealing with cybercrime and electronic commerce.", category: "Cyber" },
  { id: 4, title: "Hindu Marriage Act, 1955", description: "Codifies the laws relating to marriage among Hindus and provides for restitution of conjugal rights.", category: "Family" },
  { id: 5, title: "Indian Contract Act, 1872", description: "Defines the law relating to contracts in India, including the formation and performance of agreements.", category: "Corporate" },
  { id: 6, title: "Constitution of India", description: "The supreme law of India. It lays down the framework defining fundamental political principles, procedures, powers, and duties.", category: "General" }
];

export default function LawsPage() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredLaws = LAWS_DB.filter(law => {
    const matchesSearch = law.title.toLowerCase().includes(search.toLowerCase()) || 
                          law.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || law.category === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="laws-wrapper">
      <div className="container">
        <div className="laws-header animate-fade">
          <h1>Indian Laws Directory</h1>
          <p>Search and understand the legal framework of India.</p>
        </div>

        <div className="search-bar-container animate-fade shadow-premium">
          <span className="search-icon">🔍</span>
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

        <div className="laws-grid">
          {filteredLaws.map(law => (
            <div key={law.id} className="law-card animate-fade shadow-premium">
              <div className="law-badge">{law.category}</div>
              <h3>{law.title}</h3>
              <p>{law.description}</p>
              <button className="read-more">View Full Details →</button>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .laws-wrapper {
          padding: 4rem 0;
          background: #f8fafc;
          min-height: 100vh;
        }
        .laws-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        .laws-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .laws-header p {
          color: var(--text-light);
        }

        .search-bar-container {
          background: white;
          max-width: 800px;
          margin: 0 auto 2rem;
          display: flex;
          align-items: center;
          padding: 1rem 2rem;
          border-radius: 50px;
          border: 1px solid var(--border);
        }
        .search-icon {
          font-size: 1.2rem;
          margin-right: 1rem;
        }
        .search-bar-container input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1.1rem;
          color: var(--primary);
        }

        .filter-tags {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 4rem;
          flex-wrap: wrap;
        }
        .filter-tags button {
          background: white;
          border: 1px solid var(--border);
          padding: 0.6rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
          color: var(--text-light);
          transition: all 0.2s;
        }
        .filter-tags button.active {
          background: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        .filter-tags button:hover:not(.active) {
          border-color: var(--accent);
          color: var(--accent);
        }

        .laws-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }
        .law-card {
          background: white;
          padding: 2.5rem;
          border-radius: 20px;
          position: relative;
          transition: all 0.3s;
          border: 1px solid var(--border);
        }
        .law-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent);
        }
        .law-badge {
          position: absolute;
          top: 2rem;
          right: 2rem;
          background: var(--bg-slate);
          padding: 0.4rem 1rem;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--accent);
        }
        .law-card h3 {
          font-size: 1.4rem;
          margin-bottom: 1rem;
          padding-right: 4rem;
          line-height: 1.3;
        }
        .law-card p {
          font-size: 0.95rem;
          color: var(--text-light);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        .read-more {
          background: transparent;
          color: var(--primary);
          font-weight: 700;
          font-size: 0.9rem;
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
