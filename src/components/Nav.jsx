import { Link, useLocation } from 'react-router-dom'
import { site } from '../content/site.js'

const homeLinks = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <header className="nav">
      <div className="nav-inner">
        <Link className="brand" to="/">
          <span className="brand-mark" aria-hidden="true" />
          {site.name}
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {isHome ? (
            homeLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))
          ) : (
            <Link to="/#about">About</Link>
          )}
          <Link to="/writing" className={location.pathname.startsWith('/writing') ? 'active' : ''}>
            Writing
          </Link>
        </nav>

        <a className="btn btn-ghost btn-sm" href={site.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </header>
  )
}
