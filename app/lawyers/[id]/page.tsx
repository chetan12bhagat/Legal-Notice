'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function LawyerCommunityProfilePage() {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Influence');

  useEffect(() => {
    if (id) fetchLawyer();
  }, [id]);

  const fetchLawyer = async () => {
    try {
      const data = await api.getLawyerById(id as string);
      setLawyer(data);
    } catch (error) {
      console.error('Error fetching lawyer details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading-state">Designing profile...</div>;
  if (!lawyer) return <div className="error-state">Lawyer not found</div>;

  return (
    <div className="profile-page-root">
      {/* Top Breadcrumb Header */}
      <div className="breadcrumb-nav">
        <div className="container">
          <span>Home &gt; Lawyers &gt; Profile</span>
        </div>
      </div>

      <div className="container profile-main-container">
        {/* Profile Header Card */}
        <header className="profile-header-card">
          <div className="header-top">
            <div className="profile-avatar-section">
              <img src={lawyer.image} alt={lawyer.name} className="main-avatar" />
            </div>
            <div className="profile-info-section">
              <div className="name-row">
                <h1>{lawyer.name}</h1>
                <div className="header-actions">
                  <button className="btn-edit">Edit Profile</button>
                  <button className="btn-more">•••</button>
                </div>
              </div>
              <p className="job-title">{lawyer.role}</p>
              
              <div className="stats-badges">
                <span className="badge-icon green">⚖️</span>
                <span className="badge-icon blue">📜</span>
                <span className="badge-icon cyan">👔</span>
                <span className="points-text"><strong>{lawyer.points} points</strong> — {lawyer.status}</span>
              </div>

              <div className="contact-grid">
                <div className="contact-item">
                  <span className="label">PHONE</span>
                  <span className="value">{lawyer.phone}</span>
                </div>
                <div className="contact-item">
                  <span className="label">EMAIL</span>
                  <span className="value">{lawyer.email}</span>
                </div>
                <div className="contact-item">
                  <span className="label">LOCATION</span>
                  <span className="value">{lawyer.location}</span>
                </div>
              </div>

              <div className="about-section">
                <span className="label">ABOUT</span>
                <p>{lawyer.about} <span className="view-more">View More</span></p>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <nav className="profile-tabs">
          {['Content', 'Activity', 'Experience', 'Influence', 'Cases'].map((tab) => (
            <button 
              key={tab} 
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Main Content Layout */}
        <div className="content-layout">
          <main className="main-content">
            <div className="inner-tabs">
              <button className="inner-tab">Levels</button>
              <button className="inner-tab active">Badges</button>
              <button className="inner-tab">Points</button>
            </div>

            <div className="badges-list">
              <div className="filter-row">
                <select className="badge-filter">
                  <option>Show - All Badges</option>
                </select>
              </div>

              {lawyer.badges.map((badge: any, index: number) => (
                <div key={index} className="badge-card animate-fade" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className={`badge-icon-circle ${index % 3 === 0 ? 'bg-green' : index % 3 === 1 ? 'bg-red' : 'bg-blue'}`}>
                    {badge.icon}
                  </div>
                  <div className="badge-text">
                    <div className="badge-header">
                      <h3>{badge.title}</h3>
                      <span className="earned-date">Earned {index + 1}3d ago</span>
                    </div>
                    <p>{badge.desc}</p>
                    <span className="users-count">3,139 users earned this</span>
                  </div>
                </div>
              ))}

              <div className="consultation-cta-card shadow-premium">
                <div className="cta-content">
                  <h3>Need Professional Consultation?</h3>
                  <p>Book a private session with {lawyer.name} to discuss your legal matters.</p>
                </div>
                <div className="cta-action">
                  <span className="price-tag">{lawyer.charges}</span>
                  <a href="/consult" className="btn-consult-now">Book Now</a>
                </div>
              </div>
            </div>
          </main>

          <aside className="profile-sidebar">
            <div className="sidebar-section">
              <div className="section-header">
                <h3>Legal Expertise</h3>
                <span className="info-icon">ⓘ</span>
              </div>
              <div className="expertise-list">
                {lawyer.expertise.map((exp: any, index: number) => (
                  <div key={index} className="expertise-item">
                    <div className="level-circle">{exp.level}</div>
                    <div className="exp-info">
                      <span className="exp-title">{exp.title}</span>
                      <span className="exp-points">{exp.points} Points</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sidebar-section">
              <div className="section-header">
                <h3>Case Domains</h3>
                <span className="info-icon">ⓘ</span>
              </div>
              <div className="domain-cloud">
                <span className="tag">Criminal</span>
                <span className="tag">Corporate</span>
                <span className="tag">Civil</span>
                <span className="tag">Cyber</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .profile-page-root {
          background: #f4f7f9;
          min-height: 100vh;
          padding-bottom: 5rem;
          color: #333;
        }

        .breadcrumb-nav {
          background: white;
          padding: 1rem 0;
          border-bottom: 1px solid #e1e8ed;
          font-size: 0.85rem;
          color: #707e89;
          margin-bottom: 2rem;
        }

        .profile-header-card {
          background: white;
          border-radius: 4px;
          padding: 3rem;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          margin-bottom: 2rem;
        }

        .header-top {
          display: flex;
          gap: 3rem;
        }

        .main-avatar {
          width: 220px;
          height: 220px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid #eee;
        }

        .profile-info-section {
          flex: 1;
        }

        .name-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.5rem;
        }

        .name-row h1 {
          font-size: 2.2rem;
          color: #1a1a1a;
          font-weight: 500;
        }

        .header-actions {
          display: flex;
          gap: 0.5rem;
        }

        .btn-edit {
          padding: 0.5rem 1rem;
          border: 1px solid #ced4da;
          background: white;
          border-radius: 4px;
          font-size: 0.85rem;
          font-weight: 500;
          color: #495057;
        }

        .btn-more {
          padding: 0.5rem 0.8rem;
          border: 1px solid #ced4da;
          background: white;
          border-radius: 4px;
          color: #495057;
        }

        .job-title {
          font-size: 1.1rem;
          color: #707e89;
          margin-bottom: 1rem;
        }

        .stats-badges {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
        }

        .badge-icon {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1.1rem;
          color: white;
        }
        .badge-icon.green { background: #56c2a5; }
        .badge-icon.blue { background: #5dade2; }
        .badge-icon.cyan { background: #48c9b0; }

        .points-text {
          margin-left: 0.5rem;
          font-size: 0.9rem;
          color: #707e89;
          padding: 0.4rem 0.8rem;
          border: 1px solid #e1e8ed;
          border-radius: 4px;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 700;
          color: #707e89;
          letter-spacing: 0.5px;
          margin-bottom: 0.4rem;
        }

        .value {
          font-size: 0.95rem;
          color: #1a1a1a;
        }

        .about-section p {
          font-size: 0.95rem;
          color: #495057;
          line-height: 1.6;
        }

        .view-more {
          color: #007bff;
          font-weight: 600;
          cursor: pointer;
        }

        /* Tabs */
        .profile-tabs {
          display: flex;
          border-bottom: 1px solid #e1e8ed;
          margin-bottom: 2rem;
        }

        .tab-btn {
          padding: 1rem 2rem;
          background: none;
          border: none;
          font-size: 1rem;
          color: #707e89;
          cursor: pointer;
          position: relative;
        }

        .tab-btn.active {
          color: #007bff;
        }

        .tab-btn.active::after {
          content: '';
          position: absolute;
          bottom: -1px;
          left: 0;
          right: 0;
          height: 2px;
          background: #007bff;
        }

        /* Content Layout */
        .content-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 2rem;
        }

        .main-content {
          background: white;
          padding: 2rem;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .inner-tabs {
          display: flex;
          gap: 2rem;
          border-bottom: 1px solid #f1f5f9;
          margin-bottom: 2rem;
        }

        .inner-tab {
          padding: 0.8rem 1rem;
          background: none;
          border: none;
          font-size: 0.9rem;
          font-weight: 600;
          color: #707e89;
          cursor: pointer;
        }

        .inner-tab.active {
          color: #007bff;
          border-bottom: 2px solid #007bff;
        }

        .filter-row {
          display: flex;
          justify-content: flex-end;
          margin-bottom: 1.5rem;
        }

        .badge-filter {
          padding: 0.5rem;
          border: 1px solid #e1e8ed;
          border-radius: 4px;
          color: #495057;
          font-size: 0.85rem;
        }

        .badge-card {
          display: flex;
          gap: 1.5rem;
          padding: 1.5rem;
          border: 1px solid #f1f5f9;
          border-radius: 8px;
          margin-bottom: 1rem;
          transition: background 0.2s;
        }
        .badge-card:hover {
          background: #f8fbff;
        }

        .badge-icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          flex-shrink: 0;
        }
        .bg-green { background: #e8f8f5; color: #1abc9c; }
        .bg-red { background: #fdedec; color: #e74c3c; }
        .bg-blue { background: #ebf5fb; color: #3498db; }

        .badge-text { flex: 1; }

        .badge-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.4rem;
        }

        .badge-header h3 {
          font-size: 1rem;
          color: #1a1a1a;
          font-weight: 600;
        }

        .earned-date {
          font-size: 0.8rem;
          color: #707e89;
        }

        .badge-text p {
          font-size: 0.9rem;
          color: #707e89;
          margin-bottom: 0.4rem;
        }

        .users-count {
          font-size: 0.8rem;
          color: #95a5a6;
        }

        .consultation-cta-card {
          margin-top: 3rem;
          background: var(--primary);
          padding: 2.5rem;
          border-radius: 12px;
          color: white;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cta-content h3 { font-size: 1.5rem; margin-bottom: 0.5rem; }
        .cta-content p { color: rgba(255,255,255,0.8); }

        .cta-action {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .price-tag {
          font-size: 1.4rem;
          font-weight: 700;
          color: var(--accent);
        }

        .btn-consult-now {
          background: white;
          color: var(--primary);
          padding: 0.8rem 2rem;
          border-radius: 50px;
          font-weight: 700;
          transition: transform 0.2s;
        }
        .btn-consult-now:hover {
          transform: scale(1.05);
        }

        /* Sidebar */
        .sidebar-section {
          background: white;
          padding: 1.5rem;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          margin-bottom: 1.5rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #f1f5f9;
          padding-bottom: 0.5rem;
        }

        .section-header h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #1a1a1a;
        }

        .info-icon {
          color: #ced4da;
          cursor: help;
        }

        .expertise-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.2rem;
        }

        .level-circle {
          width: 40px;
          height: 40px;
          border: 2px solid #e1e8ed;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          color: #007bff;
        }

        .exp-title {
          display: block;
          font-size: 0.9rem;
          font-weight: 500;
          color: #495057;
        }

        .exp-points {
          font-size: 0.8rem;
          color: #707e89;
        }

        .domain-cloud {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .tag {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 0.4rem 0.8rem;
          border-radius: 4px;
          font-size: 0.85rem;
          color: #475569;
        }

        @media (max-width: 1024px) {
          .content-layout { grid-template-columns: 1fr; }
          .header-top { flex-direction: column; align-items: center; text-align: center; }
          .name-row { flex-direction: column; align-items: center; gap: 1rem; }
          .contact-grid { grid-template-columns: 1fr; gap: 1rem; }
          .stats-badges { justify-content: center; }
        }
      `}</style>
    </div>
  );
}
