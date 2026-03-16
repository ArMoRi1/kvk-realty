import { X, Bed, Bath, Maximize2, MapPin, Phone } from 'lucide-react'
import { TYPE_LABELS, STATUS_LABELS, formatPrice } from '../../mocks/properties'

function PropertyModal({ listing, onClose }) {
  if (!listing) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4"
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
        <div className="relative h-64 sm:h-80 overflow-hidden">
          <img
            src={listing.image}
            alt={listing.address}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />

          {/* Бейджі */}
          <span className={`absolute top-4 left-4 text-[10px] tracking-widest uppercase font-sans px-2 py-1 ${
            listing.status === 'for rent' ? 'bg-blue-500/90 text-white' : 'bg-gold/90 text-black'
          }`}>
            {STATUS_LABELS[listing.status]}
          </span>
          <span className="absolute top-4 left-24 text-[10px] tracking-widest uppercase font-sans px-2 py-1 bg-black/60 text-white/80">
            {TYPE_LABELS[listing.type]}
          </span>

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
              <p className="text-white font-sans text-base">{listing.address}</p>
              <p className="text-white/40 font-sans text-xs tracking-widest uppercase mt-0.5">{listing.city}</p>
            </div>
          </div>

          <div className="w-full h-px bg-white/10 mb-6" />

          {/* Характеристики */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center border border-white/10 py-4 px-2">
              <Bed size={18} strokeWidth={1.5} className="text-gold mb-2" />
              <p className="text-white font-serif text-xl">{listing.beds}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Bedrooms</p>
            </div>
            <div className="flex flex-col items-center border border-white/10 py-4 px-2">
              <Bath size={18} strokeWidth={1.5} className="text-gold mb-2" />
              <p className="text-white font-serif text-xl">{listing.baths}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Bathrooms</p>
            </div>
            <div className="flex flex-col items-center border border-white/10 py-4 px-2">
              <Maximize2 size={18} strokeWidth={1.5} className="text-gold mb-2" />
              <p className="text-white font-serif text-xl">{listing.sqft.toLocaleString()}</p>
              <p className="text-white/40 text-xs tracking-widest uppercase font-sans mt-1">Sq. Ft.</p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:2482123333"
              className="flex items-center justify-center gap-2 border border-gold text-gold px-8 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 flex-1"
            >
              <Phone size={13} />
              Call Us
            </a>
            <a
              href="mailto:info@kvkrealtygroup.com"
              className="flex items-center justify-center border border-white/20 text-white/50 px-8 py-3 text-xs tracking-widest font-sans uppercase hover:border-gold hover:text-gold transition-all duration-300 flex-1"
            >
              Send Inquiry
            </a>
          </div>

        </div>
      </div>
    </div>
  )
}

export default PropertyModal