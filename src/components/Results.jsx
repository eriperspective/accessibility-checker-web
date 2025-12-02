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
          <div className="summary-icon" aria-hidden="true">🔴</div>
          <div className="summary-content">
            <div className="summary-number">{summary.critical}</div>
            <div className="summary-label">Critical Issues</div>
          </div>
        </div>

        <div className="summary-card warning" role="listitem">
          <div className="summary-icon" aria-hidden="true">🟡</div>
          <div className="summary-content">
            <div className="summary-number">{summary.warnings}</div>
            <div className="summary-label">Warnings</div>
          </div>
        </div>

        <div className="summary-card passed" role="listitem">
          <div className="summary-icon" aria-hidden="true">✅</div>
          <div className="summary-content">
            <div className="summary-number">{summary.passed}</div>
            <div className="summary-label">Passed Checks</div>
          </div>
        </div>
      </div>

      {/* Critical Issues */}
      {issues.critical && issues.critical.length > 0 && (
        <section className="issues-section" aria-labelledby="critical-heading">
          <h3 id="critical-heading" className="section-title">
            <span className="title-icon" aria-hidden="true">🔴</span>
            Critical Issues
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
            <span className="title-icon" aria-hidden="true">🟡</span>
            Warnings
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
            <span className="title-icon" aria-hidden="true">✅</span>
            Passed Checks
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
          <span className="title-icon" aria-hidden="true">💡</span>
          Next Steps
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

