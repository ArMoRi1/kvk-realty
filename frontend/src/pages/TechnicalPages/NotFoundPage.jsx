import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className="w-full min-h-screen bg-dark flex flex-col items-center justify-center px-6 text-center">

      <p className="text-gold text-sm tracking-widest uppercase font-sans mb-4">404</p>

      <h1 className="text-5xl sm:text-7xl font-serif text-white mb-6 leading-tight">
        Page Not Found
      </h1>

      <div className="w-12 h-px bg-gold mx-auto mb-8" />

      <p className="text-white/40 font-sans font-light text-base leading-relaxed mb-12 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Link
        to="/"
        className="border border-gold text-gold px-10 py-4 text-sm tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
      >
        Back to Home
      </Link>

    </div>
  )
}

export default NotFoundPage