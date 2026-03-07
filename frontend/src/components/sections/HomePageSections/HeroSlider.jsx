import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80',
    title: 'Find Your Dream Home',
    subtitle: 'Premium real estate in the best locations',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80',
    title: 'Luxury Living Awaits',
    subtitle: 'Discover exclusive properties with KVK Realty Group',
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
    }, 6500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-screen overflow-hidden">

      {/* Слайди */}
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
          {/* Темний оверлей */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Текст */}
      <div className="absolute bottom-32 left-16 text-white z-10">
        <h1 className="text-6xl font-serif mb-4">
          {slides[current].title}
        </h1>
        <p className="text-lg tracking-widest uppercase opacity-80">
          {slides[current].subtitle}
        </p>
      </div>

    </div>
  )
}

export default HeroSlider