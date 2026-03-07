import { Link } from "react-router-dom";

function SellCTA() {
  return (
    <section className="w-full bg-dark-soft py-24 px-16 border-t border-white/10">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">
          Ready to Sell?
        </p>
        <h2 className="text-5xl font-serif text-white mb-6 leading-tight">
          Let's Get Your Home<br />Sold Fast
        </h2>
        <div className="w-12 h-px bg-gold mx-auto mb-8" />
        <p className="text-white/50 font-sans font-light leading-relaxed mb-12">
          Get a free market evaluation and find out what your home is worth today.
        </p>
        <div className="flex gap-4 justify-center">
          
          <Link
          to="tel:2482123333"
          className="border border-gold text-gold px-10 py-4 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
          >
           Get Free Evaluation
          </Link>

          <Link
            to="/agents"
            className="border border-white/20 text-white/50 px-10 py-4 text-xs tracking-widest font-sans uppercase hover:border-gold hover:text-gold transition-all duration-300"
            
          >
            Meet Our Agents
          </Link>
        </div>
      </div>
    </section>
  )
}

export default SellCTA