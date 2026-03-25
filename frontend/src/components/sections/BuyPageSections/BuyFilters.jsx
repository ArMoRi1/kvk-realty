import { Search, X } from 'lucide-react'
import { STATUS_LABELS } from '../../../mocks/properties'
import Dropdown from '../../layout/Dropdown'

const inputClass =
  'w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-2 text-xs font-sans tracking-wide focus:outline-none focus:border-gold transition-colors duration-300'

function BuyFilters({
  search, setSearch,
  status, setStatus,
  type, setType,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  minBeds, setMinBeds,
  minBaths, setMinBaths,
  minSqft, setMinSqft,
  maxSqft, setMaxSqft,
  resultsCount,
  onClear,
  activeFiltersCount,
}) {
  return (
    <div className="w-full bg-dark-soft border-b border-white/10 px-4 sm:px-8 py-3 mt-6 flex-shrink-0">
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">

        {/* Пошук */}
        <div className="flex items-center gap-2 border border-white/20 hover:border-gold/50 transition-colors duration-300 px-3 py-2">
          <Search size={13} className="text-white/40 flex-shrink-0" />
          <input
            type="text"
            placeholder="City, address, ZIP..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-white placeholder-white/30 text-xs font-sans focus:outline-none w-40"
          />
          {search && (
            <button onClick={() => setSearch('')} className="text-white/30 hover:text-gold transition-colors duration-200">
              <X size={12} />
            </button>
          )}
        </div>

        {/* Статус */}
        <div className="flex border border-white/20">
          {['all', 'for sale', 'for rent'].map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 sm:px-4 py-2 text-xs tracking-widest font-sans uppercase transition-all duration-300 ${
                status === s ? 'bg-gold text-black' : 'text-white/50 hover:text-gold'
              }`}
            >
              {s === 'all' ? 'All' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {/* Ціна */}
        <Dropdown label="Price" minWidth="min-w-[260px]">
          <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-3">Price Range</p>
          <div className="flex gap-3">
            <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className={inputClass} />
            <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className={inputClass} />
          </div>
        </Dropdown>

        {/* Тип */}
        <Dropdown label="Type" minWidth="min-w-[200px]">
          <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-3">Property Type</p>
          <div className="flex flex-col gap-2">
            {['all', 'house', 'condo', 'townhouse'].map(t => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`text-left text-xs font-sans tracking-widest uppercase py-1.5 px-2 transition-all duration-200 ${
                  type === t ? 'text-gold bg-gold/10' : 'text-white/50 hover:text-gold'
                }`}
              >
                {t === 'all' ? 'All Types' : t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </Dropdown>

        {/* Beds */}
        <Dropdown label={`Beds${minBeds > 0 ? ` ${minBeds}+` : ''}`} minWidth="min-w-[200px]">
          <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-3">Min Bedrooms</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setMinBeds(n)}
                className={`w-8 h-8 text-xs font-sans transition-all duration-200 ${
                  minBeds === n ? 'bg-gold text-black' : 'border border-white/20 text-white/50 hover:border-gold hover:text-gold'
                }`}
              >
                {n === 0 ? 'Any' : `${n}+`}
              </button>
            ))}
          </div>
        </Dropdown>

        {/* Baths */}
        <Dropdown label={`Baths${minBaths > 0 ? ` ${minBaths}+` : ''}`} minWidth="min-w-[200px]">
          <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-3">Min Bathrooms</p>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setMinBaths(n)}
                className={`w-8 h-8 text-xs font-sans transition-all duration-200 ${
                  minBaths === n ? 'bg-gold text-black' : 'border border-white/20 text-white/50 hover:border-gold hover:text-gold'
                }`}
              >
                {n === 0 ? 'Any' : `${n}+`}
              </button>
            ))}
          </div>
        </Dropdown>

        {/* Sqft */}
        <Dropdown label="Sqft" minWidth="min-w-[260px]">
          <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-3">Square Footage</p>
          <div className="flex gap-3">
            <input type="number" placeholder="Min sqft" value={minSqft} onChange={e => setMinSqft(e.target.value)} className={inputClass} />
            <input type="number" placeholder="Max sqft" value={maxSqft} onChange={e => setMaxSqft(e.target.value)} className={inputClass} />
          </div>
        </Dropdown>

        {/* Clear */}
        {activeFiltersCount > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-white/40 hover:text-gold text-xs font-sans tracking-widest uppercase transition-colors duration-300"
          >
            <X size={12} />
            Clear ({activeFiltersCount})
          </button>
        )}

        {/* Кількість результатів */}
        <p className="text-white/30 text-xs font-sans tracking-widest uppercase ml-auto">
          {resultsCount} {resultsCount === 1 ? 'result' : 'results'}
        </p>

      </div>
    </div>
  )
}

export default BuyFilters