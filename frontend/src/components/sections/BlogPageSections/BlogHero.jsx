import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBlogPosts } from '../../../api/blog'

const tagColors = {
  "Deal Story": "text-gold border-gold",
  "Event": "text-blue-400 border-blue-400",
  "Market News": "text-green-400 border-green-400",
}

const filters = ["All", "Deal Story", "Event", "Market News"]
const PER_PAGE = 3

function BlogHero() {
  const [posts, setPosts] = useState([])
  const [active, setActive] = useState("All")
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPosts()
      .then(res => setPosts(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="w-full min-h-screen bg-dark flex items-center justify-center">
      <p className="text-gold text-xs tracking-widest uppercase font-sans">Loading...</p>
    </div>
  )

  const filtered = active === "All"
    ? posts
    : posts.filter(p => p.tag === active)

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const handleFilter = (filter) => {
    setActive(filter)
    setPage(1)
  }

  return (
    <div className="w-full min-h-screen bg-dark pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-8">

        {/* Заголовок */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif text-white mb-6">Our Story</h1>
          <div className="w-12 h-px bg-gold mx-auto" />
        </div>

        {/* Фільтри */}
        <div className="flex gap-4 justify-center mb-16 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => handleFilter(filter)}
              className={`text-xs tracking-widest uppercase font-sans px-6 py-2 border transition-all duration-300 ${
                active === filter
                  ? 'border-gold bg-gold text-black'
                  : 'border-white/20 text-white/50 hover:border-gold hover:text-gold'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Таймлайн */}
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

          <div className="flex flex-col gap-16">
            {paginated.map((post, index) => (
              <div key={post.id} className="relative pl-12">
                <div className="absolute left-0 top-2 -translate-x-1/2 w-3 h-3 bg-gold rotate-45" />
                <p className="text-white/30 text-xs tracking-widest uppercase font-sans mb-3">
                  {post.date} — {post.location}
                </p>
                <span className={`text-xs tracking-widest uppercase font-sans border px-3 py-1 mb-4 inline-block ${tagColors[post.tag]}`}>
                  {post.tag}
                </span>
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover mt-4 mb-6"
                  />
                )}
                <Link to={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-serif text-white mb-4 hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-white/50 font-sans font-light leading-relaxed">
                  {post.text}
                </p>
                {index < paginated.length - 1 && (
                  <div className="w-full h-px bg-white/5 mt-16" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Пагінація */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-24">
            <button
              onClick={() => setPage(p => p - 1)}
              disabled={page === 1}
              className="text-white/40 hover:text-gold transition-colors duration-300 text-3xl disabled:opacity-20 disabled:cursor-not-allowed"
            >
              ‹
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`w-8 h-8 text-xs font-sans tracking-widest transition-all duration-300 ${
                  p === page
                    ? 'bg-gold text-black'
                    : 'text-white/40 hover:text-gold border border-white/10 hover:border-gold'
                }`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page === totalPages}
              className="text-white/40 hover:text-gold transition-colors duration-300 text-3xl disabled:opacity-20 disabled:cursor-not-allowed"
            >
              ›
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default BlogHero