'use client';

import React, { useState } from 'react';
import styles from './consult.module.css';

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
      <div className={styles.consultWrapper}>
        <div className="container">
          <div className={`${styles.card} ${styles.successCard} animate-fade`}>
            <div className={styles.successIcon}>✓</div>
            <h2>Case Submitted!</h2>
            <p>Your case details and documents have been securely sent to our expert panel. A verified lawyer will reach out to you within 24-48 hours for a professional evaluation.</p>
            <button onClick={() => setSuccess(false)} className={styles.btnBack}>Submit Another Case</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.consultWrapper}>
      <div className="container">
        <div className={`${styles.consultHeader} animate-fade`}>
          <h1>Consult a Lawyer</h1>
          <p>Provide your case details and documents for a professional legal evaluation.</p>
        </div>

        <form onSubmit={handleSubmit} className="animate-fade">
          <div className={styles.formGrid}>
            <div className={styles.formLeft}>
              <div className={styles.card}>
                <h3><span>📝</span> Case Information</h3>
                <div className={styles.inputGroup}>
                  <label>Case Topic / Subject</label>
                  <input type="text" placeholder="e.g. Property Dispute, Cyber Fraud, Family Matter" required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Detailed Description</label>
                  <textarea placeholder="Please describe the facts of your case, including dates, parties involved, and your specific legal question..." required></textarea>
                </div>
                <div className={styles.inputGroup}>
                  <label>Relevant Legal Domain</label>
                  <select required>
                    <option value="">Select the most relevant domain</option>
                    <option value="criminal">Criminal Law</option>
                    <option value="civil">Civil Litigation</option>
                    <option value="cyber">Cyber Crime / IT Act</option>
                    <option value="family">Family & Matrimonial</option>
                    <option value="corporate">Corporate & Commercial</option>
                    <option value="property">Property & Real Estate</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.formRight}>
              <div className={styles.card}>
                <h3><span>📁</span> Evidence & Files</h3>
                <p className={styles.uploadHint}>Upload relevant documents (PDF, Images) to help our lawyers evaluate your case effectively.</p>
                
                <div className={styles.uploadArea}>
                  <input type="file" multiple id="file-upload" style={{ display: 'none' }} />
                  <label htmlFor="file-upload" className={styles.uploadLabel}>
                    <span className={styles.icon}>📄</span>
                    <strong>Select Documents</strong>
                    <span>Click to browse or drag files here</span>
                    <small>Support: PDF, JPG, PNG (Max 10MB each)</small>
                  </label>
                </div>
              </div>

              <div className={styles.card}>
                <h3><span>👤</span> Contact Identity</h3>
                <div className={styles.inputGroup}>
                  <label>Full Legal Name</label>
                  <input type="text" placeholder="As per official documents" required />
                </div>
                <div className={styles.inputGroup}>
                  <label>Secure Phone Number</label>
                  <input type="tel" placeholder="+91 XXXXX XXXXX" required />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                {loading ? 'Processing Submission...' : 'Submit Secure Request'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
