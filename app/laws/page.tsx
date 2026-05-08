'use client';

import React, { useState } from 'react';
import styles from './laws.module.css';

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
    <div className={styles.lawsWrapper}>
      <div className="container">
        <div className={`${styles.lawsHeader} animate-fade`}>
          <h1>Indian Laws Directory</h1>
          <p>Search and understand the legal framework of India with professional clarity.</p>
        </div>

        <div className={`${styles.searchBarContainer} animate-fade`}>
          <span className={styles.searchIcon}>🔍</span>
          <input 
            type="text" 
            placeholder="Search for laws, sections, or keywords..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={`${styles.filterTags} animate-fade`}>
          {['All', 'Criminal', 'Civil', 'Cyber', 'Family', 'Corporate'].map(cat => (
            <button 
              key={cat} 
              className={filter === cat ? styles.active : ''}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className={styles.lawsGrid}>
          {filteredLaws.length > 0 ? (
            filteredLaws.map(law => (
              <div key={law.id} className={`${styles.lawCard} animate-fade`}>
                <div className={styles.lawBadge}>{law.category}</div>
                <h3>{law.title}</h3>
                <p>{law.description}</p>
                <button className={styles.readMore}>View Full Details →</button>
              </div>
            ))
          ) : (
            <div className={styles.noResults}>
              <h3>No laws found matching your search.</h3>
              <p>Try different keywords or browse by category.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
  );
}
