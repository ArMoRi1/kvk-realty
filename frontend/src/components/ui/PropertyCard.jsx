import { useState } from 'react'
import { Bed, Bath, Maximize2, Heart } from 'lucide-react'
import { TYPE_LABELS, STATUS_LABELS, formatPrice } from '../../mocks/properties'

function PropertyCard({ listing, isActive, onClick }) {
  const [saved, setSaved] = useState(false)

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer border transition-all duration-300 ${
        isActive ? 'border-gold' : 'border-white/10 hover:border-gold/50'
      }`}
    >
      {/* Фото */}
      <div className="relative overflow-hidden h-52">
        <img
          src={listing.image}
          alt={listing.address}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Статус бейдж */}
        <span className={`absolute top-3 left-3 text-[10px] tracking-widest uppercase font-sans px-2 py-1 ${
          listing.status === 'for rent'
            ? 'bg-blue-500/90 text-white'
            : 'bg-gold/90 text-black'
        }`}>
          {STATUS_LABELS[listing.status]}
        </span>
        {/* Тип */}
        <span className="absolute top-3 right-10 text-[10px] tracking-widest uppercase font-sans px-2 py-1 bg-black/60 text-white/80">
          {TYPE_LABELS[listing.type]}
        </span>
        {/* Save */}
        <button
          onClick={e => { e.stopPropagation(); setSaved(p => !p) }}
          className="absolute top-2.5 right-2.5 p-1.5 bg-black/40 hover:bg-black/70 transition-colors duration-200"
        >
          <Heart
            size={14}
            className={saved ? 'fill-gold text-gold' : 'text-white/70'}
          />
        </button>
      </div>

      {/* Інфо */}
      <div className="p-4">
        <p className="text-white font-serif text-xl mb-1">
          {formatPrice(listing.price, listing.status)}
        </p>
        <p className="text-white/70 font-sans text-sm mb-1">{listing.address}</p>
        <p className="text-white/40 font-sans text-xs tracking-widest uppercase mb-3">{listing.city}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-white/50 text-xs font-sans border-t border-white/10 pt-3">
          <span className="flex items-center gap-1.5">
            <Bed size={13} strokeWidth={1.5} />
            {listing.beds} bd
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={13} strokeWidth={1.5} />
            {listing.baths} ba
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 size={12} strokeWidth={1.5} />
            {listing.sqft.toLocaleString()} sqft
          </span>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard