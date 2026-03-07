import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Buy', path: '/buy' },
  { label: 'Sell', path: '/sell' },
  { label: 'Agents', path: '/agents' },
  { label: 'Blog', path: '/blog' },
]

function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 py-12 px-16">

      {/* Логотип по центру */}
      <div className="text-center mb-8">
        <p className="text-xs tracking-widest text-gold uppercase mb-1">The</p>
        <p className="text-2xl font-serif text-white tracking-widest">KVK Realty Group</p>
        <p className="text-xs tracking-widest text-gold uppercase mt-1">Est. 2024</p>
      </div>

      {/* Розділювач */}
      <div className="border-t border-white/10 mb-8" />

      {/* Навігація і контакти */}
      <div className="grid grid-cols-2 max-w-2xl mx-auto mb-12">

        {/* Навігація */}
        <div className="flex flex-col items-center gap-3 border-r border-white/10">
          <p className="text-gold text-xs tracking-widest uppercase mb-2">Navigation</p>
          {navLinks.map(item => (
            <NavLink
              key={item.label}
              to={item.path}
              className="text-white/50 text-sm font-sans hover:text-gold transition-colors duration-300 tracking-wide"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Контакти */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-gold text-xs tracking-widest uppercase mb-2">Contact</p>
          <p className="text-white/50 text-sm font-sans">248-212-3333</p>
          <p className="text-white/50 text-sm font-sans">www.kvkrealtygroup.com</p>
          <p className="text-white/50 text-sm font-sans">Metro Detroit Area, Michigan</p>
        </div>

      </div>

      {/* Нижня лінія */}
      <div className="border-t border-white/10 pt-6 text-center">
        <p className="text-white/30 text-xs tracking-widest font-sans uppercase">
          © 2024 KVK Realty Group — All Rights Reserved
        </p>
      </div>

    </footer>
  )
}

export default Footer