import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'HOME', path: '/' },
  { label: 'BUY', path: '/buy' },
  { label: 'SELL', path: '/sell' },
  { label: 'AGENTS', path: '/agents' },
  { label: 'BLOG', path: '/blog' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-gold border-b border-gold pb-0.5'
      : 'hover:text-gold transition-colors duration-300'

  return (
    <>
      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-2 left-0 w-full z-[110] px-10 py-6 flex items-center justify-between">

      {/* Ліве меню — desktop / порожній placeholder — mobile */}
      <div className="w-16 lg:w-auto">
        <ul className="hidden lg:flex gap-10 tracking-widest text-xs font-sans font-medium text-white">
          <li><NavLink to="/" className={linkClass}>HOME</NavLink></li>
          <li><NavLink to="/buy" className={linkClass}>BUY</NavLink></li>
          <li><NavLink to="/sell" className={linkClass}>SELL</NavLink></li>
        </ul>
      </div>

        {/* Логотип */}
        <div className="absolute left-1/2 -translate-x-1/2 text-center text-white">
          <p className="text-10 xs:text-xs tracking-widest text-gold leading-none">THE</p>
          <p className="text-base xs:text-xl font-serif tracking-widest font-semibold leading-tight">KVK REALTY GROUP</p>
          <p className="text-10 xs:text-xs tracking-widest text-gold mt-0.5">EST. 2024</p>
        </div>

        {/* Праве меню — тільки desktop */}
        <ul className="hidden lg:flex gap-10 tracking-widest text-xs font-sans font-medium text-white">
          <li><NavLink to="/agents" className={linkClass}>AGENTS</NavLink></li>
          <li><NavLink to="/blog" className={linkClass}>BLOG</NavLink></li>
          <li>
            <a href="tel:248-212-3333" className="text-gold hover:text-gold-light transition-colors duration-300">
              248-212-3333
            </a>
          </li>
        </ul>

        {/* Бургер — тільки mobile/tablet */}
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="lg:hidden flex flex-col gap-1.5 p-2 z-[110] relative"
          aria-label="Toggle menu"
        >
          {/* Лінія 1 — повертається на +45deg */}
          <span className={`w-6 h-[2px] bg-gold block transition-all duration-300 origin-center ${
            menuOpen ? 'rotate-45 translate-y-[8px]' : ''
          }`} />
          {/* Лінія 2 — зникає */}
          <span className={`w-6 h-[2px] bg-gold block transition-all duration-300 ${
            menuOpen ? 'opacity-0 scale-x-0' : ''
          }`} />
          {/* Лінія 3 — повертається на -45deg */}
          <span className={`w-6 h-[2px] bg-gold block transition-all duration-300 origin-center ${
            menuOpen ? '-rotate-45 -translate-y-[8px]' : ''
          }`} />
        </button>

      </nav>

      {/* ===== OVERLAY ===== */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-[90] bg-black/50 transition-opacity duration-500 lg:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* ===== МЕНЮ — виїжджає справа ===== */}
      <div className={`fixed top-0 right-0 h-full w-full z-[100] bg-dark flex flex-col items-center justify-center transition-transform duration-500 ease-in-out lg:hidden ${
        menuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>

        {/* Лінки — з'являються з затримкою по черзі */}
        <ul className="flex flex-col items-center gap-8">
          {navLinks.map((item, index) => (
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
          ))}
        </ul>

        {/* Розділювач */}
        <div className="absolute bottom-12 flex flex-col items-center gap-4">
          <div className="w-12 h-px bg-gold/40" />

          {/* Телефон */}
          <a
            href="tel:248-212-3333"
            className="text-gold text-sm tracking-widest font-sans hover:text-gold-light transition-colors duration-300"
          >
            248-212-3333
          </a>
          </div>
      </div>
    </>
  )
}

export default Navbar