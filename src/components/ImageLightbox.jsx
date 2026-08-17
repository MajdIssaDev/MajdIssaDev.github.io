import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function ImageLightbox({ images, index, title, onClose, onChange }) {
  const closeRef = useRef(null)
  const open = index != null && images.length > 0

  useEffect(() => {
    if (!open) return undefined

    const previousOverflow = document.body.style.overflow
    const previouslyFocused = document.activeElement
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (images.length < 2) return
      if (event.key === 'ArrowRight') {
        onChange((index + 1) % images.length)
      }
      if (event.key === 'ArrowLeft') {
        onChange((index - 1 + images.length) % images.length)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, index, images.length, onClose, onChange])

  if (!open) return null

  const src = images[index]
  const countLabel = `${index + 1} / ${images.length}`

  return createPortal(
    <div
      className="lightbox"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div
        className="lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${title} screenshot ${countLabel}`}
      >
        <button
          ref={closeRef}
          type="button"
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close screenshot"
        >
          Close
        </button>

        {images.length > 1 && (
          <button
            type="button"
            className="lightbox-nav lightbox-prev"
            onClick={() => onChange((index - 1 + images.length) % images.length)}
            aria-label="Previous screenshot"
          >
            ‹
          </button>
        )}

        <img className="lightbox-image" src={src} alt={`${title} screenshot ${countLabel}`} />

        {images.length > 1 && (
          <button
            type="button"
            className="lightbox-nav lightbox-next"
            onClick={() => onChange((index + 1) % images.length)}
            aria-label="Next screenshot"
          >
            ›
          </button>
        )}

        {images.length > 1 && <p className="lightbox-count">{countLabel}</p>}
      </div>
    </div>,
    document.body,
  )
}
