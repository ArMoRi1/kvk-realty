import { useState } from 'react'
import { agents } from '../../../mocks/agents'

function AgentsHero() {
  const [selected, setSelected] = useState(agents[0])

  return (
    <div className="w-full min-h-screen bg-dark flex pt-24">

      {/* Ліва частина — сітка агентів */}
      <div className="w-1/2 border-r border-white/10 overflow-y-auto h-[calc(100vh-96px)] sticky top-24">
        <div className="p-8">
          <p className="text-gold text-xs tracking-widest uppercase font-sans mb-2">KVK Realty Group</p>
          <h1 className="text-4xl font-serif text-white mb-8">Our Agents</h1>
          <div className="grid grid-cols-2 gap-4">
            {agents.map(agent => (
              <button
                key={agent.id}
                onClick={() => setSelected(agent)}
                className={`relative group overflow-hidden transition-all duration-300 ${
                  selected.id === agent.id ? 'ring-1 ring-gold' : ''
                }`}
              >
                <img
                  src={agent.photo}
                  alt={agent.name}
                  className="w-full h-56 object-cover transition-all duration-500 group-hover:brightness-75"
                />
                {/* Ім'я при hover */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-serif text-lg">{agent.name}</p>
                  <p className="text-gold text-xs tracking-widest uppercase">{agent.role}</p>
                </div>
                {/* Активний агент — завжди видно ім'я */}
                {selected.id === agent.id && (
                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-serif text-lg">{agent.name}</p>
                    <p className="text-gold text-xs tracking-widest uppercase">{agent.role}</p>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Права частина — візитівка агента */}
      <div className="w-1/2 sticky top-24 h-[calc(100vh-96px)] overflow-y-auto">
        <div className="p-16 flex flex-col h-full justify-center">

          <img
            src={selected.photo}
            alt={selected.name}
            className="w-48 h-56 object-cover mb-8"
          />

          <p className="text-gold text-xs tracking-widest uppercase font-sans mb-3">
            {selected.role}
          </p>
          <h2 className="text-5xl font-serif text-white mb-6">
            {selected.name}
          </h2>
          <div className="w-12 h-px bg-gold mb-8" />

          {/* Статистика */}
          <div className="flex gap-12 mb-10">
            <div>
              <p className="text-4xl font-serif text-white">{selected.deals}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Deals Closed</p>
            </div>
            <div>
              <p className="text-4xl font-serif text-white">{selected.experience}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Years Experience</p>
            </div>
          </div>

          {/* Контакти */}
          <div className="flex flex-col gap-4 mb-10">
            <div>
              <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">Phone</p>
              <p className="text-white font-sans font-light">{selected.phone}</p>
            </div>
            <div>
              <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">Email</p>
              <p className="text-white font-sans font-light">{selected.email}</p>
            </div>
          </div>

          <button className="border border-gold text-gold px-8 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 self-start">
            Contact Agent
          </button>

        </div>
      </div>

    </div>
  )
}

export default AgentsHero