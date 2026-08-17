import { useState } from 'react'
import MediaPlaceholder from './MediaPlaceholder.jsx'
import ImageCompareMedia from './ImageCompareMedia.jsx'
import ImageLightbox from './ImageLightbox.jsx'
import ScrollReveal from './ScrollReveal.jsx'

export default function ProjectCard({ project, featured = false }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const gallery = project.gallery ?? []
  const hasHeroMedia =
    project.videoSrc ||
    project.posterSrc ||
    project.compare ||
    (!featured && project.embedUrl)
  const mediaLabel = featured
    ? project.videoSrc
      ? undefined
      : project.compare
        ? undefined
        : 'SDF demo recording coming soon'
    : hasHeroMedia || gallery.length > 0
      ? undefined
      : 'Screenshots coming soon'

  return (
    <ScrollReveal>
      <article className={`card project-card ${featured ? 'project-card-featured' : ''}`}>
        {project.compare ? (
          <div className="media-slot media-slot-compare">
            <ImageCompareMedia compare={project.compare} title={project.title} />
          </div>
        ) : (
          <MediaPlaceholder
            videoSrc={project.videoSrc}
            posterSrc={project.posterSrc}
            embedUrl={featured ? null : project.embedUrl}
            label={mediaLabel}
            title={project.title}
            mediaAspect={project.mediaAspect ?? 'video'}
            onPosterClick={
              gallery.length > 0
                ? () => {
                    const posterIndex = gallery.indexOf(project.posterSrc)
                    setLightboxIndex(posterIndex >= 0 ? posterIndex : 0)
                  }
                : undefined
            }
          />
        )}
        <div className="project-body">
          <div className="project-header">
            <div>
              {featured && <p className="eyebrow">Featured Project</p>}
              <h3>{project.title}</h3>
              <p className="project-hook">{project.hook}</p>
            </div>
            {project.github ? (
              <a
                className="btn btn-ghost btn-sm"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            ) : (
              <span className="btn btn-ghost btn-sm project-private-badge">Private repo</span>
            )}
          </div>

          <p className="project-description">{project.description}</p>

          {project.keyFeature && (
            <div className="project-key-feature">
              <h4>{project.keyFeatureLabel ?? 'Key feature'}</h4>
              <p>{project.keyFeature}</p>
            </div>
          )}

          <ul className="project-highlights">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {gallery.length > 1 && (
            <div className="project-gallery">
              {gallery.slice(1).map((src, offset) => (
                <button
                  key={src}
                  type="button"
                  className="project-gallery-btn"
                  onClick={() => setLightboxIndex(offset + 1)}
                  aria-label={`View ${project.title} screenshot ${offset + 2}`}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          )}

          <ul className="tech-row" aria-label="Technology stack">
            {project.tech.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <p className="project-note">{project.demoNote}</p>
        </div>
      </article>
      <ImageLightbox
        images={gallery}
        index={lightboxIndex}
        title={project.title}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </ScrollReveal>
  )
}
