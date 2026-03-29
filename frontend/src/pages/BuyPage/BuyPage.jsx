import { useState, useEffect, useCallback, useRef } from 'react'
import axiosInstance from '../../api/axiosInstance'
import BuyFilters from '../../components/sections/BuyPageSections/BuyFilters'
import BuyListings from '../../components/sections/BuyPageSections/BuyListings'
import BuyMap from '../../components/sections/BuyPageSections/BuyMap'
import PropertyModal from '../../components/ui/PropertyModal'
import Navbar from '../../components/layout/Navbar'

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
  beds: [], baths: [],
  minSqft: '', maxSqft: '',
  minYear: '', maxYear: '',
  waterfront: 'any', sort: 'default',
}

// Висоти:
// Navbar:     72px
// BuyFilters: 57px
// IDX footer: 28px
const NAVBAR_H  = 72
const FILTER_H  = 57
const FOOTER_H  = 28

function BuyPage() {
  const [filters, setFilters]           = useState(INITIAL_FILTERS)
  const [listings, setListings]         = useState([])
  const [total, setTotal]               = useState(0)
  const [hasMore, setHasMore]           = useState(true)
  const [loading, setLoading]           = useState(true)
  const [loadingMore, setLoadingMore]   = useState(false)
  const [activeId, setActiveId]         = useState(null)
  const [modalListing, setModalListing] = useState(null)

  const pageRef   = useRef(1)
  const paramsRef = useRef({})

  const debouncedSearch   = useDebounce(filters.search,   500)
  const debouncedMinPrice = useDebounce(filters.minPrice, 500)
  const debouncedMaxPrice = useDebounce(filters.maxPrice, 500)
  const debouncedMinSqft  = useDebounce(filters.minSqft,  500)
  const debouncedMaxSqft  = useDebounce(filters.maxSqft,  500)
  const debouncedMinYear  = useDebounce(filters.minYear,  500)
  const debouncedMaxYear  = useDebounce(filters.maxYear,  500)

  paramsRef.current = {
    search:     debouncedSearch,
    status:     filters.status,
    min_price:  debouncedMinPrice,
    max_price:  debouncedMaxPrice,
    beds:       filters.beds.length  > 0 ? filters.beds.join(',')  : '',
    baths:      filters.baths.length > 0 ? filters.baths.join(',') : '',
    min_sqft:   debouncedMinSqft,
    max_sqft:   debouncedMaxSqft,
    min_year:   debouncedMinYear,
    max_year:   debouncedMaxYear,
    waterfront: filters.waterfront,
    type:       filters.type,
    sort:       filters.sort,
  }

  useEffect(() => {
    let cancelled = false
    pageRef.current = 1
    setLoading(true)
    setListings([])

    axiosInstance.get('/properties/', { params: { page: 1, ...paramsRef.current } })
      .then(res => {
        if (cancelled) return
        setListings(res.data.results)
        setTotal(res.data.total)
        setHasMore(res.data.has_more)
      })
      .catch(err => { if (!cancelled) console.error(err) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    debouncedSearch, filters.status, filters.type,
    debouncedMinPrice, debouncedMaxPrice,
    filters.beds, filters.baths,
    debouncedMinSqft, debouncedMaxSqft,
    debouncedMinYear, debouncedMaxYear,
    filters.waterfront, filters.sort,
  ])

  const loadMore = useCallback(() => {
    if (loadingMore || !hasMore) return
    const nextPage = pageRef.current + 1
    pageRef.current = nextPage
    setLoadingMore(true)

    axiosInstance.get('/properties/', { params: { page: nextPage, ...paramsRef.current } })
      .then(res => {
        setListings(prev => {
          const existingIds = new Set(prev.map(l => l.id))
          const newItems = res.data.results.filter(l => !existingIds.has(l.id))
          return [...prev, ...newItems]
        })
        setHasMore(res.data.has_more)
      })
      .catch(err => console.error(err))
      .finally(() => setLoadingMore(false))
  }, [loadingMore, hasMore])

  const set = (key) => (val) => setFilters(prev => ({ ...prev, [key]: val }))

  const activeFiltersCount = [
    filters.status !== 'all',   filters.type !== 'all',
    filters.minPrice,           filters.maxPrice,
    filters.beds.length  > 0,   filters.baths.length > 0,
    filters.minSqft,            filters.maxSqft,
    filters.minYear,            filters.maxYear,
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
    <div className="w-full h-screen bg-dark flex flex-col">
      <Navbar />

      <div
        className="flex flex-col flex-1 overflow-hidden"
        style={{ paddingTop: NAVBAR_H, paddingBottom: FOOTER_H }}
      >
        <BuyFilters
          search={filters.search}         setSearch={set('search')}
          status={filters.status}         setStatus={set('status')}
          type={filters.type}             setType={set('type')}
          minPrice={filters.minPrice}     setMinPrice={set('minPrice')}
          maxPrice={filters.maxPrice}     setMaxPrice={set('maxPrice')}
          beds={filters.beds}             setBeds={set('beds')}
          baths={filters.baths}           setBaths={set('baths')}
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

        <div className="flex flex-1 overflow-hidden">
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
      </div>

      {/* IDX фіксований footer §18.3.6, §18.3.14a */}
      <div
        className="fixed bottom-0 left-0 w-full z-[50] bg-[#0A0A0A]/95 border-t border-white/5 px-6 flex items-center justify-center"
        style={{ height: FOOTER_H }}
      >
        <p className="text-white/15 text-[12px] font-sans text-center">
          IDX provided courtesy of Realcomp II Ltd. via KVK Realty Group, ©2025 Realcomp II Ltd. Shareholders. Any use of search facilities of data on the site, other than by a consumer looking to purchase real estate, is prohibited.
        </p>
      </div>

      <PropertyModal listing={modalListing} onClose={handleModalClose} />
    </div>
  )
}

export default BuyPage