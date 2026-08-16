import MediaPlaceholder from './MediaPlaceholder.jsx'
import ScrollReveal from './ScrollReveal.jsx'

export default function ProjectCard({ project, featured = false }) {
  const mediaLabel = featured
    ? 'SDF demo recording coming soon'
    : project.gallery.length === 0
      ? 'Screenshots coming soon'
      : undefined

  return (
    <ScrollReveal>
      <article className={`card project-card ${featured ? 'project-card-featured' : ''}`}>
        <MediaPlaceholder
          videoSrc={project.videoSrc}
          posterSrc={project.posterSrc}
          embedUrl={featured ? null : project.embedUrl}
          label={mediaLabel}
          title={project.title}
        />

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

          <ul className="project-highlights">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          {project.gallery.length > 0 && (
            <div className="project-gallery">
              {project.gallery.map((src) => (
                <img key={src} src={src} alt="" loading="lazy" />
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
    </ScrollReveal>
  )
}
