import './Hero.css'

function Hero() {
  return (
    <header className="hero" role="banner">
      <div className="hero-content">
        <div className="hero-icon-sphere" role="presentation" aria-hidden="true"></div>
        <h1 className="hero-title">
          Accessibility Perspective
        </h1>
        <p className="hero-subtitle">
          Professional WCAG Compliance Auditing Tool
        </p>
        <div className="hero-badge" role="note">
          AI-Powered Analysis
        </div>
      </div>
      <div className="hero-gradient" aria-hidden="true"></div>
    </header>
  )
}

export default Hero

