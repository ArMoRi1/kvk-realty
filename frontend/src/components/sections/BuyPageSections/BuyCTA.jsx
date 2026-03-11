import { Link } from "react-router-dom";

function BuyCTA() {
  return (
    <section className="w-full bg-dark-soft py-16 sm:py-24 px-6 sm:px-16 border-t border-white/10">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">
          Ready to Start?
        </p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight">
          Let's Find Your<br />Dream Home Together
        </h2>
        <div className="w-12 h-px bg-gold mx-auto mb-8" />
        <p className="text-white/50 font-sans font-light leading-relaxed mb-10 sm:mb-12 text-sm sm:text-base">
          Our agents are ready to guide you every step of the way. One call is all it takes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:2482123333"
            className="border border-gold text-gold px-8 sm:px-10 py-4 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
          >
            Call Us Now
          </a>
          <Link
            to="/agents"
            className="border border-white/20 text-white/50 px-8 sm:px-10 py-4 text-xs tracking-widest font-sans uppercase hover:border-gold hover:text-gold transition-all duration-300"
          >
            Meet Our Agents
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BuyCTA