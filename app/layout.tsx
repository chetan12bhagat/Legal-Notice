import type { Metadata } from "next";
// Build-ID: DARK_MODE_V3_FINAL
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Nyay Platform | Your Professional E-Court Assistant",
  description: "Find lawyers, access Indian laws, and consult experts in a seamless e-court experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        
        <footer className="footer-rich">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '4rem', marginBottom: '6rem' }}>
              <div className="footer-col">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--primary-blue)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v17m-9-5l9-2 9 2" />
                  </svg>
                  <span style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text-dark)', letterSpacing: '-1px' }}>NYAY<span style={{ color: 'var(--primary-blue)' }}>PLATFORM</span></span>
                </div>
                <p style={{ fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  India's leading digital legal infrastructure. Bridging the gap between 
                  complex judicial processes and citizen empowerment through AI-driven intelligence.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', textDecoration: 'none' }}>𝕏</a>
                  <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', textDecoration: 'none' }}>💼</a>
                  <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.2rem', textDecoration: 'none' }}>📷</a>
                </div>
              </div>

              <div className="footer-col">
                <h4>Platform</h4>
                <Link href="/laws" className="footer-link">Law Directory</Link>
                <Link href="/consult" className="footer-link">Consultation</Link>
                <Link href="/lawyers" className="footer-link">Find Experts</Link>
                <Link href="#" className="footer-link">Case Tracking</Link>
              </div>

              <div className="footer-col">
                <h4>Governance</h4>
                <a href="#" className="footer-link">Privacy Protocol</a>
                <a href="#" className="footer-link">Terms of Service</a>
                <a href="#" className="footer-link">Compliance</a>
                <a href="#" className="footer-link">API Access</a>
              </div>

              <div className="footer-col">
                <h4>Global HQ</h4>
                <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>Level 24, Judicial Plaza,<br/>Sansad Marg, New Delhi, 110001</p>
                <p style={{ color: 'var(--primary-blue)', fontWeight: 800 }}>support@nyayplatform.gov.in</p>
                <p style={{ fontSize: '1.1rem', fontWeight: 900, marginTop: '1rem', color: 'var(--text-dark)' }}>+91 11 4000 9000</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                © 2026 Nyay Digital Infrastructure Platform. All rights reserved. 
                <span style={{ marginLeft: '1.5rem', color: 'var(--primary-blue)', fontWeight: 700 }}>ISO 27001 Certified</span>
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <img src="https://www.svgrepo.com/show/508401/aws.svg" width="28" alt="AWS" style={{ opacity: 0.3 }} />
                <img src="https://www.svgrepo.com/show/354444/tensorflow.svg" width="28" alt="AI" style={{ opacity: 0.3 }} />
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
