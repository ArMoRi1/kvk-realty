import { useState, useEffect, useCallback } from 'react'
import { X, Bed, Bath, Maximize2, MapPin, Phone, Mail, Home, Calendar, Waves, Building2, ChevronLeft, ChevronRight } from 'lucide-react'
import axiosInstance from '../../api/axiosInstance'
import rcLogo from '../../assets/img/RC_IDX_logo_170x76.gif'

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

function Field({ label, value, gold }) {
  if (!value) return null
  return (
    <div>
      <p className="text-white/30 text-[10px] tracking-widest uppercase font-sans mb-1">{label}</p>
      <div className="w-full h-px bg-[#C9A84C]/40 mb-2" />
      <p className={`font-sans text-sm ${gold ? 'text-[#C9A84C]' : 'text-white'}`}>{value}</p>
    </div>
  )
}

function PhotoSlider({ listing }) {
  const [photos, setPhotos]   = useState(listing.image ? [listing.image] : [])
  const [current, setCurrent] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCurrent(0)
    setPhotos(listing.image ? [listing.image] : [])
    if (!listing.id || !listing.photos_count || listing.photos_count <= 1) return
    setLoading(true)
    axiosInstance.get(`/properties/${listing.id}/media/`)
      .then(res => { if (res.data?.length > 0) setPhotos(res.data) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [listing.id])

  const prev = useCallback((e) => {
    e.stopPropagation()
    setCurrent(c => (c - 1 + photos.length) % photos.length)
  }, [photos.length])

  const next = useCallback((e) => {
    e.stopPropagation()
    setCurrent(c => (c + 1) % photos.length)
  }, [photos.length])

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  setCurrent(c => (c - 1 + photos.length) % photos.length)
      if (e.key === 'ArrowRight') setCurrent(c => (c + 1) % photos.length)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [photos.length])

  if (photos.length === 0) return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#111]">
      <Home size={48} className="text-white/10" strokeWidth={1} />
      <p className="text-white/20 text-xs font-sans tracking-widest uppercase">No Photo</p>
    </div>
  )

  return (
    <div className="relative w-full h-full bg-black overflow-hidden group">
      <img
        key={current}
        src={photos[current]}
        alt=""
        className="w-full h-full object-contain transition-opacity duration-300"
      />

      {photos.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/60 border border-white/20 text-white/70 hover:bg-black/90 hover:text-white hover:border-[#C9A84C] transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/60 border border-white/20 text-white/70 hover:bg-black/90 hover:text-white hover:border-[#C9A84C] transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <ChevronRight size={18} />
          </button>

          <div className="absolute bottom-4 right-4 bg-black/70 border border-white/10 px-2.5 py-1 text-white/50 text-[10px] font-sans tracking-widest">
            {current + 1} / {photos.length}
          </div>

          {photos.length <= 12 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={e => { e.stopPropagation(); setCurrent(i) }}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    i === current ? 'bg-[#C9A84C] w-4' : 'bg-white/30 w-1.5 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
          )}
        </>
      )}

      {loading && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/60 px-2.5 py-1.5 border border-white/10">
          <div className="w-1 h-1 bg-[#C9A84C] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-1 h-1 bg-[#C9A84C] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-1 h-1 bg-[#C9A84C] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </div>
  )
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
        className="relative bg-[#0A0A0A] border border-white/10 w-full max-w-4xl max-h-[92vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Закрити */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center bg-black/80 border border-white/20 text-white/40 hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
        >
          <X size={16} />
        </button>

        {/* Фото — на всю ширину, object-contain */}
        <div className="relative w-full bg-black" style={{ height: '460px' }}>
          <PhotoSlider listing={listing} />

          {/* Бейджі */}
          <div className="absolute top-4 left-4 flex gap-2 flex-wrap z-10 pointer-events-none">
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

        {/* Інфо блок */}
        <div className="p-6 sm:p-8">

          {/* Ціна + адреса */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8 pb-8 border-b border-white/10">
            <div>
              <p className="text-[#C9A84C] text-xs tracking-widest uppercase font-sans mb-1">
                {isRental ? 'Monthly Rent' : 'Listing Price'}
              </p>
              <p className="text-white font-serif text-4xl tracking-tight mb-3">
                {formatPrice(listing.price, listing.status)}
              </p>
              <div className="flex items-start gap-2">
                <MapPin size={13} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white font-sans text-sm">{listing.address || '—'}</p>
                  <p className="text-white/40 font-sans text-xs tracking-widest uppercase mt-0.5">
                    {listing.city}{listing.zip ? `, ${listing.zip}` : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-2 sm:min-w-[220px]">
              <a
                href="tel:2482123333"
                className="flex items-center justify-center gap-2 bg-[#C9A84C] text-black px-5 py-3 text-xs tracking-widest font-sans uppercase hover:bg-[#b8963e] transition-colors duration-300"
              >
                <Phone size={13} />
                Call KVK Realty
              </a>
              <a
                href="mailto:info@kvkrealtygroup.com"
                className="flex items-center justify-center gap-2 border border-white/20 text-white/50 px-5 py-3 text-xs tracking-widest font-sans uppercase hover:border-[#C9A84C] hover:text-[#C9A84C] transition-all duration-300"
              >
                <Mail size={13} />
                Send Inquiry
              </a>
            </div>
          </div>

          {/* Всі деталі в однакових квадратиках з бекенду */}
          {listing.details && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8 pb-8 border-b border-white/10">
              {listing.details
                .filter(d => d.label !== 'Price')
                .map(({ label, value }) => (
                  <div key={label} className="bg-white/5 border border-white/10 py-4 px-3 text-center">
                    <p className="text-white/30 text-[10px] tracking-widest uppercase font-sans mb-2">{label}</p>
                    <div className="w-8 h-px bg-[#C9A84C]/40 mx-auto mb-2" />
                    <p className={`font-serif text-lg leading-none ${value === 'Yes' ? 'text-[#C9A84C]' : 'text-white'}`}>
                      {value}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {/* Опис */}
          {listing.description && (
            <div className="mb-8 pb-8 border-b border-white/10">
              <p className="text-white/30 text-[12px] tracking-widest uppercase font-sans mb-1">Description</p>
              <div className="w-full h-px bg-[#C9A84C]/40 mb-4" />
              <p className="text-white/60 font-sans text-sm leading-relaxed">{listing.description}</p>
            </div>
          )}

          {/* Listing Office */}
          <div className="mb-8 pb-8 border-b border-white/10">
            <p className="text-white/30 text-[12px] tracking-widest uppercase font-sans mb-1">Listing Office</p>
            <div className="w-full h-px bg-[#C9A84C]/40 mb-4" />
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 border border-white/20 flex items-center justify-center flex-shrink-0">
                <Building2 size={14} className="text-white/40" />
              </div>
              <div>
                <p className="text-white font-sans text-base font-medium">{listing.list_office || '—'}</p>
                {listing.list_agent       && <p className="text-white/40 text-sm font-sans mt-1">{listing.list_agent}</p>}
                {listing.list_agent_email && <p className="text-white/30 text-sm font-sans mt-0.5 break-all">{listing.list_agent_email}</p>}
                {listing.list_office_phone && <p className="text-white/30 text-sm font-sans mt-0.5">{listing.list_office_phone}</p>}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mb-3">
            <img src={rcLogo} alt="Realcomp IDX" className="h-10 opacity-40" />
          </div>

          {/* IDX дисклеймери */}
          <div className="space-y-1.5">
            <p className="text-white/15 text-[12px] font-sans leading-relaxed">
              IDX provided courtesy of Realcomp II Ltd. via KVK Realty Group and Realcomp II Ltd., ©2025 Realcomp II Ltd. Shareholders
            </p>
            <p className="text-white/15 text-[12px] font-sans leading-relaxed">
              The accuracy of all information, regardless of source, is not guaranteed or warranted. All information should be independently verified.
            </p>
            <p className="text-white/15 text-[12px] font-sans leading-relaxed">
              IDX information is provided exclusively for consumers' personal, non-commercial use and may not be used for any purpose other than to identify prospective properties consumers may be interested in purchasing.
            </p>
            <p className="text-white/15 text-[12px] font-sans leading-relaxed">
              Any use of search facilities of data on the site, other than by a consumer looking to purchase real estate, is prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyModal