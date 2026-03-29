import { useState, useEffect } from 'react'
import { ChevronUp } from 'lucide-react'

function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-[100] w-10 h-10 flex items-center justify-center border border-white/20 bg-[#0A0A0A]/90 text-white/50 hover:border-gold hover:text-gold transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <ChevronUp size={18} />
    </button>
  )
}

export default ScrollToTop