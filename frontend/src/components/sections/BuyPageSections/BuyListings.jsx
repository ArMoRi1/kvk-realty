import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import PropertyCard from '../../ui/PropertyCard'

function BuyListings({ listings, loading, loadingMore, hasMore, onLoadMore, activeId, onCardClick, onClear }) {
  const bottomRef = useRef(null)
  const onLoadMoreRef = useRef(onLoadMore)

  // Завжди актуальна функція без перестворення observer
  useEffect(() => {
    onLoadMoreRef.current = onLoadMore
  }, [onLoadMore])

  useEffect(() => {
    if (!hasMore) return

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          onLoadMoreRef.current()
        }
      },
      { threshold: 0, rootMargin: '200px' }
    )

    if (bottomRef.current) {
      observer.observe(bottomRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, listings.length]) // перестворюємо після кожної догрузки

  if (loading) return (
    <div className="w-full lg:w-1/2 border-r border-white/10 flex items-center justify-center">
      <p className="text-gold text-xs tracking-widest uppercase font-sans">Loading listings...</p>
    </div>
  )

  return (
    <div className="w-full lg:w-1/2 overflow-y-auto border-r border-white/10 flex flex-col">

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 py-24">
          <div className="w-8 h-px bg-gold/40" />
          <p className="text-white/30 text-xs tracking-widest uppercase font-sans">No properties found</p>
          <button
            onClick={onClear}
            className="text-gold text-xs tracking-widest uppercase font-sans hover:text-gold-light transition-colors duration-300"
          >
            Clear filters
          </button>
          <div className="w-8 h-px bg-gold/40" />
        </div>
      ) : (
        <>
          <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            {listings.map(listing => (
              <PropertyCard
                key={listing.id}
                listing={listing}
                isActive={listing.id === activeId}
                onClick={() => onCardClick(listing.id)}
              />
            ))}
          </div>

          {/* Trigger — завжди в DOM поки є hasMore */}
          <div ref={bottomRef} className="flex justify-center py-6 min-h-[60px]">
            {loadingMore && (
              <p className="text-white/20 text-xs tracking-widest uppercase font-sans">Loading more...</p>
            )}
          </div>

          {!hasMore && listings.length > 0 && (
            <div className="flex justify-center py-4">
              <p className="text-white/20 text-xs tracking-widest uppercase font-sans">
                All {listings.length} properties loaded
              </p>
            </div>
          )}
        </>
      )}

      {/* IDX дисклеймер */}
      <div className="border-t border-white/5 px-6 py-3 space-y-1">
        <p className="text-white/15 text-[12px] font-sans leading-relaxed">
          IDX provided courtesy of Realcomp II Ltd. via KVK Realty Group and Realcomp II Ltd., ©2025 Realcomp II Ltd. Shareholders
        </p>
        <p className="text-white/15 text-[12px] font-sans leading-relaxed">
          Any use of search facilities of data on the site, other than by a consumer looking to purchase real estate, is prohibited.
        </p>
      </div>

      {/* CTA */}
      <div className="border-t border-white/10 p-6 text-center mt-auto">
        <p className="text-white/30 text-xs font-sans tracking-widest uppercase mb-3">
          Don't see what you're looking for?
        </p>
        <Link
          to="/agents"
          className="inline-block border border-gold text-gold px-8 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
        >
          Talk to an Agent
        </Link>
      </div>

    </div>
  )
}

export default BuyListings