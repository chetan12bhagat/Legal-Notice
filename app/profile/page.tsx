'use client';

import React, { useState } from 'react';

export default function LawyerProfilePage() {
  const [formData, setFormData] = useState({
    fullName: 'Adv. Chetanya Vashist',
    specialization: 'Criminal Defense',
    experience: '10 Years',
    contact: '+91 98765 43210',
    email: 'chetanya@lawyer.com',
    about: 'Dedicated legal professional specializing in criminal law and civil litigation. Committed to providing the best legal solutions for my clients.',
    cases: 'Handled over 200+ cases in various high courts across India.'
  });

  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="profile-wrapper">
      <div className="container">
        <div className="profile-grid animate-fade">
          {/* Sidebar / Photo Card */}
          <aside className="profile-sidebar">
            <div className="card profile-main-card shadow-premium">
              <div className="profile-photo-container">
                <img src="https://i.pravatar.cc/300?u=chetanya" alt="Profile" className="profile-photo" />
                {isEditing && <button className="upload-btn">📷 Change Photo</button>}
              </div>
              <div className="profile-header-info">
                <h2>{formData.fullName}</h2>
                <p className="specialty">{formData.specialization}</p>
                <div className="rating">⭐⭐⭐⭐⭐ (4.9/5)</div>
              </div>
              <div className="profile-actions">
                <button className="btn-edit" onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? 'Save Profile' : 'Edit Profile'}
                </button>
              </div>
            </div>

            <div className="card contact-card shadow-premium">
              <h3>Contact Details</h3>
              <div className="contact-item">
                <span>📞 Phone</span>
                <p>{formData.contact}</p>
              </div>
              <div className="contact-item">
                <span>📧 Email</span>
                <p>{formData.email}</p>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="profile-main">
            <div className="card info-card shadow-premium">
              <div className="card-header">
                <h3>Professional Overview</h3>
              </div>
              <div className="card-body">
                {isEditing ? (
                  <textarea 
                    value={formData.about} 
                    onChange={(e) => setFormData({...formData, about: e.target.value})}
                  />
                ) : (
                  <p>{formData.about}</p>
                )}
              </div>
            </div>

            <div className="profile-stats-grid">
              <div className="card stat-card shadow-premium">
                <h3>Experience</h3>
                {isEditing ? (
                  <input value={formData.experience} onChange={(e) => setFormData({...formData, experience: e.target.value})} />
                ) : (
                  <strong>{formData.experience}</strong>
                )}
              </div>
              <div className="card stat-card shadow-premium">
                <h3>Cases Handled</h3>
                <strong>200+</strong>
              </div>
            </div>

            <div className="card info-card shadow-premium">
              <div className="card-header">
                <h3>Case Experience</h3>
              </div>
              <div className="card-body">
                {isEditing ? (
                  <textarea 
                    value={formData.cases} 
                    onChange={(e) => setFormData({...formData, cases: e.target.value})}
                  />
                ) : (
                  <p>{formData.cases}</p>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>

      <style jsx>{`
        .profile-wrapper {
          padding: 4rem 0;
          background: #f8fafc;
          min-height: 100vh;
        }
        .profile-grid {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 2.5rem;
        }

        .card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          margin-bottom: 2rem;
          border: 1px solid var(--border);
        }

        /* Sidebar */
        .profile-main-card {
          text-align: center;
          padding-top: 3rem;
        }
        .profile-photo-container {
          position: relative;
          width: 180px;
          height: 180px;
          margin: 0 auto 2rem;
        }
        .profile-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 6px solid var(--bg-slate);
        }
        .upload-btn {
          position: absolute;
          bottom: 10px;
          right: 10px;
          background: var(--accent);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 50px;
          font-size: 0.8rem;
        }
        .profile-header-info h2 {
          font-size: 1.6rem;
          margin-bottom: 0.5rem;
        }
        .specialty {
          color: var(--accent);
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .rating {
          font-size: 0.9rem;
          color: #fbbf24;
          margin-bottom: 2rem;
        }
        .btn-edit {
          width: 100%;
          background: var(--primary);
          color: white;
          padding: 1rem;
          border-radius: 12px;
          font-weight: 600;
        }

        .contact-card h3 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
        }
        .contact-item {
          margin-bottom: 1.2rem;
        }
        .contact-item span {
          font-size: 0.8rem;
          color: var(--text-light);
          display: block;
          margin-bottom: 0.2rem;
        }
        .contact-item p {
          font-weight: 600;
          color: var(--primary);
        }

        /* Main Area */
        .info-card h3 {
          font-size: 1.3rem;
          margin-bottom: 1rem;
        }
        .card-body p {
          color: var(--text-light);
          line-height: 1.8;
        }
        .card-body textarea {
          width: 100%;
          min-height: 150px;
          padding: 1rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          font-family: inherit;
        }

        .profile-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        .stat-card {
          text-align: center;
        }
        .stat-card h3 {
          font-size: 1rem;
          color: var(--text-light);
          margin-bottom: 0.5rem;
        }
        .stat-card strong {
          font-size: 1.8rem;
          color: var(--primary);
          font-family: var(--font-serif);
        }
        .stat-card input {
          width: 100%;
          text-align: center;
          font-size: 1.2rem;
          font-weight: 700;
          padding: 0.5rem;
          border: 1px solid var(--border);
          border-radius: 8px;
        }

        @media (max-width: 900px) {
          .profile-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
