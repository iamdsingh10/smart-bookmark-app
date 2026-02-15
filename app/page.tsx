import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="home-page">
      <span className="home-icon">🔖</span>
      <h1>Smart Bookmark</h1>
      <p className="tagline">
        Save, organize, and access your favorite links — all in one clean place.
      </p>
      <Link href="/login" className="cta-link">
        Get Started <span className="arrow">→</span>
      </Link>
      <div className="home-features">
        <div className="feature-pill">
          <span className="feat-icon">⚡</span>
          <span>Instant Save</span>
        </div>
        <div className="feature-pill">
          <span className="feat-icon">🔒</span>
          <span>Private & Secure</span>
        </div>
        <div className="feature-pill">
          <span className="feat-icon">☁️</span>
          <span>Cloud Synced</span>
        </div>
      </div>
    </div>
  );
}