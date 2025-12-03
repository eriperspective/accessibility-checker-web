import { useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import ScanForm from './components/ScanForm'
import Results from './components/Results'
import Footer from './components/Footer'
import ThemeToggle from './components/ThemeToggle'
import SkipLink from './components/SkipLink'
import BackToTop from './components/BackToTop'

function App() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleScan = async (url) => {
    setLoading(true)
    setError(null)
    setResults(null)

    try {
      const response = await fetch('https://accessibility-checker-api.onrender.com/api/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to scan website')
      }

      setResults(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setResults(null)
    setError(null)
  }

  return (
    <div className="app">
      <SkipLink />
      <ThemeToggle />
      <BackToTop />
      <Hero />
      <main id="main-content" className="main-content" tabIndex="-1">
        <ScanForm 
          onScan={handleScan} 
          loading={loading} 
          onReset={handleReset}
          hasResults={!!results}
        />
        {error && (
          <div className="error-container" role="alert" aria-live="assertive">
            <div className="error-card">
              <span className="error-icon" aria-hidden="true">⚠️</span>
              <h3>Error</h3>
              <p>{error}</p>
            </div>
          </div>
        )}
        {results && <Results data={results} />}
      </main>
      <Footer />
    </div>
  )
}

export default App

