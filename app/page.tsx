'use client';

import React, { useState } from 'react';

const DUMMY_POSTS = [
  {
    id: 1,
    author: "Adv. Rajesh Kumar",
    role: "Criminal Defense Expert",
    avatar: "https://i.pravatar.cc/150?u=rajesh",
    content: "Just concluded a significant case regarding Section 498A. It's crucial to understand the recent Supreme Court guidelines on misuse of this section. Read more about it in my blog.",
    category: "Criminal Law",
    likes: 124,
    comments: 18,
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    author: "Adv. Priya Sharma",
    role: "Corporate Litigator",
    avatar: "https://i.pravatar.cc/150?u=priya",
    content: "The new Digital Personal Data Protection Act is going to change how companies handle user data in India. Compliance is now more important than ever.",
    category: "Cyber Crime",
    likes: 89,
    comments: 12,
    timestamp: "5 hours ago"
  },
  {
    id: 3,
    author: "Adv. Vikram Singh",
    role: "Family Law Specialist",
    avatar: "https://i.pravatar.cc/150?u=vikram",
    content: "Mediation is often a better path than litigation in family disputes. It saves time, money, and emotional energy for both parties involved.",
    category: "Family Law",
    likes: 56,
    comments: 8,
    timestamp: "1 day ago"
  }
];

