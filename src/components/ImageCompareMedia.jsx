import { useCallback, useEffect, useRef, useState } from 'react'

function useCompareSlider() {
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const clamp = (value) => Math.min(100, Math.max(0, value))

  const setFromClientX = useCallback((clientX) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100))
  }, [])

  useEffect(() => {
    const onMove = (event) => {
      if (!dragging.current) return
      setFromClientX(event.clientX)
    }
    const onUp = () => {
      dragging.current = false
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }
  }, [setFromClientX])

  const onTrackPointerDown = (event) => {
    if (event.target.closest('.compare-handle-grip')) return
    if (event.target.closest('.compare-callout')) return
    dragging.current = true
    setFromClientX(event.clientX)
  }

  const onHandlePointerDown = (event) => {
    dragging.current = true
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const nudge = (delta) => {
    setPosition((prev) => clamp(prev + delta))
  }

  return { position, containerRef, onTrackPointerDown, onHandlePointerDown, nudge }
}

function CompareCropPane({ src, region, variant }) {
  const { x, y, w, h } = region

  return (
    <div className={`compare-crop-pane compare-crop-pane-${variant}`}>
      <div
        className="compare-crop-viewport"
        style={{
          '--crop-x': x,
          '--crop-y': y,
          '--crop-w': w,
          '--crop-h': h,
          backgroundImage: `url(${src})`,
        }}
        aria-hidden="true"
      />
      <span className="compare-crop-tag">{variant === 'before' ? 'Before' : 'After'}</span>
    </div>
  )
}

function CompareDetailZoom({ detail, before, after, position }) {
  const { x, y, w, h } = detail.region

  return (
    <div className="compare-detail">
      <p className="compare-detail-label">{detail.label}</p>
      <div
        className="compare-detail-slider"
        style={{
          '--crop-x': x,
          '--crop-y': y,
          '--crop-w': w,
          '--crop-h': h,
        }}
      >
        <div className="compare-detail-viewport">
          <div className="compare-detail-after" style={{ backgroundImage: `url(${after})` }} />
          <div
            className="compare-detail-before"
            style={{
              backgroundImage: `url(${before})`,
              clipPath: `inset(0 ${100 - position}% 0 0)`,
            }}
          />
          <div className="compare-detail-divider" style={{ left: `${position}%` }} />
        </div>
      </div>
      <div className="compare-detail-pair">
        <CompareCropPane src={before} region={detail.region} variant="before" />
        <CompareCropPane src={after} region={detail.region} variant="after" />
      </div>
    </div>
  )
}

function CompareCallout({ callout }) {
  const [open, setOpen] = useState(false)
  const placement = callout.placement ?? 'above'

  return (
    <div
      className={`compare-callout compare-callout-${placement}`}
      style={{ left: `${callout.x * 100}%`, top: `${callout.y * 100}%` }}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerEnter={() => setOpen(true)}
      onPointerLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className="compare-callout-marker"
        aria-expanded={open}
        aria-describedby="compare-callout-tooltip"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="compare-callout-pulse" aria-hidden="true" />
      </button>
      <div
        id="compare-callout-tooltip"
        className={`compare-callout-tooltip ${open ? 'is-visible' : ''}`}
        role="tooltip"
      >
        <p>{callout.text}</p>
      </div>
    </div>
  )
}

export default function ImageCompareMedia({ compare, title }) {
  const { position, containerRef, onTrackPointerDown, onHandlePointerDown, nudge } =
    useCompareSlider()

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault()
      nudge(-2)
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      nudge(2)
    }
  }

  return (
    <div className="compare-media">
      <div className="compare-slider-wrap">
        <div
          ref={containerRef}
          className="compare-slider"
          onPointerDown={onTrackPointerDown}
        >
          <img
            src={compare.after}
            alt={title ?? 'Ray marching comparison'}
            className="compare-img compare-img-after"
            draggable={false}
          />
          <div
            className="compare-before-layer"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <img
              src={compare.before}
              alt=""
              className="compare-img compare-img-before"
              draggable={false}
            />
          </div>

          {compare.callout && <CompareCallout callout={compare.callout} />}

          <div className="compare-handle" style={{ left: `${position}%` }}>
            <button
              type="button"
              className="compare-handle-grip"
              aria-label="Drag to compare before and after"
              onPointerDown={onHandlePointerDown}
              onKeyDown={handleKeyDown}
            >
              <span aria-hidden="true" />
            </button>
          </div>

          <span className="compare-badge compare-badge-before">
            {compare.beforeLabel ?? 'Before'}
          </span>
          <span className="compare-badge compare-badge-after">
            {compare.afterLabel ?? 'After'}
          </span>
        </div>
        <p className="compare-hint">
          Drag the handle to compare. Hover the marker above the cube to see why rollback reaches the surface.
        </p>
      </div>

      {(compare.details ?? []).length > 0 && (
        <div className="compare-details">
          <p className="compare-details-heading">Detail zoom</p>
          <div className="compare-details-grid">
            {(compare.details ?? []).map((detail) => (
              <CompareDetailZoom
                key={detail.label}
                detail={detail}
                before={compare.before}
                after={compare.after}
                position={position}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
