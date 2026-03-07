import { NavLink } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="fixed top-5 left-0 w-full z-50 px-10 py-6 flex items-center justify-between">

      {/* Ліве меню */}
      <ul className="flex gap-10 tracking-widest text-xs font-sans font-medium text-white">
        <li>
          <NavLink to="/" className={({ isActive }) =>
            isActive ? 'text-gold border-b border-gold pb-0.5' : 'hover:text-gold transition-colors duration-300'
          }>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink to="/buy" className={({ isActive }) =>
            isActive ? 'text-gold border-b border-gold pb-0.5' : 'hover:text-gold transition-colors duration-300'
          }>
            BUY
          </NavLink>
        </li>
        <li>
          <NavLink to="/sell" className={({ isActive }) =>
            isActive ? 'text-gold border-b border-gold pb-0.5' : 'hover:text-gold transition-colors duration-300'
          }>
            SELL
          </NavLink>
        </li>
      </ul>

      {/* Логотип по центру */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center text-white">
        <p className="text-xs tracking-widest text-gold mb-0.5">THE</p>
        <p className="text-xl font-serif tracking-widest font-semibold">KVK REALTY GROUP</p>
        <p className="text-xs tracking-widest text-gold mt-0.5">EST. 2024</p>
      </div>

      {/* Праве меню */}
      <ul className="flex gap-10 tracking-widest text-xs font-sans font-medium text-white">
        <li>
          <NavLink to="/agents" className={({ isActive }) =>
            isActive ? 'text-gold border-b border-gold pb-0.5' : 'hover:text-gold transition-colors duration-300'
          }>
            AGENTS
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" className={({ isActive }) =>
            isActive ? 'text-gold border-b border-gold pb-0.5' : 'hover:text-gold transition-colors duration-300'
          }>
            BLOG
          </NavLink>
        </li>
        <li>
          <a href="tel:+380000000000" className="text-gold hover:text-gold-light transition-colors duration-300">
            +38 (000) 000-00-00
          </a>
        </li>
      </ul>

    </nav>
  )
}

export default Navbar