import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

import video1 from '../../../assets/video/hero1.mp4'
import video2 from '../../../assets/video/hero2.mp4'
import video3 from '../../../assets/video/hero3.mp4'
import video4 from '../../../assets/video/hero4.mp4'
import video5 from '../../../assets/video/hero5.mp4'

import poster1 from '../../../assets/video/hero1-poster.jpg'
import poster2 from '../../../assets/video/hero2-poster.jpg'
import poster3 from '../../../assets/video/hero3-poster.jpg'
import poster4 from '../../../assets/video/hero4-poster.jpg'
import poster5 from '../../../assets/video/hero5-poster.jpg'

const slides = [
  {
    id: 1,
    video: video1,
    poster: poster1,
    title: 'Find Your Dream Home',
    subtitle: 'Premium real estate in Metro Detroit Area',
  },
  {
    id: 2,
    video: video2,
    poster: poster2,
    title: 'Where Families Belong',
    subtitle: 'Discover the best suburbs of Detroit',
  },
  { id: 3, video: video3, poster: poster3, title: 'Your New Beginning', subtitle: 'We help you find the perfect place to call home' },
  { id: 4, video: video4, poster: poster4, title: 'Luxury Without Compromise', subtitle: 'Exceptional homes for exceptional families' },
  { id: 5, video: video5, poster: poster5, title: 'Trusted. Local. Dedicated.', subtitle: 'Your Metro Detroit real estate experts since 2017' },]

function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const videoRefs = useRef([])

  const prev = () => setCurrent(p => (p - 1 + slides.length) % slides.length)
  const next = () => setCurrent(p => (p + 1) % slides.length)

  useEffect(() => {
    const cleanups = []

    slides.forEach((_, i) => {
      const vid = videoRefs.current[i]
      if (!vid) return

      if (i === current) {
        // Запускаємо активне відео з початку
        vid.currentTime = 0
        vid.play().catch(() => {})

        // Перемикаємо за 0.8с до кінця — cross-fade починається поки відео ще грає
        const handleTimeUpdate = () => {
          if (vid.duration && vid.currentTime >= vid.duration - 0.8) {
            vid.removeEventListener('timeupdate', handleTimeUpdate)
            next()
          }
        }
        vid.addEventListener('timeupdate', handleTimeUpdate)
        cleanups.push(() => vid.removeEventListener('timeupdate', handleTimeUpdate))
      }
      // Не зупиняємо неактивні відео — вони грають під час fade-out
      // щоб не було чорного екрану між переходами
    })

    return () => cleanups.forEach(fn => fn())
  }, [current])

  // Preload всіх відео одразу при монтуванні
  useEffect(() => {
    slides.forEach((_, i) => {
      const vid = videoRefs.current[i]
      if (vid && i !== 0) {
        vid.load()
      }
    })
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-dark">

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className="absolute inset-0"
          style={{
            opacity: index === current ? 1 : 0,
            zIndex: index === current ? 1 : 0,
            transition: 'opacity 800ms ease-in-out',
          }}
        >
          <video
            ref={el => videoRefs.current[index] = el}
            muted
            playsInline
            preload="auto"
            poster={slide.poster}
            className="hidden sm:block w-full h-full object-cover"
          >
            <source src={slide.video} type="video/mp4" />
          </video>

          <img
            src={slide.poster}
            alt={slide.title}
            className="sm:hidden w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Текст */}
      <div className="absolute bottom-24 sm:bottom-32 left-6 sm:left-16 z-20 max-w-[85vw] sm:max-w-2xl">
        <p className="text-gold tracking-widest text-xs font-sans uppercase mb-3 sm:mb-4">
          KVK Realty Group
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white mb-4 sm:mb-6 leading-tight">
          {slides[current].title}
        </h1>
        <p className="text-white/70 tracking-widest text-xs sm:text-sm font-sans uppercase mb-6 sm:mb-8">
          {slides[current].subtitle}
        </p>
        <Link
          to="/buy"
          className="border border-gold text-gold px-6 sm:px-8 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 inline-block"
        >
          Explore Properties
        </Link>
      </div>

      {/* Стрілки */}
      <div className="absolute bottom-10 sm:bottom-16 left-1/2 -translate-x-1/2 flex gap-6 sm:gap-8 z-20">
        <button onClick={prev} className="text-white text-3xl hover:text-gold transition-colors duration-300">‹</button>
        <button onClick={next} className="text-white text-3xl hover:text-gold transition-colors duration-300">›</button>
      </div>

      {/* Індикатор */}
      <div className="absolute bottom-4 sm:bottom-8 left-6 sm:left-16 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-px transition-all duration-300 ${
              index === current ? 'w-12 bg-gold' : 'w-6 bg-white/40'
            }`}
          />
        ))}
      </div>

    </div>
  )
}

export default HeroSlider