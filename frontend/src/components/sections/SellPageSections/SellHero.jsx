import { Link } from "react-router-dom";
import heroPhoto from '../../../assets/img/Sell/HeroPhoto.webp'

function SellHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <img
        src={heroPhoto}
        alt="Sell your home"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6 sm:px-8">
        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-6">
          KVK Realty Group
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif text-white mb-6 leading-tight">
          Sell Your Home<br />With Confidence
        </h1>
        <div className="w-12 h-px bg-gold mx-auto mb-6" />
        <p className="text-white/60 tracking-widest text-xs sm:text-sm font-sans uppercase mb-10">
          Metro Detroit Area — Maximum Value For Your Property
        </p>
        <Link
          to="/agents"
          className="border border-gold text-gold px-8 sm:px-10 py-4 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
        >
          Get Free Evaluation
        </Link>
      </div>
    </section>
  )
}

export default SellHero