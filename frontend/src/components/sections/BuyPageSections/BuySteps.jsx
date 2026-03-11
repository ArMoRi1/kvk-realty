import { useState, useEffect } from 'react'
import { MessageSquare, Home, HandshakeIcon, FileText, Key } from 'lucide-react'
import { useInView } from '../../../hooks/useInView'

const steps = [
  {
    id: 1,
    icon: <MessageSquare size={22} strokeWidth={1} />,
    title: "Initial Consultation",
    desc: "We learn your needs, budget, and timeline",
  },
  {
    id: 2,
    icon: <Home size={22} strokeWidth={1} />,
    title: "Home Search",
    desc: "We find properties that match your criteria",
  },
  {
    id: 3,
    icon: <HandshakeIcon size={22} strokeWidth={1} />,
    title: "Offers & Negotiation",
    desc: "We negotiate the best deal on your behalf",
  },
  {
    id: 4,
    icon: <FileText size={22} strokeWidth={1} />,
    title: "Contract & Paperwork",
    desc: "We handle all the documentation for you",
  },
  {
    id: 5,
    icon: <Key size={22} strokeWidth={1} />,
    title: "Closing & Beyond",
    desc: "You get the keys — we stay in touch",
  },
]

const STEP_DURATION = 1500 // ms на кожен крок

function BuySteps() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [sectionRef, inView] = useInView(0.3)

  useEffect(() => {
  if (!inView) return
  const timer = setInterval(() => {
    setActiveIndex(prev => (prev + 1) % steps.length)
  }, STEP_DURATION)
  return () => clearInterval(timer)
}, [inView])

  return (
    <section ref={sectionRef} className="w-full bg-dark-soft py-16 sm:py-24 px-6 sm:px-10 lg:px-16 border-t border-white/10">
      <div className="text-center mb-12 sm:mb-16">
        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">
          The Process
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif text-white">How It Works</h2>
        <div className="w-12 h-px bg-gold mx-auto mt-6" />
      </div>

      {/* ── Десктоп — горизонтальний ── */}
      <div className="hidden lg:flex items-start justify-between max-w-5xl mx-auto">
        {steps.map((step, index) => {
          const isActive = index === activeIndex
          return (
            <div key={step.id} className="flex items-start">
              <div className="flex flex-col items-center text-center w-32">
                <div className={`w-14 h-14 border flex items-center justify-center mb-4 transition-all duration-500 ${
                  isActive
                    ? 'border-gold bg-gold/15 text-gold scale-110 shadow-[0_0_16px_2px_rgba(201,168,76,0.25)]'
                    : 'border-gold/40 text-gold/50 scale-100'
                }`}>
                  {step.icon}
                </div>
                <p className={`font-sans text-sm font-medium mb-2 leading-tight transition-colors duration-500 ${
                  isActive ? 'text-white' : 'text-white/50'
                }`}>
                  {step.title}
                </p>
                <p className={`font-sans text-xs leading-relaxed transition-colors duration-500 ${
                  isActive ? 'text-white/60' : 'text-white/30'
                }`}>
                  {step.desc}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex items-center mt-6 mx-2">
                  <div className={`w-8 h-px transition-colors duration-500 ${
                    index < activeIndex ? 'bg-gold' : 'bg-gold/20'
                  }`} />
                  <div className={`text-lg transition-colors duration-500 ${
                    index < activeIndex ? 'text-gold' : 'text-gold/20'
                  }`}>›</div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Мобільний — вертикальний список ── */}
      <div className="lg:hidden flex flex-col max-w-sm mx-auto">
        {steps.map((step, index) => {
          const isActive = index === activeIndex
          return (
            <div key={step.id} className="flex flex-col items-center">
              <div className="flex items-center gap-5 mx-auto">
                <div className={`w-12 h-12 border flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
                  isActive
                    ? 'border-gold bg-gold/15 text-gold scale-110 shadow-[0_0_12px_2px_rgba(201,168,76,0.2)]'
                    : 'border-gold/40 text-gold/50 scale-100'
                }`}>
                  {step.icon}
                </div>
                <div className="flex flex-col justify-center w-48">
                  <p className={`font-sans text-sm font-medium mb-1 leading-tight transition-colors duration-500 ${
                    isActive ? 'text-white' : 'text-white/50'
                  }`}>
                    {step.title}
                  </p>
                  <p className={`font-sans text-xs leading-relaxed transition-colors duration-500 ${
                    isActive ? 'text-white/60' : 'text-white/30'
                  }`}>
                    {step.desc}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="flex flex-col items-center my-3">
                  <div className={`h-6 w-px transition-colors duration-500 ${
                    index < activeIndex ? 'bg-gold' : 'bg-gold/20'
                  }`} />
                  <div className={`text-lg leading-none transition-colors duration-500 ${
                    index < activeIndex ? 'text-gold' : 'text-gold/20'
                  }`}>∨</div>
                </div>
              )}
            </div>
          )
        })}
      </div>

    </section>
  )
}

export default BuySteps