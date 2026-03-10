import { useEffect, useRef, useState } from 'react'

/**
 * useInView — повертає [ref, isInView]
 * Спрацьовує коли елемент з'являється у viewport
 *
 * @param {number} threshold — % елемента у viewport (0-1, default 0.2)
 * @param {boolean} once — тільки один раз (default true)
 */
export function useInView(threshold = 0.2, once = true) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsInView(false)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold, once])

  return [ref, isInView]
}