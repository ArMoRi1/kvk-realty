import { MapPin } from 'lucide-react'
import { formatPrice } from '../../../mocks/properties'

const PIN_POSITIONS = [
  { top: '20%', left: '30%' },
  { top: '45%', left: '60%' },
  { top: '65%', left: '25%' },
  { top: '30%', left: '70%' },
  { top: '55%', left: '45%' },
  { top: '75%', left: '65%' },
  { top: '15%', left: '55%' },
  { top: '80%', left: '35%' },
  { top: '40%', left: '15%' },
]

function BuyMap({ listings, activeId, onPinClick }) {
  return (
    <div className="hidden lg:block w-1/2 h-full">
      <div className="relative w-full h-full bg-dark-muted overflow-hidden">

        {/* Сітка */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Псевдо-дороги */}
        <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
          <line x1="0" y1="35%" x2="100%" y2="35%" stroke="#C9A84C" strokeWidth="2" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#C9A84C" strokeWidth="1" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="#C9A84C" strokeWidth="2" />
          <line x1="65%" y1="0" x2="65%" y2="100%" stroke="#C9A84C" strokeWidth="1" />
          <line x1="10%" y1="0" x2="40%" y2="100%" stroke="#C9A84C" strokeWidth="0.5" />
          <line x1="55%" y1="0" x2="85%" y2="100%" stroke="#C9A84C" strokeWidth="0.5" />
        </svg>

        {/* Піни */}
        {listings.map((l) => {
          const pos = PIN_POSITIONS[(l.id - 1) % PIN_POSITIONS.length]
          const isActive = l.id === activeId
          return (
            <div
              key={l.id}
              className="absolute -translate-x-1/2 -translate-y-full transition-all duration-300 cursor-pointer z-10"
              style={{ top: pos.top, left: pos.left }}
              onClick={() => onPinClick(l.id)}
            >
              <div className={`px-2 py-1 text-[10px] font-sans font-semibold whitespace-nowrap shadow-lg transition-all duration-300 ${
                isActive
                  ? 'bg-gold text-black scale-110'
                  : 'bg-dark-soft text-white border border-white/20 hover:border-gold hover:text-gold'
              }`}>
                {formatPrice(l.price, l.status)}
              </div>
              <div className={`w-2 h-2 mx-auto rotate-45 -mt-1 ${
                isActive ? 'bg-gold' : 'bg-dark-soft border-b border-r border-white/20'
              }`} />
            </div>
          )
        })}

        {/* Лейбли */}
        <div className="absolute bottom-4 left-4 bg-dark/80 border border-white/10 px-3 py-2">
          <p className="text-white/40 text-[10px] tracking-widest uppercase font-sans">Metro Detroit Area</p>
        </div>
        <div className="absolute bottom-4 right-4 bg-dark/80 border border-white/10 px-3 py-2 flex items-center gap-2">
          <MapPin size={12} className="text-gold" />
          <p className="text-white/40 text-[10px] tracking-widest uppercase font-sans">Map coming soon</p>
        </div>

      </div>
    </div>
  )
}

export default BuyMap