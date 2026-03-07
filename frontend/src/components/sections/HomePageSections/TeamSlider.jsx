import { useState } from 'react'
import { agents } from '../../../mocks/agents'

function TeamSlider() {
  const [active, setActive] = useState(0)

  const prev = () => setActive(prev => (prev - 1 + agents.length) % agents.length)
  const next = () => setActive(prev => (prev + 1) % agents.length)

  return (
    <div className="w-full bg-dark py-24 px-16 border-t border-white/10">

      <div className="text-center mb-16">
        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">The People Behind KVK</p>
        <h2 className="text-4xl font-serif text-white">Meet Our Team</h2>
        <div className="w-12 h-px bg-gold mx-auto mt-6" />
      </div>

      {/* Активний агент зі стрілками */}
      <div className="flex items-center gap-8 mb-16 max-w-4xl mx-auto">

        {/* Стрілка ліво */}
        <button
          onClick={prev}
          className="text-white/40 hover:text-gold transition-colors duration-300 text-7xl font-thin leading-none"
        >
          ‹
        </button>

        {/* Агент */}
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

        {/* Стрілка право */}
        <button
          onClick={next}
          className="text-white/40 hover:text-gold transition-colors duration-300 text-7xl font-thin leading-none"
        >
          ›
        </button>

      </div>

      {/* Міні аватари */}
      <div className="flex justify-center gap-4 flex-wrap max-w-5xl mx-auto">
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
              className="w-16 h-16 object-cover"
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