import { X, Bed, Bath, Maximize2, MapPin, Phone, Home } from 'lucide-react'

function formatPrice(price, status) {
  if (!price) return '—'
  return status === 'Active Rental'
    ? `$${price.toLocaleString()}/mo`
    : `$${price.toLocaleString()}`
}

function PropertyModal({ listing, onClose }) {
  if (!listing) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-dark border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Закрити */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/40 hover:text-gold transition-colors duration-300 bg-dark/80 p-1"
        >
          <X size={20} />
        </button>

        {/* Фото */}
        <div className="relative h-64 sm:h-80 overflow-hidden bg-dark-soft">
          {listing.image ? (
            <img
              src={listing.image}
              alt={listing.address}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2">
              <Home size={48} className="text-white/10" strokeWidth={1} />
              <p className="text-white/20 text-xs font-sans tracking-widest uppercase">No Photo Available</p>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

          {/* Бейджі */}
          <span className={`absolute top-4 left-4 text-[10px] tracking-widest uppercase font-sans px-2 py-1 ${
            listing.status === 'Active Rental' ? 'bg-blue-500/90 text-white' : 'bg-gold/90 text-black'
          }`}>
            {listing.status === 'Active Rental' ? 'For Rent' : 'For Sale'}
          </span>
          {listing.type && (
            <span className="absolute top-4 left-24 text-[10px] tracking-widest uppercase font-sans px-2 py-1 bg-black/60 text-white/80">
              {listing.type.replace('SingleFamilyResidence', 'House').replace('Condominium', 'Condo')}
            </span>
          )}

          {/* Ціна поверх фото */}
          <div className="absolute bottom-4 left-6">
            <p className="text-white font-serif text-3xl">{formatPrice(listing.price, listing.status)}</p>
          </div>
        </div>

        {/* Контент */}
        <div className="p-6 sm:p-8">

          {/* Адреса */}
          <div className="flex items-start gap-2 mb-6">
            <MapPin size={14} className="text-gold mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-white font-sans text-base">{listing.address || '—'}</p>
              <p className="text-white/40 font-sans text-xs tracking-widest uppercase mt-0.5">
                {listing.city}{listing.zip ? `, ${listing.zip}` : ''}
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 mb-6" />

          {/* Характеристики */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center border border-white/10 py-4 px-2">
              <Bed size={18} strokeWidth={1.5} className="text-gold mb-2" />
              <p className="text-white font-serif text-xl">{listing.beds ?? '—'}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Bedrooms</p>
            </div>
            <div className="flex flex-col items-center border border-white/10 py-4 px-2">
              <Bath size={18} strokeWidth={1.5} className="text-gold mb-2" />
              <p className="text-white font-serif text-xl">{listing.baths ?? '—'}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Bathrooms</p>
            </div>
            <div className="flex flex-col items-center border border-white/10 py-4 px-2">
              <Maximize2 size={18} strokeWidth={1.5} className="text-gold mb-2" />
              <p className="text-white font-serif text-xl">{listing.sqft ? listing.sqft.toLocaleString() : '—'}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Sq. Ft.</p>
            </div>
          </div>

          {/* Додаткова інфо */}
          {(listing.year_built || listing.waterfront) && (
            <div className="flex gap-6 mb-6">
              {listing.year_built && (
                <div>
                  <p className="text-white/30 text-xs tracking-widest uppercase font-sans mb-1">Year Built</p>
                  <p className="text-white font-sans text-base">{listing.year_built}</p>
                </div>
              )}
              {listing.waterfront && (
                <div>
                  <p className="text-white/30 text-xs tracking-widest uppercase font-sans mb-1">Waterfront</p>
                  <p className="text-gold font-sans text-base">Yes</p>
                </div>
              )}
            </div>
          )}

          {/* Опис */}
          {listing.description && (
            <div className="mb-6">
              <p className="text-white/30 text-xs tracking-widest uppercase font-sans mb-2">Description</p>
              <p className="text-white/60 font-sans text-sm leading-relaxed line-clamp-4">{listing.description}</p>
            </div>
          )}

          <div className="w-full h-px bg-white/10 mb-6" />

          {/* Listing broker — ОБОВ'ЯЗКОВО по правилах IDX */}
          {listing.list_office && (
            <div className="mb-6 p-4 border border-white/10">
              <p className="text-white/30 text-xs tracking-widest uppercase font-sans mb-2">Listing Office</p>
              <p className="text-white font-sans text-sm">{listing.list_office}</p>
              {listing.list_agent && (
                <p className="text-white/50 font-sans text-xs mt-1">Agent: {listing.list_agent}</p>
              )}
              {listing.list_office_phone && (
                <p className="text-white/50 font-sans text-xs mt-0.5">{listing.list_office_phone}</p>
              )}
            </div>
          )}

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href="tel:2482123333"
              className="flex items-center justify-center gap-2 border border-gold text-gold px-8 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 flex-1"
            >
              <Phone size={13} />
              Call KVK Realty
            </a>
            <a
              href="mailto:info@kvkrealtygroup.com"
              className="flex items-center justify-center border border-white/20 text-white/50 px-8 py-3 text-xs tracking-widest font-sans uppercase hover:border-gold hover:text-gold transition-all duration-300 flex-1"
            >
              Send Inquiry
            </a>
          </div>

          {/* IDX Дисклеймери — ОБОВ'ЯЗКОВО по правилах */}
          <div className="border-t border-white/5 pt-4">
            <p className="text-white/20 text-[10px] font-sans leading-relaxed mb-1">
              IDX provided courtesy of Realcomp II Ltd. via KVK Realty Group, ©2025 Realcomp II Ltd. Shareholders
            </p>
            <p className="text-white/20 text-[10px] font-sans leading-relaxed">
              The accuracy of all information, regardless of source, is not guaranteed or warranted. All information should be independently verified. IDX information is provided exclusively for consumers' personal, non-commercial use.
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PropertyModal