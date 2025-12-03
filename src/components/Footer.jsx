import './Footer.css'

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <p className="footer-text">
          Made by <span className="footer-author">eriperspective</span>
        </p>
        <p className="footer-text">
          Built with <span className="heart" aria-label="love">❤️</span> powered by goose AI Development
        </p>
        <nav className="footer-links" aria-label="Footer navigation">
          <a 
            href="https://www.w3.org/WAI/WCAG21/quickref/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            WCAG Guidelines
            <span className="sr-only"> (opens in new tab)</span>
          </a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer

