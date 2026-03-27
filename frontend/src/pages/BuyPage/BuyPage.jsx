import { useState, useEffect, useCallback, useRef } from 'react'
import axiosInstance from '../../api/axiosInstance'
import BuyFilters from '../../components/sections/BuyPageSections/BuyFilters'
import BuyListings from '../../components/sections/BuyPageSections/BuyListings'
import BuyMap from '../../components/sections/BuyPageSections/BuyMap'
import PropertyModal from '../../components/ui/PropertyModal'

function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])
  return debounced
}

function BuyPage() {
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

  const [listings, setListings]       = useState([])
  const [total, setTotal]             = useState(0)
  const [hasMore, setHasMore]         = useState(true)
  const [loading, setLoading]         = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)

  const [activeId, setActiveId]         = useState(null)
  const [modalListing, setModalListing] = useState(null)

  const pageRef = useRef(1)

  const debouncedSearch   = useDebounce(search, 500)
  const debouncedMinPrice = useDebounce(minPrice, 500)
  const debouncedMaxPrice = useDebounce(maxPrice, 500)
  const debouncedMinSqft  = useDebounce(minSqft, 500)
  const debouncedMaxSqft  = useDebounce(maxSqft, 500)
  const debouncedMinYear  = useDebounce(minYear, 500)
  const debouncedMaxYear  = useDebounce(maxYear, 500)

  const getParams = useCallback((p) => ({
    page: p,
    search: debouncedSearch,
    status,
    min_price: debouncedMinPrice,
    max_price: debouncedMaxPrice,
    min_beds: minBeds > 0 ? minBeds : '',
    min_baths: minBaths > 0 ? minBaths : '',
    min_sqft: debouncedMinSqft,
    max_sqft: debouncedMaxSqft,
    min_year: debouncedMinYear,
    max_year: debouncedMaxYear,
    waterfront,
    type,
    sort,
  }), [
    debouncedSearch, status, type,
    debouncedMinPrice, debouncedMaxPrice,
    minBeds, minBaths,
    debouncedMinSqft, debouncedMaxSqft,
    debouncedMinYear, debouncedMaxYear,
    waterfront, sort,
  ])

  useEffect(() => {
    let cancelled = false
    pageRef.current = 1
    setLoading(true)
    setListings([])

    axiosInstance.get('/properties/', { params: getParams(1) })
      .then(res => {
        if (cancelled) return
        setListings(res.data.results)
        setTotal(res.data.total)
        setHasMore(res.data.has_more)
      })
      .catch(err => { if (!cancelled) console.error(err) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [getParams])

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return
    const nextPage = pageRef.current + 1
    pageRef.current = nextPage
    setLoadingMore(true)

    axiosInstance.get('/properties/', { params: getParams(nextPage) })
      .then(res => {
        setListings(prev => [...prev, ...res.data.results])
        setHasMore(res.data.has_more)
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingMore(false))
  }, [loadingMore, hasMore, getParams])

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
        resultsCount={total}
        activeFiltersCount={activeFiltersCount}
        onClear={clearAll}
      />

      <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 72px - 57px)' }}>
        <BuyListings
          listings={listings}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          onLoadMore={loadMore}
          activeId={activeId}
          onCardClick={(id) => {
            setActiveId(prev => prev === id ? null : id)
            setModalListing(listings.find(l => l.id === id) || null)
          }}
          onClear={clearAll}
        />
        <BuyMap
          listings={listings}
          activeId={activeId}
          onPinClick={(id) => {
            setActiveId(id)
            setModalListing(listings.find(l => l.id === id) || null)
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