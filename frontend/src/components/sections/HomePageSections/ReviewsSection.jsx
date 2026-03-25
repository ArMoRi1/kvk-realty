import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getReviews } from '../../../api/reviews'
import { Star } from 'lucide-react'

function StarRating({ rating }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={12}
          className={i <= rating ? 'fill-gold text-gold' : 'fill-transparent text-white/20'}
        />
      ))}
    </div>
  )
}

function ReviewCard({ review }) {
  return (
    <div className="border border-white/10 p-6 hover:border-gold/40 transition-all duration-300 flex flex-col gap-4">
      <StarRating rating={review.rating} />
      <p className="text-white/60 font-sans font-light text-sm leading-relaxed line-clamp-4">
        "{review.text}"
      </p>
      <div className="mt-auto pt-4 border-t border-white/10">
        <p className="text-white font-sans text-sm font-medium">{review.author}</p>
        {review.agent_name && (
          <p className="text-gold text-xs tracking-widest uppercase font-sans mt-0.5">
            Agent: {review.agent_name}
          </p>
        )}
      </div>
    </div>
  )
}

function ReviewsSection() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getReviews({ page: 1, per_page: 6 })
      .then(res => setReviews(res.data.results))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <section className="w-full bg-dark-soft py-16 sm:py-24 border-t border-white/10 flex items-center justify-center">
      <p className="text-gold text-xs tracking-widest uppercase font-sans">Loading...</p>
    </section>
  )

  if (reviews.length === 0) return null

  return (
    <section className="w-full bg-dark-soft py-16 sm:py-24 px-6 sm:px-10 lg:px-16 border-t border-white/10">

      {/* Заголовок */}
      <div className="text-center mb-12 sm:mb-16">
        <p className="text-gold text-base tracking-widest uppercase font-sans mb-4">Testimonials</p>
        <h2 className="text-3xl sm:text-4xl font-serif text-white">What Our Clients Say</h2>
        <div className="w-12 h-px bg-gold mx-auto mt-6" />
      </div>

      {/* Grid 2x3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {reviews.map(review => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>

      {/* Кнопка */}
      <div className="text-center mt-12">
        <Link
          to="/reviews"
          className="inline-block border border-gold text-gold px-10 py-4 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
        >
          See All Reviews
        </Link>
      </div>

    </section>
  )
}

export default ReviewsSection