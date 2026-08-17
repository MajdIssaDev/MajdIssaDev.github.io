import { site } from '../content/site.js'

function getInitials(name) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export default function PhotoPlaceholder() {
  if (site.photoSrc) {
    return (
      <div className="hero-photo-stack">
        <div className="photo-frame">
          <img src={site.photoSrc} alt={site.name} className="photo-image halftone-photo" />
        </div>
        {site.location && <p className="photo-location">{site.location}</p>}
      </div>
    )
  }

  return (
    <div className="photo-frame photo-placeholder" aria-label="Portrait placeholder">
      <div className="photo-blob" aria-hidden="true" />
      <span className="photo-initials">{getInitials(site.name)}</span>
      <span className="photo-caption">Portrait coming soon</span>
    </div>
  )
}
