import './Results.css'

function Results({ data }) {
  const { url, score, summary, issues, passed } = data

  const getScoreColor = (score) => {
    if (score >= 8) return 'score-excellent'
    if (score >= 6) return 'score-good'
    if (score >= 4) return 'score-fair'
    return 'score-poor'
  }

  const getScoreLabel = (score) => {
    if (score >= 8) return 'Excellent'
    if (score >= 6) return 'Good'
    if (score >= 4) return 'Needs Work'
    return 'Poor'
  }

  return (
    <div className="results-container" role="region" aria-label="Accessibility scan results" aria-live="polite">
      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Scan complete. Accessibility score: {score} out of 10. {summary.critical} critical issues, {summary.warnings} warnings, and {summary.passed} checks passed.
      </div>

      {/* Score Card */}
      <div className="score-card">
        <div className="score-header">
          <h2 id="score-heading">Accessibility Score</h2>
          <p className="scanned-url">{url}</p>
        </div>
        <div className={`score-display ${getScoreColor(score)}`} aria-labelledby="score-heading" role="img" aria-label={`Score ${score} out of 10, rated as ${getScoreLabel(score)}`}>
          <div className="score-number" aria-hidden="true">{score}</div>
          <div className="score-max" aria-hidden="true">/10</div>
        </div>
        <div className="score-label" aria-hidden="true">{getScoreLabel(score)}</div>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid" role="list" aria-label="Scan summary">
        <div className="summary-card critical" role="listitem">
          <div className="summary-icon critical-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <div className="summary-content">
            <div className="summary-number gradient-number">{summary.critical}</div>
            <div className="summary-label">Critical Issues</div>
          </div>
        </div>

        <div className="summary-card warning" role="listitem">
          <div className="summary-icon warning-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          </div>
          <div className="summary-content">
            <div className="summary-number gradient-number">{summary.warnings}</div>
            <div className="summary-label">Warnings</div>
          </div>
        </div>

        <div className="summary-card passed" role="listitem">
          <div className="summary-icon passed-icon" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
              <polyline points="22 4 12 14.01 9 11.01"/>
            </svg>
          </div>
          <div className="summary-content">
            <div className="summary-number gradient-number">{summary.passed}</div>
            <div className="summary-label">Passed Checks</div>
          </div>
        </div>
      </div>

      {/* Critical Issues */}
      {issues.critical && issues.critical.length > 0 && (
        <section className="issues-section" aria-labelledby="critical-heading">
          <h3 id="critical-heading" className="section-title">
            <span className="title-icon critical-title-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </span>
            <span className="section-title-text">Critical Issues</span>
          </h3>
          <ul className="issues-list" role="list">
            {issues.critical.map((issue, index) => (
              <li key={index} className="issue-card critical-issue">
                <div className="issue-type">{issue.type}</div>
                <div className="issue-message">{issue.message}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Warnings */}
      {issues.warnings && issues.warnings.length > 0 && (
        <section className="issues-section" aria-labelledby="warnings-heading">
          <h3 id="warnings-heading" className="section-title">
            <span className="title-icon warning-title-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </span>
            <span className="section-title-text">Warnings</span>
          </h3>
          <ul className="issues-list" role="list">
            {issues.warnings.map((issue, index) => (
              <li key={index} className="issue-card warning-issue">
                <div className="issue-type">{issue.type}</div>
                <div className="issue-message">{issue.message}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Passed Checks */}
      {passed && passed.length > 0 && (
        <section className="issues-section" aria-labelledby="passed-heading">
          <h3 id="passed-heading" className="section-title">
            <span className="title-icon passed-title-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </span>
            <span className="section-title-text">Passed Checks</span>
          </h3>
          <ul className="issues-list" role="list">
            {passed.map((item, index) => (
              <li key={index} className="issue-card passed-check">
                <div className="issue-type">{item.type}</div>
                <div className="issue-message">{item.message}</div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Recommendations */}
      <section className="recommendations-card" aria-labelledby="recommendations-heading">
        <h3 id="recommendations-heading" className="section-title">
          <span className="title-icon lightbulb-icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="9" y1="18" x2="15" y2="18"/>
              <line x1="10" y1="22" x2="14" y2="22"/>
              <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5.76.76 1.23 1.52 1.41 2.5"/>
            </svg>
          </span>
          <span className="section-title-text">Next Steps</span>
        </h3>
        <ul className="recommendations-list" role="list">
          {summary.critical > 0 && (
            <li>Address critical issues immediately to improve accessibility</li>
          )}
          {summary.warnings > 0 && (
            <li>Review and resolve warning items for better compliance</li>
          )}
          <li>Test with screen readers (NVDA, JAWS, VoiceOver)</li>
          <li>Verify keyboard navigation throughout the site</li>
          <li>Schedule regular accessibility audits</li>
        </ul>
      </section>
    </div>
  )
}

export default Results

