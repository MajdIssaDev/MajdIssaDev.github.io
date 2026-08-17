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

export default function ImageCompareMedia({ compare, title }) {
  const { position, containerRef, onTrackPointerDown, onHandlePointerDown, nudge } =
    useCompareSlider()

  const beforeLabel = compare.beforeLabel ?? 'Before'
  const afterLabel = compare.afterLabel ?? 'After'

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
        <div ref={containerRef} className="compare-slider" onPointerDown={onTrackPointerDown}>
          <img
            src={compare.after}
            alt=""
            className="compare-img compare-img-sizer"
            draggable={false}
            aria-hidden="true"
          />

          <div className="compare-after-layer">
            <img
              src={compare.after}
              alt={title ?? 'Ray marching comparison'}
              className="compare-img compare-img-after"
              draggable={false}
            />
            <span className="compare-badge compare-badge-after">{afterLabel}</span>
          </div>

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
            <span className="compare-badge compare-badge-before">{beforeLabel}</span>
          </div>

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
        </div>
        <p className="compare-hint">
          Drag the handle to compare {beforeLabel.toLowerCase()} against {afterLabel.toLowerCase()}.
        </p>
      </div>
    </div>
  )
}
