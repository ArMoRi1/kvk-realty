import { Link } from 'react-router-dom'
import { ServerCrash } from 'lucide-react'

function ServerErrorPage() {
  return (
    <div className="w-full min-h-screen bg-dark flex flex-col items-center justify-center px-6 text-center">

      <div className="text-gold mb-6">
        <ServerCrash size={48} strokeWidth={1} />
      </div>

      <p className="text-gold text-sm tracking-widest uppercase font-sans mb-4">500</p>

      <h1 className="text-5xl sm:text-7xl font-serif text-white mb-6 leading-tight">
        Something Went Wrong
      </h1>

      <div className="w-12 h-px bg-gold mx-auto mb-8" />

      <p className="text-white/40 font-sans font-light text-base leading-relaxed mb-12 max-w-md">
        An unexpected error occurred on our end. Please try again in a moment or contact us if the problem persists.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => window.location.reload()}
          className="border border-gold text-gold px-10 py-4 text-sm tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
        >
          Try Again
        </button>
        <Link
          to="/"
          className="border border-white/20 text-white/50 px-10 py-4 text-sm tracking-widest font-sans uppercase hover:border-gold hover:text-gold transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>

      <div className="mt-16 flex flex-col items-center gap-2">
        <p className="text-white/20 text-sm font-sans">Need help?</p>
        <a
          href="tel:2482123333"
          className="text-gold text-sm tracking-widest font-sans hover:text-gold-light transition-colors duration-300"
        >
          248-212-3333
        </a>
      </div>

    </div>
  )
}

export default ServerErrorPage