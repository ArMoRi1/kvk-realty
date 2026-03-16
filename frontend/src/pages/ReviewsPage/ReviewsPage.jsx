import { useState, useEffect, useRef, useCallback } from 'react'
import { getReviews } from '../../api/reviews'
import { Star } from 'lucide-react'

const PER_PAGE = 6

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={13}
          className={i <= rating ? 'fill-gold text-gold' : 'fill-transparent text-white/20'}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="border border-white/10 p-6 sm:p-8 hover:border-gold/40 transition-all duration-300 flex flex-col gap-4">
      <StarRating rating={review.rating} />
      <p className="text-white/60 font-sans font-light text-sm leading-relaxed">
        "{review.text}"
      </p>
      <div className="mt-auto pt-4 border-t border-white/10">
        <p className="text-white font-sans text-sm font-medium">{review.author}</p>
        {review.agent_name && (
          <p className="text-gold text-xs tracking-widest uppercase font-sans mt-0.5">
            Agent: {review.agent_name}
          </p>
        )}
        <p className="text-white/20 text-xs font-sans mt-1">{review.created_at}</p>
      </div>
    </div>
  )
}

function ReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const loaderRef = useRef(null)

  const hasMore = reviews.length < total

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return
    setPage(p => p + 1)
  }, [loading, hasMore])

  // Завантаження при зміні page
  useEffect(() => {
    setLoading(true)
    getReviews({ page, per_page: PER_PAGE })
      .then(res => {
        setReviews(prev => page === 1 ? res.data.results : [...prev, ...res.data.results])
        setTotal(res.data.total)
      })
      .catch(err => console.error(err))
      .finally(() => {
        setLoading(false)
        setInitialLoading(false)
      })
  }, [page])

  // IntersectionObserver для infinite scroll
  useEffect(() => {
    const el = loaderRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) loadMore() },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [loadMore])

  return (
    <div className="w-full min-h-screen bg-dark pt-24 pb-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Заголовок */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">Testimonials</p>
          <h1 className="text-4xl sm:text-5xl font-serif text-white mb-6">Client Reviews</h1>
          <div className="w-12 h-px bg-gold mx-auto" />
          {total > 0 && (
            <p className="text-white/30 text-xs tracking-widest uppercase font-sans mt-6">
              {total} {total === 1 ? 'review' : 'reviews'}
            </p>
          )}
        </div>

        {/* Початковий лоадер */}
        {initialLoading ? (
          <div className="flex items-center justify-center py-24">
            <p className="text-gold text-xs tracking-widest uppercase font-sans">Loading...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="flex flex-col items-center py-24 gap-4">
            <div className="w-8 h-px bg-gold/40" />
            <p className="text-white/30 text-xs tracking-widest uppercase font-sans">No reviews yet</p>
            <div className="w-8 h-px bg-gold/40" />
          </div>
        ) : (
          <>
            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>

            {/* Infinite scroll trigger */}
            <div ref={loaderRef} className="flex justify-center mt-12">
              {loading && (
                <p className="text-gold text-xs tracking-widest uppercase font-sans">Loading...</p>
              )}
              {!hasMore && reviews.length > 0 && (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-px bg-gold/40" />
                  <p className="text-white/20 text-xs tracking-widest uppercase font-sans">All reviews loaded</p>
                </div>
              )}
            </div>
          </>
        )}

      </div>
    </div>
  )
}

export default ReviewsPage