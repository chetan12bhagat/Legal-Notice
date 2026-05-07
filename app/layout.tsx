import type { Metadata } from "next";
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
  title: "Legal Notice | Your Professional E-Court Assistant",
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
            <div className="footer-content">
              <div className="footer-brand">
                <img src="/images/logo.png" alt="Legal Notice" className="footer-logo" />
                <p>Your Legal Rights, Our Priority.</p>
              </div>
              <div className="footer-links-grid">
                <div>
                  <h4>Platform</h4>
                  <a href="#">Social Feed</a>
                  <a href="#">Lawyers</a>
                  <a href="#">Consultation</a>
                </div>
                <div>
                  <h4>Legal</h4>
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms of Service</a>
                  <a href="#">Contact Us</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 Legal Notice. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
