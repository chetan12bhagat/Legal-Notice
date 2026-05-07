'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

interface Profile {
  name: string;
  email: string;
  phone: string;
  city: string;
  role: string;
  bio: string;
  occupation: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profile, setProfile] = useState<Profile>({
    name: '', email: '', phone: '', city: '', role: 'user', bio: '', occupation: '',
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (!stored) { router.push('/login'); return; }
    const user = JSON.parse(stored);

    // Merge stored user with any saved profile
    const savedProfile = localStorage.getItem('userProfile');
    const parsed = savedProfile ? JSON.parse(savedProfile) : {};
    setProfile({
      name: parsed.name || user.name || '',
      email: user.email || '',
      phone: parsed.phone || '',
      city: parsed.city || '',
      role: user.role || 'user',
      bio: parsed.bio || '',
      occupation: parsed.occupation || '',
    });
    setAvatar(parsed.avatar || '');
  }, [router]);

  const handleSave = () => {
    setIsSaving(true);
    const toSave = { ...profile, avatar };
    localStorage.setItem('userProfile', JSON.stringify(toSave));

    // Update user display name in user object too
    const stored = localStorage.getItem('user');
    if (stored) {
      const user = JSON.parse(stored);
      localStorage.setItem('user', JSON.stringify({ ...user, name: profile.name }));
    }

    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 600);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  const initials = (profile.name || profile.email).slice(0, 2).toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="hero-bg" />
        <div className="container">
          <div className="hero-content animate-fade">
            <div className="avatar-wrap">
              {avatar
                ? <img src={avatar} alt="Avatar" className="avatar-img" />
                : <div className="avatar-placeholder">{initials}</div>
              }
              {isEditing && (
                <>
                  <button className="avatar-change-btn" onClick={() => fileInputRef.current?.click()}>
                    📷 Change
                  </button>
                  <input type="file" accept="image/*" ref={fileInputRef} style={{ display: 'none' }} onChange={handleAvatarChange} />
                </>
              )}
            </div>
            <div className="hero-info">
              <h1>{profile.name || 'My Profile'}</h1>
              <p className="hero-sub">{profile.occupation || profile.role === 'lawyer' ? 'Legal Professional' : 'Platform Member'}</p>
              <p className="hero-email">✉️ {profile.email}</p>
              {profile.city && <p className="hero-location">📍 {profile.city}</p>}
            </div>
            <div className="hero-actions">
              {isEditing ? (
                <>
                  <button className="btn-save" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? '⏳ Saving...' : '✓ Save Changes'}
                  </button>
                  <button className="btn-cancel" onClick={() => setIsEditing(false)}>Cancel</button>
                </>
              ) : (
                <button className="btn-edit" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="toast-success animate-fade">
          ✅ Profile saved successfully!
        </div>
      )}

      <div className="container profile-body">
        <div className="profile-grid">
          {/* Left column */}
          <div className="col-left">
            <div className="card">
              <h3 className="card-title">Personal Information</h3>
              <div className="field-group">
                <label>Full Name</label>
                {isEditing
                  ? <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Your full name" />
                  : <p>{profile.name || <span className="empty">Not set</span>}</p>}
              </div>
              <div className="field-group">
                <label>Email Address</label>
                <p className="locked">🔒 {profile.email}</p>
              </div>
              <div className="field-group">
                <label>Phone Number</label>
                {isEditing
                  ? <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                  : <p>{profile.phone || <span className="empty">Not set</span>}</p>}
              </div>
              <div className="field-group">
                <label>City / Location</label>
                {isEditing
                  ? <input value={profile.city} onChange={e => setProfile({ ...profile, city: e.target.value })} placeholder="e.g. Mumbai, India" />
                  : <p>{profile.city || <span className="empty">Not set</span>}</p>}
              </div>
            </div>

            <div className="card">
              <h3 className="card-title">Professional Details</h3>
              <div className="field-group">
                <label>Occupation / Designation</label>
                {isEditing
                  ? <input value={profile.occupation} onChange={e => setProfile({ ...profile, occupation: e.target.value })} placeholder="e.g. Advocate, Business Owner" />
                  : <p>{profile.occupation || <span className="empty">Not set</span>}</p>}
              </div>
              <div className="field-group">
                <label>Account Type</label>
                <p className="role-badge">{profile.role === 'lawyer' ? '⚖️ Legal Professional' : '👤 Platform User'}</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-right">
            <div className="card bio-card">
              <h3 className="card-title">About Me</h3>
              {isEditing
                ? <textarea
                    value={profile.bio}
                    onChange={e => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself, your legal needs, or your practice..."
                    rows={6}
                  />
                : <p className="bio-text">{profile.bio || <span className="empty">No bio added yet. Click Edit Profile to add one.</span>}</p>}
            </div>

            <div className="card">
              <h3 className="card-title">Account Summary</h3>
              <div className="summary-grid">
                <div className="summary-item">
                  <div className="summary-icon">📧</div>
                  <div>
                    <strong>Email Verified</strong>
                    <span>Active Account</span>
                  </div>
                </div>
                <div className="summary-item">
                  <div className="summary-icon">🛡️</div>
                  <div>
                    <strong>Account Type</strong>
                    <span>{profile.role === 'lawyer' ? 'Legal Professional' : 'User'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .profile-page {
          min-height: 100vh;
          background: #f8fafc;
        }
        .profile-hero {
          position: relative;
          padding: 3rem 0 4rem;
          overflow: hidden;
        }
        .hero-bg {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, var(--primary) 0%, #16213e 60%, #0f3460 100%);
          z-index: 0;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 2.5rem;
          flex-wrap: wrap;
        }
        .avatar-wrap {
          position: relative;
          flex-shrink: 0;
        }
        .avatar-img {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid rgba(197,160,89,0.6);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        .avatar-placeholder {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: var(--accent);
          color: var(--primary);
          font-size: 2.5rem;
          font-weight: 800;
          font-family: var(--font-serif);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 4px solid rgba(255,255,255,0.2);
          box-shadow: 0 8px 30px rgba(0,0,0,0.3);
        }
        .avatar-change-btn {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          background: var(--accent);
          color: white;
          font-size: 0.7rem;
          padding: 4px 10px;
          border-radius: 20px;
          white-space: nowrap;
          font-weight: 600;
        }
        .hero-info {
          flex: 1;
          color: white;
        }
        .hero-info h1 {
          color: white;
          font-size: 2.2rem;
          margin-bottom: 0.4rem;
        }
        .hero-sub {
          color: var(--accent);
          font-weight: 600;
          margin-bottom: 0.3rem;
        }
        .hero-email, .hero-location {
          color: rgba(255,255,255,0.65);
          font-size: 0.9rem;
          margin-bottom: 0.2rem;
        }
        .hero-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }
        .btn-edit {
          background: var(--accent);
          color: var(--primary);
          padding: 0.75rem 1.8rem;
          border-radius: 50px;
          font-weight: 700;
          font-size: 0.95rem;
          box-shadow: 0 4px 15px rgba(197,160,89,0.4);
          transition: transform 0.2s;
        }
        .btn-edit:hover { transform: translateY(-2px); }
        .btn-save {
          background: #22c55e;
          color: white;
          padding: 0.75rem 1.8rem;
          border-radius: 50px;
          font-weight: 700;
          box-shadow: 0 4px 15px rgba(34,197,94,0.4);
        }
        .btn-cancel {
          background: rgba(255,255,255,0.15);
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 50px;
          font-weight: 600;
        }
        .toast-success {
          position: fixed;
          bottom: 30px;
          right: 30px;
          background: #22c55e;
          color: white;
          padding: 14px 24px;
          border-radius: 12px;
          font-weight: 600;
          z-index: 9999;
          box-shadow: 0 8px 25px rgba(34,197,94,0.3);
        }
        .profile-body {
          padding: 3rem 2rem;
        }
        .profile-grid {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 2rem;
        }
        .card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          border: 1px solid var(--border);
          box-shadow: 0 4px 20px rgba(0,0,0,0.04);
          margin-bottom: 2rem;
        }
        .card-title {
          font-size: 1.1rem;
          color: var(--primary);
          margin-bottom: 1.5rem;
          padding-bottom: 0.75rem;
          border-bottom: 2px solid var(--bg-slate);
          font-family: var(--font-serif);
        }
        .field-group {
          margin-bottom: 1.4rem;
        }
        .field-group label {
          display: block;
          font-size: 0.78rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-light);
          margin-bottom: 6px;
        }
        .field-group p {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--primary);
        }
        .field-group input {
          width: 100%;
          padding: 0.7rem 1rem;
          border: 1.5px solid var(--border);
          border-radius: 10px;
          font-size: 0.95rem;
          font-family: inherit;
          transition: border-color 0.2s;
          color: var(--primary);
        }
        .field-group input:focus {
          border-color: var(--accent);
          outline: none;
          box-shadow: 0 0 0 3px rgba(197,160,89,0.1);
        }
        .empty {
          color: var(--text-light);
          font-weight: 400;
          font-style: italic;
        }
        .locked {
          color: var(--text-light) !important;
          font-size: 0.9rem !important;
        }
        .role-badge {
          background: #f1f5f9;
          display: inline-block;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.85rem !important;
          font-weight: 600 !important;
          color: var(--primary) !important;
        }
        .bio-card textarea {
          width: 100%;
          padding: 1rem;
          border: 1.5px solid var(--border);
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.95rem;
          resize: vertical;
          color: var(--primary);
          line-height: 1.7;
          transition: border-color 0.2s;
        }
        .bio-card textarea:focus {
          border-color: var(--accent);
          outline: none;
          box-shadow: 0 0 0 3px rgba(197,160,89,0.1);
        }
        .bio-text {
          color: var(--text-light) !important;
          font-weight: 400 !important;
          line-height: 1.8;
        }
        .summary-grid {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }
        .summary-item {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        .summary-icon {
          font-size: 1.6rem;
          width: 48px;
          height: 48px;
          background: #f8fafc;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .summary-item strong {
          display: block;
          font-size: 0.9rem;
          color: var(--primary);
          font-weight: 700;
        }
        .summary-item span {
          font-size: 0.82rem;
          color: var(--text-light);
        }
        @media (max-width: 800px) {
          .hero-content { flex-direction: column; text-align: center; }
          .profile-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
