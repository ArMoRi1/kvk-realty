import { useState, useEffect } from 'react'
import { getTeam } from '../../../api/team'

function TeamSlider() {
  const [agents, setAgents] = useState([])
  const [active, setActive] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTeam()
      .then(res => setAgents(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const prev = () => setActive(prev => (prev - 1 + agents.length) % agents.length)
  const next = () => setActive(prev => (prev + 1) % agents.length)

  if (loading || agents.length === 0) return (
    <div className="w-full bg-dark py-24 border-t border-white/10 flex items-center justify-center">
      <p className="text-gold text-xs tracking-widest uppercase font-sans">Loading...</p>
    </div>
  )

  return (
    <div className="w-full bg-dark py-16 sm:py-24 px-6 sm:px-10 lg:px-16 border-t border-white/10">

      {/* Заголовок */}
      <div className="text-center mb-10 sm:mb-16">
        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">The People Behind KVK</p>
        <h2 className="text-3xl sm:text-4xl font-serif text-white">Meet Our Team</h2>
        <div className="w-12 h-px bg-gold mx-auto mt-6" />
      </div>

      {/* ── ДЕСКТОП (lg+) — горизонтальний layout зі стрілками ── */}
      <div className="hidden lg:flex items-center gap-8 mb-16 max-w-4xl mx-auto">
        <button
          onClick={prev}
          className="text-white/40 hover:text-gold transition-colors duration-300 text-7xl font-thin leading-none"
        >
          ‹
        </button>

        <div className="flex items-center gap-16 flex-1">
          <div className="relative">
            <img
              src={agents[active].photo}
              alt={agents[active].name}
              className="w-64 h-80 object-cover"
            />
            <div className="absolute inset-0 border border-gold/20" />
          </div>
          <div>
            <p className="text-gold text-xs tracking-widest uppercase font-sans mb-3">
              {agents[active].role}
            </p>
            <h3 className="text-4xl font-serif text-white mb-6">
              {agents[active].name}
            </h3>
            <div className="w-8 h-px bg-gold" />
          </div>
        </div>

        <button
          onClick={next}
          className="text-white/40 hover:text-gold transition-colors duration-300 text-7xl font-thin leading-none"
        >
          ›
        </button>
      </div>

      {/* ── МОБІЛЬНИЙ (< lg) — фото зверху, інфо знизу, стрілки по боках ── */}
      <div className="lg:hidden mb-10">
        <div className="flex items-center gap-4">

          {/* Стрілка ліво */}
          <button
            onClick={prev}
            className="text-white/40 hover:text-gold transition-colors duration-300 text-5xl font-thin leading-none flex-shrink-0"
          >
            ‹
          </button>

          {/* Фото + інфо */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-full max-w-xs mx-auto">
              <img
                src={agents[active].photo}
                alt={agents[active].name}
                className="w-full aspect-square object-cover object-top"
              />
              <div className="absolute inset-0 border border-gold/20" />
            </div>
            <div className="text-center mt-6">
              <p className="text-gold text-xs tracking-widest uppercase font-sans mb-2">
                {agents[active].role}
              </p>
              <h3 className="text-2xl font-serif text-white mb-4">
                {agents[active].name}
              </h3>
              <div className="w-8 h-px bg-gold mx-auto" />
            </div>
          </div>

          {/* Стрілка право */}
          <button
            onClick={next}
            className="text-white/40 hover:text-gold transition-colors duration-300 text-5xl font-thin leading-none flex-shrink-0"
          >
            ›
          </button>
        </div>
      </div>

      {/* Міні аватари — однакові на всіх екранах */}
      <div className="flex justify-center gap-3 sm:gap-4 flex-wrap max-w-5xl mx-auto">
        {agents.map((agent, index) => (
          <button
            key={agent.id}
            onClick={() => setActive(index)}
            className={`relative transition-all duration-300 ${
              index === active
                ? 'scale-110 brightness-100'
                : 'scale-100 brightness-50 hover:brightness-75'
            }`}
          >
            <img
              src={agent.photo}
              alt={agent.name}
              className="w-12 h-12 sm:w-16 sm:h-16 object-cover object-top"
            />
            {index === active && (
              <div className="absolute inset-0 border border-gold" />
            )}
          </button>
        ))}
      </div>

    </div>
  )
}

export default TeamSlider