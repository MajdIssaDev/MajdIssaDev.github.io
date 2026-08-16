import { Link } from 'react-router-dom'
import { site } from '../content/site.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p>
          {site.name} — {site.title}
        </p>
        <div className="footer-links">
          <a href={site.github} target="_blank" rel="noreferrer">
            @{site.githubHandle}
          </a>
          <Link to="/writing">Writing</Link>
        </div>
      </div>
    </footer>
  )
}
