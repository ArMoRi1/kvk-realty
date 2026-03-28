import { X, Bed, Bath, Maximize2, MapPin, Phone, Mail, Home, Calendar, Waves, Building2, ChevronRight } from 'lucide-react'

const TYPE_MAP = {
  SingleFamilyResidence: 'House',
  Condominium: 'Condo',
  Townhouse: 'Townhouse',
  MultiFamily: 'Multi-Family',
  Land: 'Land',
  ResidentialLease: 'Rental',
}

function formatPrice(price, status) {
  if (!price) return '—'
  return status === 'Active Rental'
    ? `$${price.toLocaleString()}/mo`
    : `$${price.toLocaleString()}`
}

function PropertyModal({ listing, onClose }) {
  if (!listing) return null
  const isRental = listing.status === 'Active Rental'

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 px-4 py-6"
      onClick={onClose}
    >
      <div
        className="relative bg-[#0A0A0A] border border-white/10 w-full max-w-5xl max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Закрити */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center border border-white/20 text-white/40 hover:border-gold hover:text-gold transition-all duration-300"
        >
          <X size={16} />
        </button>

        {/* Верхня частина — фото + основна інфо */}
        <div className="grid grid-cols-1 lg:grid-cols-2">

          {/* Фото */}
          <div className="relative h-72 lg:h-full min-h-[320px] bg-[#111] overflow-hidden">
            {listing.image ? (
              <img
                src={listing.image}
                alt={listing.address}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <Home size={48} className="text-white/10" strokeWidth={1} />
                <p className="text-white/20 text-xs font-sans tracking-widest uppercase">No Photo</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Бейджі на фото */}
            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              <span className={`text-[10px] tracking-widest uppercase font-sans px-2.5 py-1 ${
                isRental ? 'bg-blue-500 text-white' : 'bg-[#C9A84C] text-black'
              }`}>
                {isRental ? 'For Rent' : 'For Sale'}
              </span>
              {listing.type && (
                <span className="text-[10px] tracking-widest uppercase font-sans px-2.5 py-1 bg-black/70 text-white/80 border border-white/20">
                  {TYPE_MAP[listing.type] || listing.type}
                </span>
              )}
              {listing.waterfront && (
                <span className="flex items-center gap-1 text-[10px] tracking-widest uppercase font-sans px-2.5 py-1 bg-blue-600/80 text-white">
                  <Waves size={9} /> Waterfront
                </span>
              )}
            </div>
          </div>

          {/* Права колонка — ціна + адреса + stats */}
          <div className="flex flex-col p-6 sm:p-8 border-l border-white/10">

            {/* Ціна */}
            <div className="mb-6">
              <p className="text-[#C9A84C] text-xs tracking-widest uppercase font-sans mb-1">
                {isRental ? 'Monthly Rent' : 'Listing Price'}
              </p>
              <p className="text-white font-serif text-4xl tracking-tight">
                {formatPrice(listing.price, listing.status)}
              </p>
            </div>

            {/* Адреса */}
            <div className="flex items-start gap-2 mb-6 pb-6 border-b border-white/10">
              <MapPin size={13} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-white font-sans text-sm leading-snug">{listing.address || '—'}</p>
                <p className="text-white/40 font-sans text-xs tracking-widest uppercase mt-1">
                  {listing.city}{listing.zip ? `, ${listing.zip}` : ''}
                </p>
              </div>
            </div>

            {/* 3 основні stats */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { icon: <Bed size={16} strokeWidth={1.5} />, val: listing.beds ?? '—', label: 'Beds' },
                { icon: <Bath size={16} strokeWidth={1.5} />, val: listing.baths ?? '—', label: 'Baths' },
                { icon: <Maximize2 size={15} strokeWidth={1.5} />, val: listing.sqft ? listing.sqft.toLocaleString() : '—', label: 'Sq.Ft.' },
              ].map(({ icon, val, label }) => (
                <div key={label} className="bg-white/5 border border-white/10 py-3 px-2 text-center">
                  <div className="flex justify-center text-[#C9A84C] mb-1.5">{icon}</div>
                  <p className="text-white font-serif text-lg leading-none">{val}</p>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase font-sans mt-1">{label}</p>
                </div>
              ))}
            </div>

            {/* Додаткові поля в сітці */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
              {listing.year_built && (
                <div>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase font-sans mb-1 flex items-center gap-1.5">
                    <Calendar size={10} /> Year Built
                  </p>
                  <p className="text-white font-sans text-sm">{listing.year_built}</p>
                </div>
              )}
              {listing.type && (
                <div>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase font-sans mb-1">Type</p>
                  <p className="text-white font-sans text-sm">{TYPE_MAP[listing.type] || listing.type}</p>
                </div>
              )}
              {listing.zip && (
                <div>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase font-sans mb-1">ZIP</p>
                  <p className="text-white font-sans text-sm">{listing.zip}</p>
                </div>
              )}
              {listing.photos_count > 0 && (
                <div>
                  <p className="text-white/30 text-[10px] tracking-widest uppercase font-sans mb-1">Photos</p>
                  <p className="text-white font-sans text-sm">{listing.photos_count}</p>
                </div>
              )}
              {listing.updated_at && (
                <div className="col-span-2">
                  <p className="text-white/30 text-[10px] tracking-widest uppercase font-sans mb-1">Last Updated</p>
                  <p className="text-white/60 font-sans text-xs">
                    {new Date(listing.updated_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              )}
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col gap-2 mt-auto">
              <a
                href="tel:2482123333"
                className="flex items-center justify-center gap-2 bg-[#C9A84C] text-black px-6 py-3 text-xs tracking-widest font-sans uppercase hover:bg-[#b8963e] transition-colors duration-300"
              >
                <Phone size={13} />
                Call KVK Realty — 248-212-3333
              </a>
              <a
                href="mailto:info@kvkrealtygroup.com"
                className="flex items-center justify-center gap-2 border border-white/20 text-white/50 px-6 py-3 text-xs tracking-widest font-sans uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
              >
                <Mail size={13} />
                Send Inquiry
              </a>
            </div>
          </div>
        </div>

        {/* Нижня частина — опис + listing office + дисклеймери */}
        <div className="border-t border-white/10 grid grid-cols-1 lg:grid-cols-3">

          {/* Опис — займає 2/3 */}
          {listing.description && (
            <div className="lg:col-span-2 p-6 sm:p-8 border-r border-white/10">
              <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-sans mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-[#C9A84C]" />
                Description
              </p>
              <p className="text-white/60 font-sans text-sm leading-relaxed">{listing.description}</p>
            </div>
          )}

          {/* Listing office — 1/3 */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-sans mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-[#C9A84C]" />
                Listing Office
              </p>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 border border-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building2 size={14} className="text-white/40" />
                </div>
                <div>
                  <p className="text-white font-sans text-sm font-medium leading-snug">
                    {listing.list_office || '—'}
                  </p>
                  {listing.list_agent && (
                    <p className="text-white/40 font-sans text-xs mt-1.5">
                      {listing.list_agent}
                    </p>
                  )}
                  {listing.list_agent_email && (
                    <p className="text-white/30 font-sans text-xs mt-0.5 break-all">
                      {listing.list_agent_email}
                    </p>
                  )}
                  {listing.list_office_phone && (
                    <p className="text-white/30 font-sans text-xs mt-0.5">
                      {listing.list_office_phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* IDX дисклеймери — §18.3.4, §18.3.7, §18.3.13, §18.3.14a */}
            <div className="mt-6 pt-4 border-t border-white/5 space-y-1.5">
              <p className="text-white/15 text-[11px] font-sans leading-relaxed">
                IDX provided courtesy of Realcomp II Ltd. via KVK Realty Group and Realcomp II Ltd., ©2025 Realcomp II Ltd. Shareholders
              </p>
              <p className="text-white/15 text-[11px] font-sans leading-relaxed">
                The accuracy of all information, regardless of source, is not guaranteed or warranted. All information should be independently verified.
              </p>
              <p className="text-white/15 text-[11px] font-sans leading-relaxed">
                IDX information is provided exclusively for consumers' personal, non-commercial use and may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing.
              </p>
              <p className="text-white/15 text-[11px] font-sans leading-relaxed">
                Any use of search facilities of data on the site, other than by a consumer looking to purchase real estate, is prohibited.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default PropertyModal