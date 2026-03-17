import { useState, useMemo } from 'react'
import { LISTINGS } from '../../mocks/properties'
import BuyFilters from '../../components/sections/BuyPageSections/BuyFilters'
import BuyListings from '../../components/sections/BuyPageSections/BuyListings'
import BuyMap from '../../components/sections/BuyPageSections/BuyMap'
import PropertyModal from '../../components/ui/PropertyModal'

function BuyPage() {
  const [search, setSearch]       = useState('')
  const [status, setStatus]       = useState('all')
  const [type, setType]           = useState('all')
  const [minPrice, setMinPrice]   = useState('')
  const [maxPrice, setMaxPrice]   = useState('')
  const [minBeds, setMinBeds]     = useState(0)
  const [minBaths, setMinBaths]   = useState(0)
  const [minSqft, setMinSqft]     = useState('')
  const [maxSqft, setMaxSqft]     = useState('')
  const [activeId, setActiveId]   = useState(null)
  const [modalListing, setModalListing] = useState(null)

  const activeFiltersCount = [
    status !== 'all', type !== 'all',
    minPrice, maxPrice,
    minBeds > 0, minBaths > 0,
    minSqft, maxSqft,
  ].filter(Boolean).length

  const clearAll = () => {
    setSearch(''); setStatus('all'); setType('all')
    setMinPrice(''); setMaxPrice('')
    setMinBeds(0); setMinBaths(0)
    setMinSqft(''); setMaxSqft('')
  }

  const filtered = useMemo(() => LISTINGS.filter(l => {
    if (search && !l.address.toLowerCase().includes(search.toLowerCase()) &&
        !l.city.toLowerCase().includes(search.toLowerCase())) return false
    if (status !== 'all' && l.status !== status) return false
    if (type !== 'all' && l.type !== type) return false
    if (minPrice && l.price < Number(minPrice)) return false
    if (maxPrice && l.price > Number(maxPrice)) return false
    if (minBeds > 0 && l.beds < minBeds) return false
    if (minBaths > 0 && l.baths < minBaths) return false
    if (minSqft && l.sqft < Number(minSqft)) return false
    if (maxSqft && l.sqft > Number(maxSqft)) return false
    return true
  }), [search, status, type, minPrice, maxPrice, minBeds, minBaths, minSqft, maxSqft])

  const handleCardClick = (id) => {
    setActiveId(prev => prev === id ? null : id)
    setModalListing(LISTINGS.find(l => l.id === id) || null)
  }

  return (
    <div className="w-full min-h-screen bg-dark flex flex-col pt-[72px]">

      <BuyFilters
        search={search}           setSearch={setSearch}
        status={status}           setStatus={setStatus}
        type={type}               setType={setType}
        minPrice={minPrice}       setMinPrice={setMinPrice}
        maxPrice={maxPrice}       setMaxPrice={setMaxPrice}
        minBeds={minBeds}         setMinBeds={setMinBeds}
        minBaths={minBaths}       setMinBaths={setMinBaths}
        minSqft={minSqft}         setMinSqft={setMinSqft}
        maxSqft={maxSqft}         setMaxSqft={setMaxSqft}
        resultsCount={filtered.length}
        activeFiltersCount={activeFiltersCount}
        onClear={clearAll}
      />

      <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 72px - 57px)' }}>
        <BuyListings
          listings={filtered}
          activeId={activeId}
          onCardClick={handleCardClick}
          onClear={clearAll}
        />
        <BuyMap 
        listings={filtered}
        activeId={activeId}
        onPinClick={(id) => {
          setActiveId(id)
          setModalListing(LISTINGS.find(l => l.id === id) || null)
        }}
        />
      </div>

      <PropertyModal
        listing={modalListing}
        onClose={() => {
          setModalListing(null)
          setActiveId(null)
        }}
      />

    </div>
  )
}

export default BuyPage