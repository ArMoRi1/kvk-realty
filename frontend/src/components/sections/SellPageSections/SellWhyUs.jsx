const reasons = [
  {
    title: "Accurate Pricing",
    desc: "We analyze the market deeply to price your home right — not too low, not too high.",
  },
  {
    title: "Professional Marketing",
    desc: "High-quality photos, targeted ads, and MLS listing to reach the right buyers fast.",
  },
  {
    title: "Strong Negotiation",
    desc: "We fight for every dollar. Our agents know how to handle offers and counteroffers.",
  },
  {
    title: "Stress-Free Process",
    desc: "We manage everything — showings, paperwork, closing. You just collect the check.",
  },
]

function SellWhyUs() {
  return (
    <section className="w-full bg-dark py-16 sm:py-24 px-6 sm:px-10 lg:px-16 border-t border-white/10">
      <div className="text-center mb-12 sm:mb-16">
        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">
          Why KVK
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif text-white">Why Sell With Us</h2>
        <div className="w-12 h-px bg-gold mx-auto mt-6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
        {reasons.map((r, index) => (
          <div
            key={index}
            className="border border-white/10 p-6 sm:p-8 hover:border-gold transition-all duration-300"
          >
            <p className="text-gold font-serif text-4xl mb-4">0{index + 1}</p>
            <h3 className="text-white font-serif text-lg mb-3">{r.title}</h3>
            <div className="w-6 h-px bg-gold mb-4" />
            <p className="text-white/40 font-sans font-light text-sm leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default SellWhyUs