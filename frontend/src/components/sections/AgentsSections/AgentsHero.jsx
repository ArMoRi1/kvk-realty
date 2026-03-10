import { useState, useEffect } from 'react'
import { getAgents } from '../../../api/agents'
import ContactAgentModal from '../../ui/ContactAgentModal'

function AgentsHero() {
  const [agents, setAgents] = useState([])
  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAgents()
      .then(res => {
        setAgents(res.data)
        setSelected(res.data[0])
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="w-full min-h-screen bg-dark flex items-center justify-center">
      <p className="text-gold text-xs tracking-widest uppercase font-sans">Loading...</p>
    </div>
  )

  if (!selected) return null

  return (
    <div className="w-full min-h-screen bg-dark flex pt-24">

      {/* ===== ЛІВА КОЛОНКА — список агентів (~20%) ===== */}
      <div className="w-1/5 border-r border-white/10 overflow-y-auto h-[calc(100vh-96px)] sticky top-24 flex flex-col">
        <div className="p-5">
          <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">KVK Realty Group</p>
          <h1 className="text-xl font-serif text-white mb-6">Our Agents</h1>

          <div className="flex flex-col gap-2">
            {agents.map(agent => (
              <button
                key={agent.id}
                onClick={() => setSelected(agent)}
                className={`relative group overflow-hidden transition-all duration-300 ${
                  selected.id === agent.id ? 'ring-1 ring-gold' : 'opacity-60 hover:opacity-100'
                }`}
              >
                {/* Квадратна мініатюра */}
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Підпис */}
                <div className="absolute inset-0 flex flex-col justify-end p-2 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <p className="text-white font-serif text-xs leading-tight">{agent.name}</p>
                  <p className="text-gold text-xs tracking-widest uppercase" style={{ fontSize: '9px' }}>{agent.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ===== ЦЕНТРАЛЬНА КОЛОНКА — велике фото (~45%) ===== */}
      <div className="w-[45%] h-[calc(100vh-96px)] sticky top-24 overflow-hidden bg-dark-soft py-8">
        <img
          src={selected.photo}
          alt={selected.name}
          className="w-full h-full object-contain object-top"
        />
        {/* Тіні по боках для плавного переходу */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-dark to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-dark to-transparent pointer-events-none" />
        </div>

      {/* ===== ПРАВА КОЛОНКА — інфо (~35%) ===== */}
      <div className="w-[35%] border-l border-white/10 h-[calc(100vh-96px)] sticky top-24 overflow-y-auto flex flex-col justify-center px-10 py-10">

        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-2">
          {selected.role}
        </p>
        <h2 className="text-4xl font-serif text-white mb-4 leading-tight">
          {selected.name}
        </h2>
        <div className="w-8 h-px bg-gold mb-8" />

        {/* Статистика */}
        <div className="flex gap-10 mb-8">
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

        <button
          onClick={() => setModalOpen(true)}
          className="border border-gold text-gold px-8 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 self-start"
        >
          Contact Agent
        </button>

      </div>

      {modalOpen && (
        <ContactAgentModal
          agent={selected}
          onClose={() => setModalOpen(false)}
        />
      )}

    </div>
  )
}

export default AgentsHero