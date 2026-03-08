import { useState } from 'react'
import { agents } from '../../../mocks/agents'
import ContactAgentModal from '../../ui/ContactAgentModal'
function AgentsHero() {
  const [selected, setSelected] = useState(agents[0])
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="w-full min-h-screen bg-dark flex pt-24">

      {/* Ліва частина — сітка агентів */}
      <div className="w-1/2 border-r border-white/10 overflow-y-auto h-[calc(100vh-96px)] sticky top-24">
        <div className="p-6">
          <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">KVK Realty Group</p>
          <h1 className="text-3xl font-serif text-white mb-6">Our Agents</h1>
          <div className="grid grid-cols-2 gap-3">
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
                  className="w-full h-48 object-cover transition-all duration-500 group-hover:brightness-75"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-white font-serif text-base">{agent.name}</p>
                  <p className="text-gold text-xs tracking-widest uppercase">{agent.role}</p>
                </div>
                {selected.id === agent.id && (
                  <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-serif text-base">{agent.name}</p>
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
        <div className="flex flex-col h-full">

          {/* Фото на всю ширину зверху */}
          <div className="relative w-full h-[55%]">
            <img
              src={selected.photo}
              alt={selected.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
          </div>

          {/* Інфо знизу */}
          <div className="px-10 py-6 flex flex-col gap-4">
            <div>
              <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">
                {selected.role}
              </p>
              <h2 className="text-3xl font-serif text-white">
                {selected.name}
              </h2>
            </div>

            <div className="w-8 h-px bg-gold" />

            {/* Статистика */}
            <div className="flex gap-10">
              <div>
                <p className="text-3xl font-serif text-white">{selected.deals}</p>
                <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-0.5">Deals Closed</p>
              </div>
              <div>
                <p className="text-3xl font-serif text-white">{selected.experience}</p>
                <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-0.5">Years Experience</p>
              </div>
            </div>

            {/* Контакти */}
            <div className="flex gap-10">
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-0.5">Phone</p>
                <p className="text-white font-sans font-light text-sm">{selected.phone}</p>
              </div>
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-0.5">Email</p>
                <p className="text-white font-sans font-light text-sm">{selected.email}</p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="border border-gold text-gold px-8 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 self-start"
            >
              Contact Agent
            </button>

            {modalOpen && (
              <ContactAgentModal
                agent={selected}
                onClose={() => setModalOpen(false)}
              />
            )}

          </div>
        </div>
      </div>

    </div>
  )
}

export default AgentsHero