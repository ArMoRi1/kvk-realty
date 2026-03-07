import { MessageSquare, Home, HandshakeIcon, FileText, Key } from 'lucide-react'

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

function BuySteps() {
  return (
    <section className="w-full bg-dark-soft py-24 px-16 border-t border-white/10">
      <div className="text-center mb-16">
        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">
          The Process
        </p>
        <h2 className="text-4xl font-serif text-white">How It Works</h2>
        <div className="w-12 h-px bg-gold mx-auto mt-6" />
      </div>

      <div className="flex items-start justify-between max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            <div className="flex flex-col items-center text-center w-32">
              <div className="w-14 h-14 border border-gold/40 flex items-center justify-center text-gold mb-4 hover:border-gold hover:bg-gold/10 transition-all duration-300">
                {step.icon}
              </div>
              <p className="text-white font-sans text-sm font-medium mb-2 leading-tight">
                {step.title}
              </p>
              <p className="text-white/40 font-sans text-xs leading-relaxed">
                {step.desc}
              </p>
            </div>

            {index < steps.length - 1 && (
              <div className="flex items-center mt-6 mx-2">
                <div className="w-8 h-px bg-gold/30" />
                <div className="text-gold/30 text-lg">›</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default BuySteps