'use client';

import React, { useState, useEffect } from 'react';
import styles from './home.module.css';

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

interface User {
  email: string;
  name?: string;
  role?: string;
}

export default function Home() {
  const [posts, setPosts] = useState(DUMMY_POSTS);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const userData = JSON.parse(stored);
        setUser(userData);
      } catch (err) {
        console.error("Failed to parse user data", err);
      }
    }
  }, []);

  const displayName = user?.name || user?.email?.split('@')[0] || "Welcome back";
  const userSub = user ? (user.role === 'lawyer' ? "Legal Professional" : "Member") : "Legal Notice Community";
  const initials = (user?.name || user?.email || "LN").slice(0, 2).toUpperCase();

  return (
    <div className={styles.homeWrapper}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className="container">
          <div className={`${styles.heroContent} animate-fade`}>
            <h1>Expert Legal Advice, <br /><span className={styles.textAccent}>Just a Click Away.</span></h1>
            <p>Connect with top Indian lawyers, explore legal domains, and resolve your cases with professional expertise.</p>
            <div className={styles.heroBtns}>
              <a href="/lawyers" className={styles.btnPrimary}>Find a Lawyer</a>
              <a href="/consult" className={styles.btnSecondary}>Consult for Free</a>
            </div>
          </div>
        </div>
        <div className={styles.heroOverlay}></div>
      </section>

      {/* Main Feed Section */}
      <div className={`container ${styles.mainLayout}`}>
        <aside className={`${styles.sidebar} ${styles.leftSidebar}`}>
          <div className={`${styles.card} ${styles.userMiniProfile} shadow-premium`}>
            <div className={styles.profileBg}></div>
            <div className={styles.profileInfo}>
              <div className={styles.avatarLarge}>{initials}</div>
              <h3>{user ? `Hello, ${displayName}` : "Welcome back"}</h3>
              <p>{userSub}</p>
            </div>
            <div className={styles.profileStats}>
              <div className={styles.stat}>
                <span>Posts</span>
                <strong>24</strong>
              </div>
              <div className={styles.stat}>
                <span>Consults</span>
                <strong>12</strong>
              </div>
            </div>
          </div>

          <div className={`${styles.card} ${styles.categoriesCard} shadow-premium`}>
            <h3>Domains</h3>
            <div className={styles.categoryList}>
              <div className={styles.catItem}>⚖️ Criminal Law</div>
              <div className={styles.catItem}>🤝 Civil Law</div>
              <div className={styles.catItem}>💻 Cyber Crime</div>
              <div className={styles.catItem}>🏠 Family Law</div>
            </div>
          </div>
        </aside>

        <main className={styles.feedSection}>
          {/* Create Post Card */}
          <div className={`${styles.card} ${styles.createPostCard} shadow-premium`}>
            <div className={styles.createRow}>
              <div className={styles.avatarSmall}>{initials}</div>
              <button className={styles.postTrigger}>Start a case-related post...</button>
            </div>
            <div className={styles.postOptions}>
              <span>🖼️ Image</span>
              <span>📄 Document</span>
              <span>💼 Case Study</span>
            </div>
          </div>

          {/* Feed */}
          {posts.map(post => (
            <div key={post.id} className={`${styles.card} ${styles.postCard} shadow-premium animate-fade`}>
              <div className={styles.postHeader}>
                <img src={post.avatar} alt={post.author} className={styles.postAvatar} />
                <div className={styles.authorMeta}>
                  <h4>{post.author}</h4>
                  <p>{post.role} • {post.timestamp}</p>
                </div>
                <span className={styles.postCategory}>{post.category}</span>
              </div>
              <div className={styles.postContent}>
                <p>{post.content}</p>
              </div>
              <div className={styles.postActions}>
                <button>👍 {post.likes} Like</button>
                <button>💬 {post.comments} Comment</button>
                <button>🔗 Share</button>
              </div>
            </div>
          ))}
        </main>

        <aside className={`${styles.sidebar} ${styles.rightSidebar}`}>
          <div className={`${styles.card} ${styles.trendsCard} shadow-premium`}>
            <h3>Trending Laws</h3>
            <div className={styles.trendItem}>
              <strong>Section 498A</strong>
              <p>1,240 people consulted</p>
            </div>
            <div className={styles.trendItem}>
              <strong>IT Act 2000</strong>
              <p>856 people consulted</p>
            </div>
            <div className={styles.trendItem}>
              <strong>BNS 2023</strong>
              <p>2,105 people consulted</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
