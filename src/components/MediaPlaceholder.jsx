export default function MediaPlaceholder({
  videoSrc,
  posterSrc,
  embedUrl,
  label = 'Demo recording coming soon',
  title,
}) {
  if (videoSrc) {
    return (
      <div className="media-slot">
        <video
          className="media-video"
          src={videoSrc}
          poster={posterSrc ?? undefined}
          controls
          playsInline
          preload="metadata"
        >
          <track kind="captions" />
        </video>
      </div>
    )
  }

  if (posterSrc) {
    return (
      <div className="media-slot">
        <img src={posterSrc} alt={title ?? 'Project preview'} className="media-poster" />
      </div>
    )
  }

  if (embedUrl) {
    return (
      <div className="media-slot media-embed">
        <iframe
          src={embedUrl}
          title={title ?? 'Project demo'}
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className="media-slot media-placeholder" aria-label={label}>
      <div className="media-placeholder-grid" aria-hidden="true" />
      <p className="media-placeholder-label">{label}</p>
    </div>
  )
}
