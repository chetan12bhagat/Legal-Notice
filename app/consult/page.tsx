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
          <div className="card success-card animate-fade shadow-premium">
            <div className="success-icon">✅</div>
            <h2>Case Submitted Successfully!</h2>
            <p>Your case details and documents have been securely sent to our expert panel. A lawyer will reach out to you within 24-48 hours.</p>
            <button onClick={() => setSuccess(false)} className="btn-back">Back to Consultation</button>
          </div>
        </div>
        <style jsx>{`
          .consult-wrapper { padding: 5rem 0; min-height: 80vh; display: flex; align-items: center; }
          .success-card { text-align: center; padding: 4rem; max-width: 600px; margin: 0 auto; }
          .success-icon { font-size: 4rem; margin-bottom: 2rem; }
          .success-card h2 { margin-bottom: 1.5rem; }
          .success-card p { color: var(--text-light); margin-bottom: 2.5rem; line-height: 1.8; }
          .btn-back { background: var(--primary); color: white; padding: 1rem 2.5rem; border-radius: 50px; font-weight: 600; }
        `}</style>
      </div>
    );
  }

  return (
    <div className="consult-wrapper">
      <div className="container">
        <div className="consult-header animate-fade">
          <h1>Consult a Lawyer</h1>
          <p>Provide your case details and documents for a professional evaluation.</p>
        </div>

        <form onSubmit={handleSubmit} className="consult-form animate-fade">
          <div className="form-grid">
            <div className="form-left">
              <div className="card shadow-premium">
                <h3>Case Information</h3>
                <div className="input-group">
                  <label>Case Topic / Subject</label>
                  <input type="text" placeholder="e.g. Property Dispute, Cyber Fraud" required />
                </div>
                <div className="input-group">
                  <label>Description of the Case</label>
                  <textarea placeholder="Provide a detailed description of your legal issue..." required></textarea>
                </div>
                <div className="input-group">
                  <label>Relevant Legal Domain</label>
                  <select required>
                    <option value="">Select Domain</option>
                    <option value="criminal">Criminal Law</option>
                    <option value="civil">Civil Litigation</option>
                    <option value="cyber">Cyber Crime</option>
                    <option value="family">Family Law</option>
                    <option value="corporate">Corporate Law</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-right">
              <div className="card shadow-premium">
                <h3>File Uploads</h3>
                <p className="upload-hint">Upload relevant documents (PDF, Images) to help our lawyers understand your case better.</p>
                
                <div className="upload-area">
                  <input type="file" multiple id="file-upload" className="hidden-input" />
                  <label htmlFor="file-upload" className="upload-label">
                    <span className="icon">📁</span>
                    <strong>Choose Files</strong>
                    <span>or drag & drop here</span>
                    <small>Max file size: 10MB</small>
                  </label>
                </div>
              </div>

              <div className="card shadow-premium">
                <h3>Your Contact Details</h3>
                <div className="input-group">
                  <label>Full Name</label>
                  <input type="text" placeholder="Your Name" required />
                </div>
                <div className="input-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 00000 00000" required />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Submitting Case...' : 'Submit Consultation Request'}
              </button>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .consult-wrapper {
          padding: 4rem 0;
          background: #f8fafc;
          min-height: 100vh;
        }
        .consult-header {
          text-align: center;
          margin-bottom: 4rem;
        }
        .consult-header h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
        }
        .consult-header p {
          color: var(--text-light);
          font-size: 1.1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 2.5rem;
        }

        .card {
          background: white;
          padding: 2rem;
          border-radius: 20px;
          margin-bottom: 2rem;
          border: 1px solid var(--border);
        }
        .card h3 {
          margin-bottom: 1.5rem;
          font-size: 1.3rem;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }
        .input-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--primary);
        }
        .input-group input, .input-group textarea, .input-group select {
          padding: 0.8rem 1.2rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          font-size: 1rem;
          font-family: inherit;
        }
        .input-group textarea {
          min-height: 200px;
          resize: vertical;
        }

        .upload-hint {
          font-size: 0.85rem;
          color: var(--text-light);
          margin-bottom: 1.5rem;
          line-height: 1.6;
        }
        .upload-area {
          border: 2px dashed var(--border);
          border-radius: 15px;
          padding: 3rem 2rem;
          text-align: center;
          transition: all 0.2s;
        }
        .upload-area:hover {
          border-color: var(--accent);
          background: rgba(197, 160, 89, 0.05);
        }
        .hidden-input {
          display: none;
        }
        .upload-label {
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
        }
        .upload-label .icon {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }
        .upload-label strong {
          color: var(--primary);
        }
        .upload-label span {
          font-size: 0.9rem;
          color: var(--text-light);
        }
        .upload-label small {
          font-size: 0.75rem;
          color: #94a3b8;
          margin-top: 0.5rem;
        }

        .submit-btn {
          width: 100%;
          background: var(--primary);
          color: white;
          padding: 1.2rem;
          border-radius: 12px;
          font-weight: 700;
          font-size: 1.1rem;
          margin-top: 1rem;
        }
        .submit-btn:hover {
          background: var(--accent);
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }
        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        @media (max-width: 900px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
