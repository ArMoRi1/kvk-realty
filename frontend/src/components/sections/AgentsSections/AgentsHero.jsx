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
    <div className="w-full min-h-screen bg-dark">

      {/* ================================================================
          МОБІЛЬНА СТРУКТУРА (< 1024px)
          Ліва колонка: список агентів на всю висоту (1 колонка)
          Права колонка: верх — фото, низ — інфо
      ================================================================ */}
      <div className="lg:hidden flex h-[calc(100vh-0px)] pt-24">

        {/* ===== ЛІВА: список агентів — на всю висоту ===== */}
        <div className="w-1/3 border-r border-white/10 overflow-y-auto flex flex-col">
          <div className="p-3 flex flex-col gap-2">
            {agents.map(agent => (
              <button
                key={agent.id}
                onClick={() => setSelected(agent)}
                className={`relative group overflow-hidden transition-all duration-300 ${
                  selected.id === agent.id ? 'ring-1 ring-gold' : 'opacity-50 hover:opacity-100'
                }`}
              >
                <div className="w-full aspect-square overflow-hidden">
                  <img
                    src={agent.photo}
                    alt={agent.name}
                    className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 flex flex-col justify-end p-1 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <p className="text-white font-serif leading-tight" style={{ fontSize: '8px' }}>{agent.name}</p>
                  <p className="text-gold tracking-widest uppercase" style={{ fontSize: '7px' }}>{agent.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ===== ПРАВА: фото зверху + інфо знизу ===== */}
        <div className="flex-1 flex flex-col overflow-hidden">

          {/* Фото — верхня половина правої колонки */}
          <div className="h-1/2 overflow-hidden bg-dark-soft relative">
            <img
              src={selected.photo}
              alt={selected.name}
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
          </div>

          {/* Роздільник */}
          <div className="border-t border-white/10" />

          {/* Інфо — нижня половина правої колонки */}
          <div className="h-1/2 overflow-y-auto px-4 py-4 flex flex-col justify-start">
            <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">{selected.role}</p>
            <h2 className="text-lg font-serif text-white mb-2 leading-tight">{selected.name}</h2>
            <div className="w-6 h-px bg-gold mb-3" />

            <div className="flex gap-5 mb-3">
              <div>
                <p className="text-xl font-serif text-white">{selected.deals}</p>
                <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-0.5">Deals</p>
              </div>
              <div>
                <p className="text-xl font-serif text-white">{selected.experience}</p>
                <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-0.5">Years</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-0.5">Phone</p>
                <p className="text-white font-sans font-light text-xs">{selected.phone}</p>
              </div>
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-0.5">Email</p>
                <p className="text-white font-sans font-light text-xs break-all">{selected.email}</p>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="border border-gold text-gold px-4 py-2 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 self-start"
            >
              Contact Agent
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================
          ДЕСКТОПНА СТРУКТУРА (≥ 1024px)
          3 колонки: список | фото | інфо
      ================================================================ */}
      <div className="hidden lg:flex pt-24">

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
                  <div className="w-full aspect-square overflow-hidden">
                    <img
                      src={agent.photo}
                      alt={agent.name}
                      className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
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
        {/* wide = кастомний брейкпоінт 1301px → додай в index.css: --breakpoint-wide: 1301px; */}
        <div className="
          w-[45%] h-[calc(100vh-96px)] sticky top-24 overflow-hidden bg-dark-soft relative
          wide:py-8 wide:px-8
        ">
          <img
            src={selected.photo}
            alt={selected.name}
            className="
              w-full h-full
              object-cover object-top
              wide:object-contain wide:object-top
            "
          />
          <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-dark to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-dark to-transparent pointer-events-none" />
        </div>

        {/* ===== ПРАВА КОЛОНКА — інфо (~35%) ===== */}
        <div className="w-[35%] border-l border-white/10 h-[calc(100vh-96px)] sticky top-24 overflow-y-auto flex flex-col justify-center px-10 py-10">
          <p className="text-gold text-xs tracking-widest uppercase font-sans mb-2">{selected.role}</p>
          <h2 className="text-4xl font-serif text-white mb-4 leading-tight">{selected.name}</h2>
          <div className="w-8 h-px bg-gold mb-8" />

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