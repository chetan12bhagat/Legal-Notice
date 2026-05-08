'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/lib/api';

export default function LawyerCommunityProfilePage() {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div style={{textAlign: 'center', padding: '10rem'}}>Designing profile...</div>;
  if (!lawyer) return <div style={{textAlign: 'center', padding: '10rem'}}>Lawyer not found</div>;

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="hero-bg-profile"></div>
        <div className="container">
          <div className="hero-content-profile animate-fade">
            <img src={lawyer.image} alt={lawyer.name} className="avatar-img-profile" />
            <div style={{flex: 1}}>
              <h1 style={{color: 'white', fontSize: '2.5rem', marginBottom: '0.5rem'}}>{lawyer.name}</h1>
              <p style={{color: 'var(--accent)', fontWeight: 700, marginBottom: '1rem'}}>{lawyer.role} • {lawyer.status}</p>
              <div style={{display: 'flex', gap: '2rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem'}}>
                <span>📍 {lawyer.location}</span>
                <span>📧 {lawyer.email}</span>
                <span>📞 {lawyer.phone}</span>
              </div>
            </div>
            <div style={{background: 'white', padding: '1.5rem 2.5rem', borderRadius: '16px', textAlign: 'center'}}>
              <div style={{color: 'var(--primary)', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.5rem'}}>{lawyer.charges}</div>
              <a href="/consult" className="login-btn" style={{display: 'block'}}>Book Consultation</a>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{marginTop: '3rem'}}>
        <div className="profile-grid-main">
          <div className="consult-card">
            <h3 style={{marginBottom: '1.5rem'}}>About {lawyer.name}</h3>
            <p style={{color: 'var(--text-light)', lineHeight: 1.8}}>{lawyer.about}</p>
            
            <h3 style={{marginTop: '2.5rem', marginBottom: '1.5rem'}}>Legal Expertise</h3>
            <div style={{display: 'flex', flexWrap: 'wrap', gap: '1rem'}}>
              {lawyer.expertise.map((exp: any, i: number) => (
                <div key={i} style={{background: '#f1f5f9', padding: '0.6rem 1.2rem', borderRadius: '50px', fontSize: '0.85rem', fontWeight: 600}}>
                  {exp.title} ({exp.level})
                </div>
              ))}
            </div>
          </div>

          <div className="consult-card">
            <h3 style={{marginBottom: '1.5rem'}}>Professional Achievements</h3>
            {lawyer.badges.map((badge: any, i: number) => (
              <div key={i} style={{display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center'}}>
                <div style={{fontSize: '2rem', width: '50px', height: '50px', background: '#f8fafc', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{badge.icon}</div>
                <div>
                  <h4 style={{margin: 0}}>{badge.title}</h4>
                  <p style={{margin: 0, fontSize: '0.85rem', color: 'var(--text-light)'}}>{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
