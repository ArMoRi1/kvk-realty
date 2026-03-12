import { NavLink, Link } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Buy', path: '/buy' },
  { label: 'Sell', path: '/sell' },
  { label: 'Agents', path: '/agents' },
  { label: 'Blog', path: '/blog' },
]

function Footer() {
  return (
    <footer className="bg-dark border-t border-white/10 py-12 px-6 sm:px-16">

      {/* Логотип по центру */}
      <Link to="/" className="text-center mb-8">
        <p className="text-[10px] xs:text-sm tracking-widest text-gold leading-none">THE</p>
        <p className="text-base xs:text-xl font-serif tracking-widest font-semibold leading-tight text-white">KVK REALTY GROUP</p>
        <p className="text-[10px] xs:text-sm tracking-widest text-gold mt-0.5">EST. 2017</p>
      </Link>

      {/* Розділювач */}
      <div className="border-t border-white/10 mb-8" />

      {/* Навігація і контакти */}
      <div className="grid grid-cols-2 max-w-2xl mx-auto mb-12">

        {/* Навігація */}
        <div className="flex flex-col items-center gap-3 border-r border-white/10 pr-4">
          <p className="text-gold text-xs tracking-widest uppercase mb-2">Navigation</p>
          {navLinks.map(item => (
            <NavLink
              key={item.label}
              to={item.path}
              className="text-white/50 text-xs sm:text-sm font-sans hover:text-gold transition-colors duration-300 tracking-wide"
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        {/* Контакти */}
        <div className="flex flex-col items-center gap-3 pl-4">
          <p className="text-gold text-xs tracking-widest uppercase mb-2">Contact</p>
          <p className="text-white/50 text-xs sm:text-sm font-sans">248-212-3333</p>
          <p className="text-white/50 text-xs sm:text-sm font-sans text-center break-all">www.kvkrealtygroup.com</p>
          <p className="text-white/50 text-xs sm:text-sm font-sans text-center">Metro Detroit Area, Michigan</p>
          {/* Equal Housing Opportunity */}
          <div>
            <img className="w-[100px]" src="../src/assets/img/Footer/equal-housing-logowhite-1000.png" alt="" />
          </div>
        </div>

      </div>

      {/* Нижня лінія */}
      <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
      
        <p className="text-white/30 text-xs tracking-widest font-sans uppercase">
          © 2017 KVK Realty Group — All Rights Reserved — Equal Housing Opportunity
        </p>
      </div>

    </footer>
  )
}

export default Footer