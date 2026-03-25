import { useState, useEffect } from 'react'
import { getReviews } from '../../../api/reviews'
import { Star } from 'lucide-react'

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? 'fill-gold text-gold' : 'fill-transparent text-white/20'}
        />
      ))}
    </div>
  )
}

function AgentReviews({ agentId }) {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!agentId) return
    setLoading(true)
    getReviews({ agent: agentId, per_page: 5 })
      .then(res => setReviews(res.data.results))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [agentId])

  if (loading) return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <p className="text-white/20 text-sm tracking-widest uppercase font-sans">Loading reviews...</p>
    </div>
  )

  if (reviews.length === 0) return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <p className="text-white/20 text-sm tracking-widest uppercase font-sans">No reviews yet</p>
    </div>
  )

  return (
    <div className="mt-6 pt-6 border-t border-white/10">
      <p className="text-gold text-sm tracking-widest uppercase font-sans mb-4">Client Reviews</p>
      <div className="flex flex-col gap-4">
        {reviews.map(review => (
          <div key={review.id} className="border border-white/10 p-4 hover:border-gold/30 transition-all duration-300">
            <StarRating rating={review.rating} />
            <p className="text-white/50 font-sans font-light text-sm leading-relaxed mt-2 line-clamp-3">
              "{review.text}"
            </p>
            <p className="text-white/30 text-sm font-sans mt-2">— {review.author}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AgentReviews