export default function Home() {
  const [posts, setPosts] = useState(DUMMY_POSTS);

  return (
    <div className="home-wrapper">
      {/* Splash/Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content animate-fade">
            <h1>Expert Legal Advice, <br /><span className="text-accent">Just a Click Away.</span></h1>
            <p>Connect with top Indian lawyers, explore legal domains, and resolve your cases with professional expertise.</p>
            <div className="hero-btns">
              <a href="/lawyers" className="btn-primary">Find a Lawyer</a>
              <a href="/consult" className="btn-secondary">Consult for Free</a>
            </div>
          </div>
        </div>
        <div className="hero-overlay"></div>
      </section>

      {/* Main Feed Section */}
      <div className="container main-layout">
        <aside className="sidebar left-sidebar">
          <div className="card user-mini-profile shadow-premium">
            <div className="profile-bg"></div>
            <div className="profile-info">
              <div className="avatar-large">LN</div>
              <h3>Welcome back</h3>
              <p>Legal Notice Community</p>
            </div>
            <div className="profile-stats">
              <div className="stat">
                <span>Posts</span>
                <strong>24</strong>
              </div>
              <div className="stat">
                <span>Consults</span>
                <strong>12</strong>
              </div>
            </div>
          </div>

          <div className="card categories-card shadow-premium">
            <h3>Domains</h3>
            <div className="category-list">
              <div className="cat-item">⚖️ Criminal Law</div>
              <div className="cat-item">🤝 Civil Law</div>
              <div className="cat-item">💻 Cyber Crime</div>
              <div className="cat-item">🏠 Family Law</div>
            </div>
          </div>
        </aside>

        <main className="feed-section">
          {/* Create Post Card */}
          <div className="card create-post-card shadow-premium">
            <div className="create-row">
              <div className="avatar-small">LN</div>
              <button className="post-trigger">Start a case-related post...</button>
            </div>
            <div className="post-options">
              <span>🖼️ Image</span>
              <span>📄 Document</span>
              <span>💼 Case Study</span>
            </div>
          </div>

          {/* Feed */}
          {posts.map(post => (
            <div key={post.id} className="card post-card shadow-premium animate-fade">
              <div className="post-header">
                <img src={post.avatar} alt={post.author} className="post-avatar" />
                <div className="author-meta">
                  <h4>{post.author}</h4>
                  <p>{post.role} • {post.timestamp}</p>
                </div>
                <span className="post-category">{post.category}</span>
              </div>
              <div className="post-content">
                <p>{post.content}</p>
              </div>
              <div className="post-actions">
                <button>👍 {post.likes} Like</button>
                <button>💬 {post.comments} Comment</button>
                <button>🔗 Share</button>
              </div>
            </div>
          ))}
        </main>

        <aside className="sidebar right-sidebar">
          <div className="card trends-card shadow-premium">
            <h3>Trending Laws</h3>
            <div className="trend-item">
              <strong>Section 498A</strong>
              <p>1,240 people consulted</p>
            </div>
            <div className="trend-item">
              <strong>IT Act 2000</strong>
              <p>856 people consulted</p>
            </div>
            <div className="trend-item">
              <strong>BNS 2023</strong>
              <p>2,105 people consulted</p>
            </div>
          </div>
        </aside>
      </div>

      <style jsx>{`
        .home-wrapper {
          background: #f1f5f9;
          min-height: 100vh;
          padding-bottom: 5rem;
        }

        /* Hero/Splash Section */
        .hero-section {
          height: 60vh;
          background: var(--primary);
          position: relative;
          display: flex;
          align-items: center;
          color: white;
          overflow: hidden;
          margin-bottom: -100px;
          padding-bottom: 100px;
        }
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(45deg, var(--primary) 30%, transparent 100%);
          z-index: 1;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }
        .hero-content h1 {
          font-size: 3.5rem;
          color: white;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        .text-accent {
          color: var(--accent);
        }
        .hero-content p {
          font-size: 1.2rem;
          color: #94a3b8;
          margin-bottom: 2.5rem;
        }
        .hero-btns {
          display: flex;
          gap: 1rem;
        }
        .btn-primary {
          background: var(--accent);
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
        }
        .btn-secondary {
          background: transparent;
          border: 2px solid white;
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
        }

        /* Layout */
        .main-layout {
          display: grid;
          grid-template-columns: 280px 1fr 300px;
          gap: 2rem;
          position: relative;
          z-index: 10;
        }

        /* Card Styles */
        .card {
          background: white;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        /* Sidebar Styles */
        .user-mini-profile {
          text-align: center;
        }
        .profile-bg {
          height: 60px;
          background: var(--primary);
        }
        .profile-info {
          padding: 0 1rem 1.5rem;
          margin-top: -30px;
        }
        .avatar-large {
          width: 60px;
          height: 60px;
          background: var(--accent);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          margin: 0 auto 1rem;
          border: 4px solid white;
        }
        .profile-stats {
          display: flex;
          border-top: 1px solid var(--border);
        }
        .stat {
          flex: 1;
          padding: 1rem;
          display: flex;
          flex-direction: column;
        }
        .stat:first-child {
          border-right: 1px solid var(--border);
        }
        .stat span {
          font-size: 0.75rem;
          color: var(--text-light);
        }
        .stat strong {
          color: var(--primary);
        }

        .categories-card, .trends-card {
          padding: 1.5rem;
        }
        .categories-card h3, .trends-card h3 {
          font-size: 1.1rem;
          margin-bottom: 1.2rem;
        }
        .category-list {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .cat-item {
          font-size: 0.9rem;
          color: var(--text-light);
          cursor: pointer;
        }
        .cat-item:hover {
          color: var(--accent);
        }

        /* Feed Styles */
        .create-post-card {
          padding: 1.5rem;
        }
        .create-row {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        .avatar-small {
          width: 40px;
          height: 40px;
          background: var(--primary);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          flex-shrink: 0;
        }
        .post-trigger {
          flex: 1;
          background: #f1f5f9;
          border: 1px solid var(--border);
          border-radius: 50px;
          padding: 0 1.5rem;
          text-align: left;
          color: var(--text-light);
        }
        .post-options {
          display: flex;
          gap: 2rem;
          padding-left: 3.5rem;
        }
        .post-options span {
          font-size: 0.85rem;
          color: var(--text-light);
          cursor: pointer;
        }

        .post-card {
          padding: 1.5rem;
        }
        .post-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          position: relative;
        }
        .post-avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .author-meta h4 {
          font-size: 1rem;
          margin-bottom: 0.1rem;
        }
        .author-meta p {
          font-size: 0.75rem;
          color: var(--text-light);
        }
        .post-category {
          position: absolute;
          right: 0;
          top: 0;
          background: #f1f5f9;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--primary);
        }
        .post-content {
          font-size: 0.95rem;
          color: var(--text-dark);
          margin-bottom: 1.5rem;
        }
        .post-actions {
          display: flex;
          gap: 1rem;
          border-top: 1px solid var(--border);
          padding-top: 1rem;
        }
        .post-actions button {
          background: transparent;
          color: var(--text-light);
          font-size: 0.85rem;
          font-weight: 600;
          padding: 0.5rem 1rem;
          border-radius: 4px;
        }
        .post-actions button:hover {
          background: #f1f5f9;
          color: var(--primary);
        }

        /* Trends Sidebar */
        .trend-item {
          margin-bottom: 1.2rem;
        }
        .trend-item strong {
          font-size: 0.9rem;
          display: block;
        }
        .trend-item p {
          font-size: 0.75rem;
          color: var(--text-light);
        }

        @media (max-width: 1100px) {
          .main-layout {
            grid-template-columns: 240px 1fr;
          }
          .right-sidebar {
            display: none;
          }
        }

        @media (max-width: 800px) {
          .main-layout {
            grid-template-columns: 1fr;
          }
          .left-sidebar {
            display: none;
          }
          .hero-content h1 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
}
