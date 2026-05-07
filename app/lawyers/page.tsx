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
    <div className="lawyers-list-wrapper">
      <div className="container">
        <div className="header-section animate-fade">
          <h1>Find Expert Lawyers</h1>
          <p>Browse through our verified legal professionals across various domains.</p>
        </div>

        {loading ? (
          <div className="loading">Loading lawyers...</div>
        ) : (
          <div className="lawyers-grid">
            {lawyers.map((lawyer) => (
              <a href={`/lawyers/${lawyer.id}`} key={lawyer.id} className="lawyer-card animate-fade shadow-premium">
                <div className="lawyer-image-container">
                  <img src={lawyer.image || 'https://i.pravatar.cc/150'} alt={lawyer.name} className="lawyer-image" />
                  <div className="rating-badge">⭐ {lawyer.rating}</div>
                </div>
                <div className="lawyer-details">
                  <span className="specialization">{lawyer.specialization}</span>
                  <h3>{lawyer.name}</h3>
                  <div className="meta-info">
                    <span>💼 {lawyer.experience} Exp</span>
                    <span className="charges">{lawyer.charges}</span>
                  </div>
                  <p className="description">{lawyer.about.substring(0, 80)}...</p>
                  <button className="btn-view">View Profile</button>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .lawyers-list-wrapper {
          padding: 4rem 0;
          background: #f8fafc;
          min-height: 100vh;
        }
        .header-section {
          text-align: center;
          margin-bottom: 4rem;
        }
        .header-section h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .header-section p {
          color: var(--text-light);
          font-size: 1.1rem;
        }

        .lawyers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2.5rem;
        }

        .lawyer-card {
          background: white;
          border-radius: 20px;
          overflow: hidden;
          transition: all 0.3s ease;
          border: 1px solid var(--border);
          display: block;
        }
        .lawyer-card:hover {
          transform: translateY(-10px);
          border-color: var(--accent);
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .lawyer-image-container {
          position: relative;
          height: 200px;
        }
        .lawyer-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .rating-badge {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: white;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.85rem;
          color: var(--primary);
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }

        .lawyer-details {
          padding: 1.5rem;
        }
        .specialization {
          color: var(--accent);
          font-weight: 700;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 0.5rem;
        }
        .lawyer-details h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
          color: var(--primary);
        }
        .meta-info {
          display: flex;
          justify-content: space-between;
          font-size: 0.9rem;
          color: var(--text-light);
          margin-bottom: 1rem;
          font-weight: 600;
        }
        .charges {
          color: var(--primary);
        }
        .description {
          font-size: 0.85rem;
          color: var(--text-light);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .btn-view {
          width: 100%;
          padding: 0.8rem;
          background: var(--primary);
          color: white;
          border-radius: 10px;
          font-weight: 600;
          transition: background 0.3s;
        }
        .lawyer-card:hover .btn-view {
          background: var(--accent);
        }

        .loading {
          text-align: center;
          padding: 4rem;
          font-size: 1.2rem;
          color: var(--text-light);
        }
      `}</style>
    </div>
  );
}
