import { useState, useEffect } from 'react'
import { getAgents } from '../../../api/agents'
import ContactAgentModal from '../../ui/ContactAgentModal'
import { useCountUp } from '../../../hooks/useCountUp'
import { useInView } from '../../../hooks/useInView'
import AgentReviews from './AgentReviews'
import ReviewForm from '../../ui/ReviewForm'

function Skeleton({ className }) {
  return <div className={`animate-pulse bg-white/10 ${className}`} />
}

function FadeImage({ src, alt, className, containerClassName }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative ${containerClassName || ''}`}>
      {!loaded && <Skeleton className="absolute inset-0" />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      />
    </div>
  )
}

function CountUp({ value, className }) {
  const [ref, inView] = useInView(0.3)
  const count = useCountUp(value, 1500, inView)
  return <span ref={ref} className={className}>{count}</span>
}

function AgentsHero() {
  const [agents, setAgents] = useState([])
  const [selected, setSelected] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [reviewModalOpen, setReviewModalOpen] = useState(false)

  useEffect(() => {
    getAgents()
      .then(res => {
        const data = res.data
        const offset = Math.floor(Date.now() / 86400000) % data.length
        const rotated = [...data.slice(offset), ...data.slice(0, offset)]
        setAgents(rotated)
        setSelected(rotated[0])
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
      ================================================================ */}
      <div className="lg:hidden flex h-screen pt-24">
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
                <FadeImage
                  src={agent.photo}
                  alt={agent.name}
                  containerClassName="w-full aspect-square"
                  className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-1 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <p className="text-white font-serif leading-tight" style={{ fontSize: '8px' }}>{agent.name}</p>
                  <p className="text-gold tracking-widest uppercase" style={{ fontSize: '7px' }}>{agent.role}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-1/2 overflow-hidden bg-dark-soft relative">
            <FadeImage
              src={selected.photo}
              alt={selected.name}
              containerClassName="w-full h-full"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-dark to-transparent pointer-events-none" />
          </div>
          <div className="border-t border-white/10" />
          <div className="h-1/2 overflow-y-auto px-4 py-4 flex flex-col justify-start">
            <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">{selected.role}</p>
            <h2 className="text-lg font-serif text-white mb-2 leading-tight">{selected.name}</h2>
            <div className="w-6 h-px bg-gold mb-3" />
            <div className="flex gap-5 mb-3">
              <div>
                <p className="text-xl font-serif text-white"><CountUp value={selected.deals} /></p>
                <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-0.5">Deals</p>
              </div>
              <div>
                <p className="text-xl font-serif text-white"><CountUp value={selected.experience} /></p>
                <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-0.5">Years</p>
              </div>
              {selected.total_volume > 0 && (
                <div>
                  <p className="text-xl font-serif text-white">${(selected.total_volume / 1_000_000).toFixed(1)}M</p>
                  <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-0.5">Volume</p>
                </div>
              )}
            </div>
            {selected.motto && (
              <div className="mb-3 border-l-2 border-gold pl-3">
                <p className="text-white/50 font-sans font-light italic text-xs leading-relaxed">"{selected.motto}"</p>
              </div>
            )}
            {selected.bio && (
              <div className="mb-3">
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">About</p>
                <p className="text-white/50 font-sans font-light text-xs leading-relaxed">{selected.bio}</p>
              </div>
            )}
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
            <button onClick={() => setModalOpen(true)} className="border border-gold text-gold px-4 py-2 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 w-full">
              Contact Agent
            </button>
            <button onClick={() => setReviewModalOpen(true)} className="border border-white/20 text-white/50 px-4 py-2 text-xs tracking-widest font-sans uppercase hover:border-gold hover:text-gold transition-all duration-300 w-full mt-2">
              Leave a Review
            </button>
            <AgentReviews agentId={selected.id} />
          </div>
        </div>
      </div>

      {/* ================================================================
          ДЕСКТОПНА СТРУКТУРА (≥ 1024px)
          [25% список] | [75% контент: фото+текст зверху, деталі знизу]
      ================================================================ */}
      {/* <div className="hidden lg:flex h-[calc(100vh-96px)] pt-24"> */}
          <div className="hidden lg:flex h-[calc(100vh-40px)] pt-24">
        {/* ===== ЛІВА КОЛОНКА — міні-галерея 2 в ряд ===== */}
        <div className="w-1/4 border-r border-white/10 overflow-y-auto flex-shrink-0 self-stretch">
          <div className="p-4">
            <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">KVK Realty Group</p>
            <h1 className="text-xl font-serif text-white mb-4">Our Agents</h1>
            <div className="grid grid-cols-2 gap-2">
              {agents.map(agent => (
                <button
                  key={agent.id}
                  onClick={() => setSelected(agent)}
                  className={`relative group overflow-hidden transition-all duration-300 ${
                    selected.id === agent.id ? 'ring-1 ring-gold' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <FadeImage
                    src={agent.photo}
                    alt={agent.name}
                    containerClassName="w-full aspect-square"
                    className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-1.5 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <p className="text-white font-serif leading-tight" style={{ fontSize: '9px' }}>{agent.name}</p>
                    <p className="text-gold tracking-widest uppercase" style={{ fontSize: '8px' }}>{agent.role}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ===== ПРАВА ЧАСТИНА — скролиться ===== */}
        <div className="flex-1 overflow-y-auto">

          {/* ── Верхній блок: фото + основна інфо ── */}
          <div className="flex border-b border-white/10">

            {/* Фото */}
            <div className="w-1/3 flex-shrink-0 relative" style={{ minHeight: '400px' }}>
              <FadeImage
                src={selected.photo}
                alt={selected.name}
                containerClassName="w-full h-full absolute inset-0"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Основна інфо */}
            <div className="flex-1 px-10 py-10 flex flex-col justify-center">
              <p className="text-gold text-xs tracking-widest uppercase font-sans mb-2">{selected.role}</p>
              <h2 className="text-4xl font-serif text-white mb-4 leading-tight">{selected.name}</h2>
              <div className="w-8 h-px bg-gold mb-6" />

              <div className="flex flex-col gap-4 mb-8">
                <div>
                  <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">Phone</p>
                  <p className="text-white font-sans font-light">{selected.phone}</p>
                </div>
                <div>
                  <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">Email</p>
                  <p className="text-white font-sans font-light">{selected.email}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setModalOpen(true)}
                  className="border border-gold text-gold px-6 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
                >
                  Contact Agent
                </button>
                <button
                  onClick={() => setReviewModalOpen(true)}
                  className="border border-white/20 text-white/50 px-6 py-3 text-xs tracking-widest font-sans uppercase hover:border-gold hover:text-gold transition-all duration-300"
                >
                  Leave a Review
                </button>
              </div>
            </div>
          </div>

          {/* ── Нижній блок: stats + motto + bio + reviews на всю ширину ── */}
          <div className="px-10 py-10">

            {/* Stats */}
            <div className="flex gap-12 mb-10 flex-wrap">
              <div>
                <p className="text-4xl font-serif text-white"><CountUp value={selected.deals} /></p>
                <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Deals Closed</p>
              </div>
              <div>
                <p className="text-4xl font-serif text-white"><CountUp value={selected.experience} /></p>
                <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Years Experience</p>
              </div>
              {selected.total_volume > 0 && (
                <div>
                  <p className="text-4xl font-serif text-white">${(selected.total_volume / 1_000_000).toFixed(1)}M</p>
                  <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Total Volume</p>
                </div>
              )}
            </div>

            {/* Motto */}
            {selected.motto && (
              <div className="mb-8 border-l-2 border-gold pl-4">
                <p className="text-white/50 font-sans font-light italic text-sm leading-relaxed">"{selected.motto}"</p>
              </div>
            )}

            {/* Bio */}
            {selected.bio && (
              <div className="mb-10">
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-2">About</p>
                <p className="text-white/50 font-sans font-light text-sm leading-relaxed">{selected.bio}</p>
              </div>
            )}

            <div className="border-t border-white/10 pt-10">
              <AgentReviews agentId={selected.id} />
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <ContactAgentModal agent={selected} onClose={() => setModalOpen(false)} />
      )}
      {reviewModalOpen && (
        <ReviewForm
          mode="modal"
          preselectedAgentId={selected.id}
          onClose={() => setReviewModalOpen(false)}
        />
      )}
    </div>
  )
}

export default AgentsHero