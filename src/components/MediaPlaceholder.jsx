export default function MediaPlaceholder({
  videoSrc,
  posterSrc,
  embedUrl,
  label = 'Demo recording coming soon',
  title,
  mediaAspect = 'video',
}) {
  const slotClass =
    mediaAspect === 'portrait' ? 'media-slot media-slot-portrait' : 'media-slot'

  if (videoSrc) {
    return (
      <div className={slotClass}>
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
      <div className={slotClass}>
        <img
          src={posterSrc}
          alt={title ?? 'Project preview'}
          className={
            mediaAspect === 'portrait' ? 'media-poster media-poster-portrait' : 'media-poster'
          }
        />
      </div>
    )
  }

  if (embedUrl) {
    return (
      <div className={`${slotClass} media-embed`}>
        <iframe src={embedUrl} title={title ?? 'Project demo'} allowFullScreen loading="lazy" />
      </div>
    )
  }

  return (
    <div className={`${slotClass} media-placeholder`} aria-label={label}>
      <div className="media-placeholder-grid" aria-hidden="true" />
      <p className="media-placeholder-label">{label}</p>
    </div>
  )
}
