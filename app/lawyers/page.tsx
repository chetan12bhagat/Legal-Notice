'use client';

import React, { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function LawyersListPage() {
  const [lawyers, setLawyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLawyers();
  }, []);

  const fetchLawyers = async () => {
    try {
      const data = await api.getLawyers();
      setLawyers(data);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="laws-wrapper">
      <div className="container">
        <div className="laws-header animate-fade">
          <h1>Find Expert Lawyers</h1>
          <p>Browse through our verified legal professionals across various domains.</p>
        </div>

        {loading ? (
          <div style={{textAlign: 'center', padding: '4rem', color: 'var(--text-light)'}}>Loading lawyers...</div>
        ) : (
          <div className="lawyers-grid">
            {lawyers.map((lawyer) => (
              <a href={`/lawyers/${lawyer.id}`} key={lawyer.id} className="lawyer-card animate-fade shadow-premium">
                <div className="lawyer-image-container">
                  <img src={lawyer.image || 'https://i.pravatar.cc/150'} alt={lawyer.name} className="lawyer-image" />
                  <div className="rating-badge">⭐ {lawyer.rating}</div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <span style={{color: 'var(--accent)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase'}}>{lawyer.specialization}</span>
                  <h3 style={{margin: '0.5rem 0 1rem'}}>{lawyer.name}</h3>
                  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1rem'}}>
                    <span>💼 {lawyer.experience} Exp</span>
                    <span style={{color: 'var(--primary)', fontWeight: 700}}>{lawyer.charges}</span>
                  </div>
                  <p style={{fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '1.5rem'}}>{lawyer.about.substring(0, 80)}...</p>
                  <button style={{width: '100%', padding: '0.8rem', background: 'var(--primary)', color: 'white', borderRadius: '10px', fontWeight: 600}}>View Profile</button>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
