import { Link } from 'react-router-dom'
import { site } from '../content/site.js'
import PhotoPlaceholder from './PhotoPlaceholder.jsx'
import ScrollReveal from './ScrollReveal.jsx'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-inner">
        <ScrollReveal className="hero-content">
          <p className="badge">Computer Science · Visual computing focus</p>
          <h1>{site.name}</h1>
          <p className="hero-degree">
            {site.degree} · {site.university}
          </p>
          <p className="hero-subtitle">{site.tagline}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#projects">
              View Projects
            </a>
            <Link className="btn btn-secondary" to="/writing">
              Read Writing
            </Link>
          </div>
          <p className="hero-meta">
            Expected {site.gradYear} · Started {site.started} · {site.location}
          </p>
        </ScrollReveal>

        <ScrollReveal className="hero-photo-wrap">
          <PhotoPlaceholder />
        </ScrollReveal>
      </div>
    </section>
  )
}
