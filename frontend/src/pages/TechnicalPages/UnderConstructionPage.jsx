import { Link } from 'react-router-dom'
import { HardHat } from 'lucide-react'

function UnderConstructionPage() {
  return (
    <div className="w-full min-h-screen bg-dark flex flex-col items-center justify-center px-6 text-center">

      <div className="text-gold mb-6">
        <HardHat size={48} strokeWidth={1} />
      </div>

      <p className="text-gold text-sm tracking-widest uppercase font-sans mb-4">Coming Soon</p>

      <h1 className="text-5xl sm:text-7xl font-serif text-white mb-6 leading-tight">
        Under Construction
      </h1>

      <div className="w-12 h-px bg-gold mx-auto mb-8" />

      <p className="text-white/40 font-sans font-light text-base leading-relaxed mb-12 max-w-md">
        We're working on something great. This page will be available soon — check back later.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          to="/"
          className="border border-gold text-gold px-10 py-4 text-sm tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
        >
          Back to Home
        </Link>
        <Link
          to="/agents"
          className="border border-white/20 text-white/50 px-10 py-4 text-sm tracking-widest font-sans uppercase hover:border-gold hover:text-gold transition-all duration-300"
        >
          Meet Our Agents
        </Link>
      </div>

    </div>
  )
}

export default UnderConstructionPage