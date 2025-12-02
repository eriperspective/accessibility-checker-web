import { useState } from 'react'
import './ScanForm.css'

function ScanForm({ onScan, loading, onReset, hasResults }) {
  const [url, setUrl] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (url.trim()) {
      onScan(url.trim())
    }
  }

  const handleNewScan = () => {
    setUrl('')
    onReset()
  }

  return (
    <div className="scan-form-container">
      <div className="scan-form-card">
        <h2 className="form-title" id="scan-form-title">
          {hasResults ? 'Scan Complete!' : 'Enter Website URL'}
        </h2>
        <p className="form-description">
          {hasResults 
            ? 'View your results below or start a new scan'
            : 'Analyze any website for WCAG accessibility compliance'
          }
        </p>
        
        {!hasResults && (
          <form onSubmit={handleSubmit} className="scan-form" aria-labelledby="scan-form-title">
            <div className="input-wrapper">
              <label htmlFor="url-input" className="sr-only">
                Website URL to scan
              </label>
              <input
                id="url-input"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="url-input"
                disabled={loading}
                required
                aria-required="true"
                aria-describedby="url-description"
              />
              <span id="url-description" className="sr-only">
                Enter the full URL of the website you want to check for accessibility issues
              </span>
            </div>
            <button 
              type="submit" 
              className="scan-button"
              disabled={loading || !url.trim()}
              aria-label={loading ? 'Analyzing website accessibility' : 'Start accessibility scan'}
            >
              {loading ? (
                <>
                  <span className="spinner" role="status" aria-label="Loading"></span>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <svg className="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                  <span>Scan Website</span>
                </>
              )}
            </button>
          </form>
        )}

        {hasResults && (
          <button 
            onClick={handleNewScan}
            className="scan-button new-scan-button"
            aria-label="Start a new accessibility scan"
          >
            <svg className="button-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="23 4 23 10 17 10"></polyline>
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
            </svg>
            <span>Start New Scan</span>
          </button>
        )}
      </div>
    </div>
  )
}

export default ScanForm

