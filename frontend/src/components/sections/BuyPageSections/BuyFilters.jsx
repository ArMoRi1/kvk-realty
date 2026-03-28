import { Search, X } from 'lucide-react'
import Dropdown from '../../ui/Dropdown'

const inputClass =
  'w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-2 text-xs font-sans tracking-wide focus:outline-none focus:border-gold transition-colors duration-300'

function BuyFilters({
  search, setSearch,
  status, setStatus,
  type, setType,
  minPrice, setMinPrice,
  maxPrice, setMaxPrice,
  beds, setBeds,
  baths, setBaths,
  minSqft, setMinSqft,
  maxSqft, setMaxSqft,
  minYear, setMinYear,
  maxYear, setMaxYear,
  waterfront, setWaterfront,
  sort, setSort,
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
          {[
            { value: 'all', label: 'All' },
            { value: 'for sale', label: 'For Sale' },
            { value: 'for rent', label: 'For Rent' },
          ].map(s => (
            <button
              key={s.value}
              onClick={() => setStatus(s.value)}
              className={`px-3 sm:px-4 py-2 text-xs tracking-widest font-sans uppercase transition-all duration-300 ${
                status === s.value ? 'bg-gold text-black' : 'text-white/50 hover:text-gold'
              }`}
            >
              {s.label}
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
            {[
              { value: 'all', label: 'All Types' },
              { value: 'house', label: 'House' },
              { value: 'condo', label: 'Condo' },
              { value: 'townhouse', label: 'Townhouse' },
              { value: 'multi-family', label: 'Multi-Family' },
              { value: 'land', label: 'Land' },
            ].map(t => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`text-left text-xs font-sans tracking-widest uppercase py-1.5 px-2 transition-all duration-200 ${
                  type === t.value ? 'text-gold bg-gold/10' : 'text-white/50 hover:text-gold'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </Dropdown>

       {/* Beds */}
        <Dropdown label={beds.length > 0 ? `${beds.join(', ')} bd` : 'Beds'} minWidth="min-w-[220px]">
          <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-3">Bedrooms</p>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5, 6, 7].map(n => (
              <button
                key={n}
                onClick={() => setBeds(
                  beds.includes(n)
                    ? beds.filter(b => b !== n)
                    : [...beds, n].sort((a, b) => a - b)
                )}
                className={`w-8 h-8 text-xs font-sans transition-all duration-200 ${
                  beds.includes(n)
                    ? 'bg-gold text-black'
                    : 'border border-white/20 text-white/50 hover:border-gold hover:text-gold'
                }`}
              >
                {n}
              </button>
            ))}
            {beds.length > 0 && (
              <button
                onClick={() => setBeds([])}
                className="px-2 h-8 text-[10px] font-sans border border-white/10 text-white/30 hover:border-gold hover:text-gold transition-all duration-200"
              >
                Any
              </button>
            )}
          </div>
        </Dropdown>

        {/* Baths */}
        <Dropdown label={baths.length > 0 ? `${baths.join(', ')} ba` : 'Baths'} minWidth="min-w-[220px]">
          <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-3">Bathrooms</p>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4, 5].map(n => (
              <button
                key={n}
                onClick={() => setBaths(
                  baths.includes(n)
                    ? baths.filter(b => b !== n)
                    : [...baths, n].sort((a, b) => a - b)
                )}
                className={`w-8 h-8 text-xs font-sans transition-all duration-200 ${
                  baths.includes(n)
                    ? 'bg-gold text-black'
                    : 'border border-white/20 text-white/50 hover:border-gold hover:text-gold'
                }`}
              >
                {n}
              </button>
            ))}
            {baths.length > 0 && (
              <button
                onClick={() => setBaths([])}
                className="px-2 h-8 text-[10px] font-sans border border-white/10 text-white/30 hover:border-gold hover:text-gold transition-all duration-200"
              >
                Any
              </button>
            )}
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

        {/* Year Built */}
        <Dropdown label="Year Built" minWidth="min-w-[260px]">
          <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-3">Year Built</p>
          <div className="flex gap-3">
            <input type="number" placeholder="From" value={minYear} onChange={e => setMinYear(e.target.value)} className={inputClass} />
            <input type="number" placeholder="To" value={maxYear} onChange={e => setMaxYear(e.target.value)} className={inputClass} />
          </div>
        </Dropdown>

        {/* Waterfront */}
        <Dropdown label={waterfront !== 'any' ? `Waterfront: ${waterfront}` : 'Waterfront'} minWidth="min-w-[180px]">
          <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-3">Waterfront</p>
          <div className="flex flex-col gap-2">
            {[
              { value: 'any', label: 'Any' },
              { value: 'yes', label: 'Waterfront Only' },
              { value: 'no', label: 'No Waterfront' },
            ].map(w => (
              <button
                key={w.value}
                onClick={() => setWaterfront(w.value)}
                className={`text-left text-xs font-sans tracking-widest uppercase py-1.5 px-2 transition-all duration-200 ${
                  waterfront === w.value ? 'text-gold bg-gold/10' : 'text-white/50 hover:text-gold'
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </Dropdown>

        {/* Sort */}
        <Dropdown label="Sort" minWidth="min-w-[200px]">
          <p className="text-gold text-[10px] tracking-widest uppercase font-sans mb-3">Sort By</p>
          <div className="flex flex-col gap-2">
            {[
              { value: 'default', label: 'Default' },
              { value: 'price_asc', label: 'Price ↑' },
              { value: 'price_desc', label: 'Price ↓' },
              { value: 'newest', label: 'Newest' },
              { value: 'sqft_asc', label: 'SqFt ↑' },
              { value: 'sqft_desc', label: 'SqFt ↓' },
            ].map(s => (
              <button
                key={s.value}
                onClick={() => setSort(s.value)}
                className={`text-left text-xs font-sans tracking-widest uppercase py-1.5 px-2 transition-all duration-200 ${
                  sort === s.value ? 'text-gold bg-gold/10' : 'text-white/50 hover:text-gold'
                }`}
              >
                {s.label}
              </button>
            ))}
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