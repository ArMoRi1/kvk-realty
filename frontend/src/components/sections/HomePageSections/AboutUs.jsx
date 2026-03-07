import { useEffect, useRef, useState } from 'react'

const fullText = `KVK Realty Group has been helping Metro Detroit families find their perfect home since 2010. 
We know every street, every neighborhood, every hidden gem in the suburbs — because this is our home too. 
Our team of dedicated agents brings honesty, local expertise, and genuine care to every deal. 
We don't just sell houses — we help people build their lives.`

function AboutUs() {
  const [displayedText, setDisplayedText] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const typingRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let i = 0
    setDisplayedText('')
    typingRef.current = setInterval(() => {
      i++
      setDisplayedText(fullText.slice(0, i))
      if (i >= fullText.length) clearInterval(typingRef.current)
    }, 22)
    return () => clearInterval(typingRef.current)
  }, [isVisible])

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen bg-dark flex items-center px-16 py-24 gap-12"
    >
      {/* Фото боса — виїжджає зліва */}
      <div
        className={`flex-1 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-24'
        }`}
      >
        <img
          src="https://pravatar.cc/600?img=47"
          alt="CEO"
          className="w-full h-[500px] object-cover rounded-sm shadow-2xl"
        />
        <p className="text-center mt-4 text-sm tracking-widest text-gold uppercase">
          Founder & CEO
        </p>
      </div>

      {/* Текст — ефект друкування */}
      <div
        className={`flex-1 transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-xs tracking-widest text-gold uppercase mb-4">
          About Us
        </p>
        <h2 className="text-4xl font-serif text-white mb-8">
          KVK Realty Group
        </h2>
        <p className="text-white/60 leading-relaxed text-lg min-h-[200px] font-light">
          {displayedText}
          <span className="text-gold animate-pulse">|</span>
        </p>
      </div>

      {/* Фото команди — виїжджає справа */}
      <div
        className={`flex-1 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-24'
        }`}
      >
        <img
          src="https://pravatar.cc/600?img=32"
          alt="Team"
          className="w-full h-[500px] object-cover rounded-sm shadow-2xl"
        />
        <p className="text-center mt-4 text-sm tracking-widest text-gold uppercase">
          Our Team
        </p>
      </div>
    </section>
  )
}

export default AboutUs