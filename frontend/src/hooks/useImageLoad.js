import { useState } from 'react'

/**
 * useImageLoad — повертає { loaded, onLoad, onError }
 * Використовуй так:
 *
 * const { loaded, onLoad } = useImageLoad()
 *
 * <div className="relative">
 *   {!loaded && <div className="skeleton absolute inset-0" />}
 *   <img onLoad={onLoad} className={loaded ? 'opacity-100' : 'opacity-0'} ... />
 * </div>
 */
export function useImageLoad() {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  const onLoad = () => setLoaded(true)
  const onError = () => {
    setLoaded(true)
    setError(true)
  }
  const reset = () => {
    setLoaded(false)
    setError(false)
  }

  return { loaded, error, onLoad, onError, reset }
}