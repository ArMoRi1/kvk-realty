import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    title: 'Find Your Dream Home',
    subtitle: 'Premium real estate in Metro Detroit Area',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    title: 'Where Families Belong',
    subtitle: 'Discover the best suburbs of Detroit',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80',
    title: 'Your New Beginning',
    subtitle: 'We help you find the perfect place to call home',
  },
]

function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 7000)
    return () => clearInterval(timer)
  }, [])

  const prev = () => setCurrent(prev => (prev - 1 + slides.length) % slides.length)
  const next = () => setCurrent(prev => (prev + 1) % slides.length)

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
      ))}

      {/* Текст */}
      <div className="absolute bottom-32 left-16 z-10">
        <p className="text-gold tracking-widest text-xs font-sans uppercase mb-4">
          KVK Realty Group
        </p>
        <h1 className="text-7xl font-serif text-white mb-6 leading-tight">
          {slides[current].title}
        </h1>
        <p className="text-white/70 tracking-widest text-sm font-sans uppercase mb-8">
          {slides[current].subtitle}
        </p>
        <Link to="/buy" className="border border-gold text-gold px-8 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300">
          Explore Properties
        </Link>
      </div>

      {/* Стрілки */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-8 z-10">
        <button
          onClick={prev}
          className="text-white text-3xl hover:text-gold transition-colors duration-300"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="text-white text-3xl hover:text-gold transition-colors duration-300"
        >
          ›
        </button>
      </div>

      {/* Індикатор слайдів */}
      <div className="absolute bottom-8 left-16 flex gap-3 z-10">
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