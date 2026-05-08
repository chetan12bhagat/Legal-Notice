'use client';

import React, { useState } from 'react';

export default function ConsultPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <div className="consult-wrapper">
        <div className="container">
          <div className="consult-card animate-fade" style={{textAlign: 'center', padding: '5rem 2rem'}}>
            <div style={{fontSize: '5rem', marginBottom: '2rem'}}>✅</div>
            <h2>Case Submitted!</h2>
            <p style={{marginBottom: '2rem'}}>Your case details and documents have been securely sent to our expert panel. A verified lawyer will reach out to you within 24-48 hours for a professional evaluation.</p>
            <button onClick={() => setSuccess(false)} className="btn-primary-hero">Submit Another Case</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="consult-wrapper">
      <div className="container">
        <div className="consult-header animate-fade">
          <h1>Consult a Lawyer</h1>
          <p>Provide your case details and documents for a professional legal evaluation.</p>
        </div>

        <form onSubmit={handleSubmit} className="animate-fade">
          <div className="consult-form-grid">
            <div className="form-left">
              <div className="consult-card">
                <h3 style={{marginBottom: '2rem'}}>📝 Case Information</h3>
                <div className="consult-input-group">
                  <label>Case Topic / Subject</label>
                  <input type="text" placeholder="e.g. Property Dispute, Cyber Fraud" required />
                </div>
                <div className="consult-input-group">
                  <label>Detailed Description</label>
                  <textarea placeholder="Please describe the facts of your case..." rows={10} required></textarea>
                </div>
                <div className="consult-input-group">
                  <label>Relevant Legal Domain</label>
                  <select required>
                    <option value="">Select Domain</option>
                    <option value="criminal">Criminal Law</option>
                    <option value="civil">Civil Litigation</option>
                    <option value="cyber">Cyber Crime</option>
                    <option value="family">Family Law</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-right">
              <div className="consult-card">
                <h3>📁 Evidence & Files</h3>
                <p style={{fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1.5rem'}}>Upload relevant documents (PDF, Images) to help our lawyers evaluate your case.</p>
                <div className="consult-upload-area">
                  <input type="file" multiple id="file-upload" style={{ display: 'none' }} />
                  <label htmlFor="file-upload" style={{cursor: 'pointer'}}>
                    <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📄</div>
                    <strong>Select Documents</strong>
                    <div style={{fontSize: '0.85rem', color: 'var(--text-light)', marginTop: '0.5rem'}}>Click to browse or drag files here</div>
                  </label>
                </div>
              </div>

              <div className="consult-card">
                <h3>👤 Contact Details</h3>
                <div className="consult-input-group">
                  <label>Full Legal Name</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="consult-input-group">
                  <label>Secure Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
              </div>

              <button type="submit" className="consult-submit-btn" disabled={loading}>
                {loading ? 'Processing...' : 'Submit Consultation Request'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
