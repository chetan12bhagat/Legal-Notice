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
        <footer className="footer">
          <div className="container">
            <div className="footer-content" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', marginBottom: '4rem' }}>
              <div className="footer-brand">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3v17m-9-5l9-2 9 2M3 10l9-2 9 2M6 20h12" />
                  </svg>
                  <span className="brand-name" style={{ fontSize: '1.5rem' }}>Nyay Platform</span>
                </div>
                <p style={{ color: '#94a3b8' }}>Your Legal Rights, Our Priority.</p>
              </div>
              <div className="footer-links-grid" style={{ display: 'flex', gap: '4rem' }}>
                <div>
                  <h4>Platform</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <a href="/">Home</a>
                    <a href="/laws">Law Explorer</a>
                    <a href="/lawyers">Find Lawyers</a>
                  </div>
                </div>
                <div>
                  <h4>Legal</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                    <a href="#">Contact Us</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-bottom" style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
              <p>&copy; 2026 Nyay Platform. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
