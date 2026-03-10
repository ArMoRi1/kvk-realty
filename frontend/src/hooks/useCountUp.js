import { useEffect, useRef, useState } from 'react'

/**
 * useCountUp — анімує число від 0 до target
 * @param {number} target — кінцеве значення
 * @param {number} duration — тривалість в мс (default 1500)
 * @param {boolean} trigger — запускати анімацію (default true)
 */
export function useCountUp(target, duration = 1500, trigger = true) {
  const [count, setCount] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!trigger || target === undefined || target === null) return

    let startTime = null
    const startValue = 0

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing: easeOutQuart
      const eased = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(eased * (target - startValue) + startValue))

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration, trigger])

  return count
}