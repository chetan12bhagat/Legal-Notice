import type { Metadata } from "next";
// Build-ID: DARK_MODE_V3_FINAL
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";

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
      <body className={`${inter.variable} ${playfair.variable}`}>
        <SplashScreen />
        <Navbar />
        <main>{children}</main>
        
        <footer className="footer-rich">
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1.5fr', gap: '4rem', marginBottom: '6rem' }}>
              <div className="footer-col">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v17m-9-5l9-2 9 2M3 10l9-2 9 2M6 20h12" />
                  </svg>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, fontFamily: 'var(--font-serif)', letterSpacing: '-1px' }}>NYAY<span style={{ color: 'var(--accent-gold)' }}>PLATFORM</span></span>
                </div>
                <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  India's leading digital legal infrastructure. Bridging the gap between 
                  complex judicial processes and citizen empowerment through AI-driven intelligence.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.5rem' }}>𝕏</a>
                  <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.5rem' }}>💼</a>
                  <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.5rem' }}>📷</a>
                </div>
              </div>

              <div className="footer-col">
                <h4>Platform</h4>
                <Link href="/laws" className="footer-link">Law Directory</Link>
                <Link href="/consult" className="footer-link">Consultation</Link>
                <Link href="/lawyers" className="footer-link">Find Lawyers</Link>
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
                <p style={{ marginBottom: '1.5rem' }}>Level 24, Judicial Plaza,<br/>Sansad Marg, New Delhi, 110001</p>
                <p style={{ color: 'var(--accent-gold)', fontWeight: 700 }}>support@nyayplatform.gov.in</p>
                <p style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '1rem' }}>+91 11 4000 9000</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                © 2026 Nyay Digital Infrastructure Platform. All rights reserved. 
                <span style={{ marginLeft: '1.5rem', color: 'var(--accent-gold)' }}>ISO 27001 Certified</span>
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <img src="https://www.svgrepo.com/show/508401/aws.svg" width="32" alt="AWS" style={{ opacity: 0.4 }} />
                <img src="https://www.svgrepo.com/show/354444/tensorflow.svg" width="32" alt="AI" style={{ opacity: 0.4 }} />
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
