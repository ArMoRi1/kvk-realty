import { useState, useMemo, useEffect } from 'react'
import { getProperties } from '../../api/properties'
import BuyFilters from '../../components/sections/BuyPageSections/BuyFilters'
import BuyListings from '../../components/sections/BuyPageSections/BuyListings'
import BuyMap from '../../components/sections/BuyPageSections/BuyMap'
import PropertyModal from '../../components/ui/PropertyModal'

function BuyPage() {
  const [listings, setListings]     = useState([])
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const [status, setStatus]         = useState('all')
  const [type, setType]             = useState('all')
  const [minPrice, setMinPrice]     = useState('')
  const [maxPrice, setMaxPrice]     = useState('')
  const [minBeds, setMinBeds]       = useState(0)
  const [minBaths, setMinBaths]     = useState(0)
  const [minSqft, setMinSqft]       = useState('')
  const [maxSqft, setMaxSqft]       = useState('')
  const [minYear, setMinYear]       = useState('')
  const [maxYear, setMaxYear]       = useState('')
  const [waterfront, setWaterfront] = useState('any')
  const [sort, setSort]             = useState('default')
  const [activeId, setActiveId]     = useState(null)
  const [modalListing, setModalListing] = useState(null)

  useEffect(() => {
    getProperties()
      .then(res => setListings(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  const activeFiltersCount = [
    status !== 'all', type !== 'all',
    minPrice, maxPrice,
    minBeds > 0, minBaths > 0,
    minSqft, maxSqft,
    minYear, maxYear,
    waterfront !== 'any',
    sort !== 'default',
  ].filter(Boolean).length

  const clearAll = () => {
    setSearch(''); setStatus('all'); setType('all')
    setMinPrice(''); setMaxPrice('')
    setMinBeds(0); setMinBaths(0)
    setMinSqft(''); setMaxSqft('')
    setMinYear(''); setMaxYear('')
    setWaterfront('any'); setSort('default')
  }

  const filtered = useMemo(() => {
    let result = listings.filter(l => {
      if (search && !l.address?.toLowerCase().includes(search.toLowerCase()) &&
          !l.city?.toLowerCase().includes(search.toLowerCase()) &&
          !l.zip?.includes(search)) return false
      if (status !== 'all' && l.status?.toLowerCase() !== status) return false
      if (type !== 'all' && l.type?.toLowerCase() !== type) return false
      if (minPrice && l.price < Number(minPrice)) return false
      if (maxPrice && l.price > Number(maxPrice)) return false
      if (minBeds > 0 && (l.beds || 0) < minBeds) return false
      if (minBaths > 0 && (l.baths || 0) < minBaths) return false
      if (minSqft && (l.sqft || 0) < Number(minSqft)) return false
      if (maxSqft && (l.sqft || 0) > Number(maxSqft)) return false
      if (minYear && (l.year_built || 0) < Number(minYear)) return false
      if (maxYear && (l.year_built || 0) > Number(maxYear)) return false
      if (waterfront === 'yes' && !l.waterfront) return false
      if (waterfront === 'no' && l.waterfront) return false
      return true
    })

    if (sort === 'price_asc') result = [...result].sort((a, b) => a.price - b.price)
    if (sort === 'price_desc') result = [...result].sort((a, b) => b.price - a.price)
    if (sort === 'newest') result = [...result].sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    if (sort === 'sqft_asc') result = [...result].sort((a, b) => (a.sqft || 0) - (b.sqft || 0))
    if (sort === 'sqft_desc') result = [...result].sort((a, b) => (b.sqft || 0) - (a.sqft || 0))

    return result
  }, [listings, search, status, type, minPrice, maxPrice, minBeds, minBaths, minSqft, maxSqft, minYear, maxYear, waterfront, sort])

  if (loading) return (
    <div className="w-full min-h-screen bg-dark flex items-center justify-center">
      <p className="text-gold text-sm tracking-widest uppercase font-sans">Loading listings...</p>
    </div>
  )

  return (
    <div className="w-full min-h-screen bg-dark flex flex-col pt-[72px]">

      <BuyFilters
        search={search}             setSearch={setSearch}
        status={status}             setStatus={setStatus}
        type={type}                 setType={setType}
        minPrice={minPrice}         setMinPrice={setMinPrice}
        maxPrice={maxPrice}         setMaxPrice={setMaxPrice}
        minBeds={minBeds}           setMinBeds={setMinBeds}
        minBaths={minBaths}         setMinBaths={setMinBaths}
        minSqft={minSqft}           setMinSqft={setMinSqft}
        maxSqft={maxSqft}           setMaxSqft={setMaxSqft}
        minYear={minYear}           setMinYear={setMinYear}
        maxYear={maxYear}           setMaxYear={setMaxYear}
        waterfront={waterfront}     setWaterfront={setWaterfront}
        sort={sort}                 setSort={setSort}
        resultsCount={filtered.length}
        activeFiltersCount={activeFiltersCount}
        onClear={clearAll}
      />

      <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 72px - 57px)' }}>
        <BuyListings
          listings={filtered}
          activeId={activeId}
          onCardClick={(id) => {
            setActiveId(prev => prev === id ? null : id)
            setModalListing(filtered.find(l => l.id === id) || null)
          }}
          onClear={clearAll}
        />
        <BuyMap
          listings={filtered}
          activeId={activeId}
          onPinClick={(id) => {
            setActiveId(id)
            setModalListing(filtered.find(l => l.id === id) || null)
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