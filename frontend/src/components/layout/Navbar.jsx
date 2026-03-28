import { useState, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import logo from '../../assets/img/logo.png'

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'BUY', path: '/buy' },
  { label: 'BLOG', path: '/blog' },
  { label: 'SELL', path: '/sell' },
  { label: 'AGENTS', path: '/agents' },
  { label: 'BLOG', path: '/blog' },
]

function BuyDropdown() {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const isActive = location.pathname.startsWith('/buy')

  return (
    <li className="relative" ref={ref}>
      <button
        onClick={() => setOpen(p => !p)}
        className={`flex items-center gap-1 tracking-widest text-base font-sans font-medium transition-colors duration-300 ${
          isActive ? 'text-gold border-b border-gold pb-0.5' : 'text-white hover:text-gold'
        }`}
      >
        BUY
        <ChevronDown
          size={13}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Dropdown */}
      <div className={`absolute top-full left-0 mt-3 w-52 bg-[#0A0A0A] border border-white/10 transition-all duration-200 ${
        open ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1'
      }`}>
        <Link
          to="/buy"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-5 py-3.5 text-xs tracking-widest uppercase font-sans text-white/60 hover:text-gold hover:bg-white/5 transition-all duration-200 border-b border-white/10"
        >
          <span className="w-1 h-1 bg-gold/50 rounded-full" />
          Buy Properties
        </Link>
        <Link
          to="/mortgage-calculator"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-5 py-3.5 text-xs tracking-widest uppercase font-sans text-white/60 hover:text-gold hover:bg-white/5 transition-all duration-200"
        >
          <span className="w-1 h-1 bg-gold/50 rounded-full" />
          Mortgage Calculator
        </Link>
      </div>
    </li>
  )
}

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mobileBuyOpen, setMobileByOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-gold border-b border-gold pb-0.5'
      : 'hover:text-gold transition-colors duration-300'

  return (
    <>
      <nav className="fixed top-2 left-0 w-full z-[110] px-10 py-6 flex items-center justify-between">

        {/* Ліве меню */}
        <div className="w-16 lg:w-auto">
          <ul className="hidden lg:flex gap-10 tracking-widest text-base font-sans font-medium text-white items-center">
            <li><NavLink to="/" className={linkClass}>HOME</NavLink></li>
            <BuyDropdown />
            <li><NavLink to="/sell" className={linkClass}>SELL</NavLink></li>
          </ul>
        </div>

        {/* Логотип */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
          <img src={logo} alt="KVK Realty Group Logo" className="h-20 sm:h-24 w-auto" />
        </Link>

        {/* Праве меню */}
        <ul className="hidden lg:flex gap-10 tracking-widest text-base font-sans font-medium text-white">
          <li><NavLink to="/agents" className={linkClass}>AGENTS</NavLink></li>
          <li><NavLink to="/blog" className={linkClass}>BLOG</NavLink></li>
          <li>
            <a href="tel:248-212-3333" className="text-gold hover:text-gold-light transition-colors duration-300">
              248-212-3333
            </a>
          </li>
        </ul>

        {/* Бургер */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="lg:hidden flex flex-col gap-1.5 p-2 z-[110] relative"
          aria-label="Toggle menu"
        >
          <span className={`w-6 h-[2px] bg-gold block transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[8px]' : ''}`} />
          <span className={`w-6 h-[2px] bg-gold block transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`w-6 h-[2px] bg-gold block transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[8px]' : ''}`} />
        </button>
      </nav>

      {/* Overlay */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/50 transition-opacity duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Mobile меню */}
      <div className={`fixed top-0 right-0 h-full w-full z-[100] bg-dark flex flex-col items-center justify-center transition-transform duration-500 ease-in-out lg:hidden ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((item, index) => (
            item.label === 'BUY' ? (
              <li
                key="BUY"
                className="flex flex-col items-center gap-3 transition-all duration-300"
                style={{
                  transitionDelay: menuOpen ? `${index * 60 + 150}ms` : '0ms',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
                }}
              >
                <button
                  onClick={() => setMobileByOpen(p => !p)}
                  className="flex items-center gap-2 text-xl font-serif tracking-widest text-white hover:text-gold transition-colors duration-300"
                >
                  BUY
                  <ChevronDown size={16} className={`transition-transform duration-300 ${mobileBuyOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileBuyOpen && (
                  <div className="flex flex-col items-center gap-2">
                    <Link
                      to="/buy"
                      onClick={() => { setMenuOpen(false); setMobileByOpen(false) }}
                      className="text-sm font-sans tracking-widest uppercase text-white/50 hover:text-gold transition-colors duration-300"
                    >
                      Buy Properties
                    </Link>
                    <Link
                      to="/mortgage-calculator"
                      onClick={() => { setMenuOpen(false); setMobileByOpen(false) }}
                      className="text-sm font-sans tracking-widest uppercase text-white/50 hover:text-gold transition-colors duration-300"
                    >
                      Mortgage Calculator
                    </Link>
                  </div>
                )}
              </li>
            ) : (
              <li
                key={item.label}
                className="transition-all duration-300"
                style={{
                  transitionDelay: menuOpen ? `${index * 60 + 150}ms` : '0ms',
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(20px)',
                }}
              >
                <NavLink
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-xl font-serif tracking-widest transition-colors duration-300 ${
                      isActive ? 'text-gold' : 'text-white hover:text-gold'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            )
          ))}
        </ul>

        <div className="absolute bottom-12 flex flex-col items-center gap-4">
          <div className="w-12 h-px bg-gold/40" />
          <a href="tel:248-212-3333" className="text-gold text-sm tracking-widest font-sans hover:text-gold-light transition-colors duration-300">
            248-212-3333
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar