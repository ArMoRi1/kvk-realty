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

const INITIAL_FILTERS = {
  search: '', status: 'all', type: 'all',
  minPrice: '', maxPrice: '',
  minBeds: 0, minBaths: 0,
  minSqft: '', maxSqft: '',
  minYear: '', maxYear: '',
  waterfront: 'any', sort: 'default',
}

function BuyPage() {
  const [filters, setFilters] = useState(INITIAL_FILTERS)
  const [listings, setListings]     = useState([])
  const [total, setTotal]           = useState(0)
  const [hasMore, setHasMore]       = useState(true)
  const [loading, setLoading]       = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [activeId, setActiveId]     = useState(null)
  const [modalListing, setModalListing] = useState(null)
  const pageRef = useRef(1)

  const debouncedSearch   = useDebounce(filters.search, 500)
  const debouncedMinPrice = useDebounce(filters.minPrice, 500)
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 500)
  const debouncedMinSqft  = useDebounce(filters.minSqft, 500)
  const debouncedMaxSqft  = useDebounce(filters.maxSqft, 500)
  const debouncedMinYear  = useDebounce(filters.minYear, 500)
  const debouncedMaxYear  = useDebounce(filters.maxYear, 500)

  const buildParams = (page) => ({
    page,
    search:    debouncedSearch,
    status:    filters.status,
    min_price: debouncedMinPrice,
    max_price: debouncedMaxPrice,
    min_beds:  filters.minBeds > 0 ? filters.minBeds : '',
    min_baths: filters.minBaths > 0 ? filters.minBaths : '',
    min_sqft:  debouncedMinSqft,
    max_sqft:  debouncedMaxSqft,
    min_year:  debouncedMinYear,
    max_year:  debouncedMaxYear,
    waterfront: filters.waterfront,
    type:      filters.type,
    sort:      filters.sort,
  })

  useEffect(() => {
    let cancelled = false
    pageRef.current = 1
    setLoading(true)
    setListings([])

    axiosInstance.get('/properties/', { params: buildParams(1) })
      .then(res => {
        if (cancelled) return
        setListings(res.data.results)
        setTotal(res.data.total)
        setHasMore(res.data.has_more)
      })
      .catch(err => { if (!cancelled) console.error(err) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [
    debouncedSearch, filters.status, filters.type,
    debouncedMinPrice, debouncedMaxPrice,
    filters.minBeds, filters.minBaths,
    debouncedMinSqft, debouncedMaxSqft,
    debouncedMinYear, debouncedMaxYear,
    filters.waterfront, filters.sort,
  ])

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return
    const nextPage = pageRef.current + 1
    pageRef.current = nextPage
    setLoadingMore(true)

    axiosInstance.get('/properties/', { params: buildParams(nextPage) })
      .then(res => {
        setListings(prev => [...prev, ...res.data.results])
        setHasMore(res.data.has_more)
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingMore(false))
  }, [loadingMore, hasMore, filters, debouncedSearch, debouncedMinPrice,
      debouncedMaxPrice, debouncedMinSqft, debouncedMaxSqft,
      debouncedMinYear, debouncedMaxYear])

  const set = (key) => (val) => setFilters(prev => ({ ...prev, [key]: val }))

  const activeFiltersCount = [
    filters.status !== 'all', filters.type !== 'all',
    filters.minPrice, filters.maxPrice,
    filters.minBeds > 0, filters.minBaths > 0,
    filters.minSqft, filters.maxSqft,
    filters.minYear, filters.maxYear,
    filters.waterfront !== 'any',
    filters.sort !== 'default',
  ].filter(Boolean).length

  const handleCardClick = useCallback((id) => {
    setActiveId(prev => prev === id ? null : id)
    setModalListing(listings.find(l => l.id === id) || null)
  }, [listings])

  const handlePinClick = useCallback((id) => {
    setActiveId(id)
    setModalListing(listings.find(l => l.id === id) || null)
  }, [listings])

  const handleModalClose = useCallback(() => {
    setModalListing(null)
    setActiveId(null)
  }, [])

  return (
    <div className="w-full min-h-screen bg-dark flex flex-col pt-[72px]">
      <BuyFilters
        search={filters.search}         setSearch={set('search')}
        status={filters.status}         setStatus={set('status')}
        type={filters.type}             setType={set('type')}
        minPrice={filters.minPrice}     setMinPrice={set('minPrice')}
        maxPrice={filters.maxPrice}     setMaxPrice={set('maxPrice')}
        minBeds={filters.minBeds}       setMinBeds={set('minBeds')}
        minBaths={filters.minBaths}     setMinBaths={set('minBaths')}
        minSqft={filters.minSqft}       setMinSqft={set('minSqft')}
        maxSqft={filters.maxSqft}       setMaxSqft={set('maxSqft')}
        minYear={filters.minYear}       setMinYear={set('minYear')}
        maxYear={filters.maxYear}       setMaxYear={set('maxYear')}
        waterfront={filters.waterfront} setWaterfront={set('waterfront')}
        sort={filters.sort}             setSort={set('sort')}
        resultsCount={total}
        activeFiltersCount={activeFiltersCount}
        onClear={() => setFilters(INITIAL_FILTERS)}
      />

      <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 72px - 57px)' }}>
        <BuyListings
          listings={listings}
          loading={loading}
          loadingMore={loadingMore}
          hasMore={hasMore}
          onLoadMore={loadMore}
          activeId={activeId}
          onCardClick={handleCardClick}
          onClear={() => setFilters(INITIAL_FILTERS)}
        />
        <BuyMap
          listings={listings}
          activeId={activeId}
          onPinClick={handlePinClick}
        />
      </div>

      <PropertyModal listing={modalListing} onClose={handleModalClose} />
    </div>
  )
}

export default BuyPage