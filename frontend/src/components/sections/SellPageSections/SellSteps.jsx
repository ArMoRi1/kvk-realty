import { BarChart2, Home, Camera, Users, FileText, Key } from 'lucide-react'

const steps = [
  {
    id: 1,
    icon: <BarChart2 size={22} strokeWidth={1} />,
    title: "Market Analysis & Pricing",
    desc: "We determine the best price for your home",
  },
  {
    id: 2,
    icon: <Home size={22} strokeWidth={1} />,
    title: "Home Preparation & Staging",
    desc: "We help you present your home at its best",
  },
  {
    id: 3,
    icon: <Camera size={22} strokeWidth={1} />,
    title: "Marketing & Showings",
    desc: "Professional photos and targeted promotion",
  },
  {
    id: 4,
    icon: <Users size={22} strokeWidth={1} />,
    title: "Offers & Negotiation",
    desc: "We get you the best possible price",
  },
  {
    id: 5,
    icon: <FileText size={22} strokeWidth={1} />,
    title: "Contract & Paperwork",
    desc: "We handle every document for you",
  },
  {
    id: 6,
    icon: <Key size={22} strokeWidth={1} />,
    title: "Closing & Beyond",
    desc: "Smooth closing — and we stay in touch",
  },
]

function SellSteps() {
  return (
    <section className="w-full bg-dark-soft py-24 px-16 border-t border-white/10">
      <div className="text-center mb-16">
        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">
          The Process
        </p>
        <h2 className="text-4xl font-serif text-white">How We Sell Your Home</h2>
        <div className="w-12 h-px bg-gold mx-auto mt-6" />
      </div>

      <div className="flex items-start justify-between max-w-6xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-start">
            <div className="flex flex-col items-center text-center w-28">
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
              <div className="flex items-center mt-6 mx-1">
                <div className="w-6 h-px bg-gold/30" />
                <div className="text-gold/30 text-lg">›</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default SellSteps