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

      {/* ── ДЕСКТОП (lg+) ── */}
      <div className="hidden lg:flex items-center gap-6 mb-16 max-w-6xl mx-auto">

        <button
          onClick={prev}
          className="text-white/40 hover:text-gold transition-colors duration-300 text-7xl font-thin leading-none flex-shrink-0"
        >
          ‹
        </button>

        <div className="flex items-center gap-16 flex-1">

          {/* Фото */}
          <div className="relative flex-shrink-0">
            <img
              src={agents[active].photo}
              alt={agents[active].name}
              className="w-80 h-96 object-cover object-top"
            />
            <div className="absolute inset-0 border border-gold/20" />
          </div>

          {/* Текст */}
          <div className="flex flex-col justify-center flex-1">

            {/* Мотто */}
            {agents[active].motto && (
              <p className="text-white/40 font-sans font-light italic text-lg leading-relaxed mb-6">
                "{agents[active].motto}"
              </p>
            )}

            <p className="text-gold text-xs tracking-widest uppercase font-sans mb-3">
              {agents[active].role}
            </p>
            <h3 className="text-5xl font-serif text-white mb-6 leading-tight">
              {agents[active].name}
            </h3>
            <div className="w-8 h-px bg-gold mb-6" />

            {/* Статистика */}
            <div className="flex gap-10">
              {agents[active].deals > 0 && (
                <div>
                  <p className="text-3xl font-serif text-white">{agents[active].deals}</p>
                  <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Deals</p>
                </div>
              )}
              {agents[active].experience > 0 && (
                <div>
                  <p className="text-3xl font-serif text-white">{agents[active].experience}</p>
                  <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Years</p>
                </div>
              )}
              {agents[active].total_volume > 0 && (
                <div>
                  <p className="text-3xl font-serif text-white">
                    ${(agents[active].total_volume / 1_000_000).toFixed(1)}M
                  </p>
                  <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Volume</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={next}
          className="text-white/40 hover:text-gold transition-colors duration-300 text-7xl font-thin leading-none flex-shrink-0"
        >
          ›
        </button>
      </div>

      {/* ── МОБІЛЬНИЙ (< lg) ── */}
      <div className="lg:hidden mb-10">
        <div className="flex items-center gap-4">

          <button
            onClick={prev}
            className="text-white/40 hover:text-gold transition-colors duration-300 text-5xl font-thin leading-none flex-shrink-0"
          >
            ‹
          </button>

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
              {agents[active].motto && (
                <p className="text-white/40 font-sans font-light italic text-sm leading-relaxed mb-3 px-4">
                  "{agents[active].motto}"
                </p>
              )}
              <p className="text-gold text-xs tracking-widest uppercase font-sans mb-2">
                {agents[active].role}
              </p>
              <h3 className="text-2xl font-serif text-white mb-4">
                {agents[active].name}
              </h3>
              <div className="w-8 h-px bg-gold mx-auto" />
            </div>
          </div>

          <button
            onClick={next}
            className="text-white/40 hover:text-gold transition-colors duration-300 text-5xl font-thin leading-none flex-shrink-0"
          >
            ›
          </button>
        </div>
      </div>

      {/* Міні аватари */}
      <div className="flex justify-center gap-3 sm:gap-4 flex-wrap max-w-6xl mx-auto">
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