import { useState } from 'react'
import { Bed, Bath, Maximize2, Heart, Home } from 'lucide-react'

function formatPrice(price, status) {
  if (!price) return '—'
  return status === 'Active Rental'
    ? `$${price.toLocaleString()}/mo`
    : `$${price.toLocaleString()}`
}

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
      <div className="relative overflow-hidden h-52 bg-dark-soft">
        {listing.image ? (
          <img
            src={listing.image}
            alt={listing.address}
            onError={e => { e.target.style.display = 'none' }}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <Home size={32} className="text-white/10" strokeWidth={1} />
            <p className="text-white/20 text-xs font-sans tracking-widest uppercase">No Photo</p>
          </div>
        )}

        {/* Статус бейдж */}
        <span className={`absolute top-3 left-3 text-[10px] tracking-widest uppercase font-sans px-2 py-1 ${
          listing.status === 'Active Rental'
            ? 'bg-blue-500/90 text-white'
            : 'bg-gold/90 text-black'
        }`}>
          {listing.status === 'Active Rental' ? 'For Rent' : 'For Sale'}
        </span>

        {/* Тип */}
        {listing.type && (
          <span className="absolute top-3 right-10 text-[10px] tracking-widest uppercase font-sans px-2 py-1 bg-black/60 text-white/80">
            {listing.type.replace('SingleFamilyResidence', 'House').replace('Condominium', 'Condo')}
          </span>
        )}

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
        <p className="text-white/70 font-sans text-sm mb-1">{listing.address || '—'}</p>
        <p className="text-white/40 font-sans text-xs tracking-widest uppercase mb-3">{listing.city || '—'}</p>

        {/* Stats */}
        <div className="flex items-center gap-4 text-white/50 text-xs font-sans border-t border-white/10 pt-3">
          <span className="flex items-center gap-1.5">
            <Bed size={13} strokeWidth={1.5} />
            {listing.beds ?? '—'} bd
          </span>
          <span className="flex items-center gap-1.5">
            <Bath size={13} strokeWidth={1.5} />
            {listing.baths ?? '—'} ba
          </span>
          <span className="flex items-center gap-1.5">
            <Maximize2 size={12} strokeWidth={1.5} />
            {listing.sqft ? listing.sqft.toLocaleString() : '—'} sqft
          </span>
        </div>

        {/* Listing broker — обов'язково по правилах IDX */}
        {listing.list_office && (
          <p className="text-white/20 text-[10px] font-sans mt-3 tracking-wide border-t border-white/5 pt-2">
            Listed by {listing.list_office}
          </p>
        )}
      </div>
    </div>
  )
}

export default PropertyCard