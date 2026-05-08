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
      // Force a navbar refresh by emitting a storage event or just refreshing (simplest)
      window.dispatchEvent(new Event('storage'));
    }, 600);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(reader.result as string);
    reader.readAsDataURL(file);
  };

  const initials = (profile.name || profile.email || 'U').slice(0, 2).toUpperCase();

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="hero-bg-profile" />
        <div className="container">
          <div className="hero-content-profile animate-fade">
            <div className="avatar-wrap">
              {avatar
                ? <img src={avatar} alt="Avatar" className="avatar-img-profile" />
                : <div className="avatar-placeholder-profile">{initials}</div>
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
            <div className="hero-info-profile">
              <h1>{profile.name || 'My Profile'}</h1>
              <p className="hero-sub-profile">{profile.occupation || (profile.role === 'lawyer' ? 'Legal Professional' : 'Platform Member')}</p>
              <p className="hero-email-profile">✉️ {profile.email}</p>
              {profile.city && <p className="hero-location-profile">📍 {profile.city}</p>}
            </div>
            <div className="hero-actions-profile">
              {isEditing ? (
                <>
                  <button className="btn-save-profile" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? '⏳ Saving...' : '✓ Save Changes'}
                  </button>
                  <button className="btn-cancel-profile" onClick={() => setIsEditing(false)}>Cancel</button>
                </>
              ) : (
                <button className="btn-edit-profile" onClick={() => setIsEditing(true)}>
                  ✏️ Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {saveSuccess && (
        <div className="toast-success-profile animate-fade">
          ✅ Profile saved successfully!
        </div>
      )}

      <div className="container profile-body-content">
        <div className="profile-grid-main">
          {/* Left column */}
          <div className="col-left">
            <div className="profile-card-field">
              <h3 className="profile-card-title">Personal Information</h3>
              <div className="field-group-profile">
                <label>Full Name</label>
                {isEditing
                  ? <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Your full name" />
                  : <p>{profile.name || <span className="empty">Not set</span>}</p>}
              </div>
              <div className="field-group-profile">
                <label>Email Address</label>
                <p className="locked">🔒 {profile.email}</p>
              </div>
              <div className="field-group-profile">
                <label>Phone Number</label>
                {isEditing
                  ? <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" />
                  : <p>{profile.phone || <span className="empty">Not set</span>}</p>}
              </div>
              <div className="field-group-profile">
                <label>City / Location</label>
                {isEditing
                  ? <input value={profile.city} onChange={e => setProfile({ ...profile, city: e.target.value })} placeholder="e.g. Mumbai, India" />
                  : <p>{profile.city || <span className="empty">Not set</span>}</p>}
              </div>
            </div>

            <div className="profile-card-field">
              <h3 className="profile-card-title">Professional Details</h3>
              <div className="field-group-profile">
                <label>Occupation / Designation</label>
                {isEditing
                  ? <input value={profile.occupation} onChange={e => setProfile({ ...profile, occupation: e.target.value })} placeholder="e.g. Advocate, Business Owner" />
                  : <p>{profile.occupation || <span className="empty">Not set</span>}</p>}
              </div>
              <div className="field-group-profile">
                <label>Account Type</label>
                <p className="role-badge-profile">{profile.role === 'lawyer' ? '⚖️ Legal Professional' : '👤 Platform User'}</p>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="col-right">
            <div className="profile-card-field bio-card-profile">
              <h3 className="profile-card-title">About Me</h3>
              {isEditing
                ? <textarea
                    value={profile.bio}
                    onChange={e => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself, your legal needs, or your practice..."
                    rows={6}
                  />
                : <p className="bio-text-profile">{profile.bio || <span className="empty">No bio added yet. Click Edit Profile to add one.</span>}</p>}
            </div>

            <div className="profile-card-field">
              <h3 className="profile-card-title">Account Summary</h3>
              <div className="summary-grid">
                <div className="summary-item-profile">
                  <div className="summary-icon-profile">📧</div>
                  <div>
                    <strong>Email Verified</strong>
                    <span style={{fontSize: '0.8rem', color: 'var(--text-light)'}}>Active Account</span>
                  </div>
                </div>
                <div className="summary-item-profile">
                  <div className="summary-icon-profile">🛡️</div>
                  <div>
                    <strong>Account Type</strong>
                    <span style={{fontSize: '0.8rem', color: 'var(--text-light)'}}>{profile.role === 'lawyer' ? 'Legal Professional' : 'User'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
