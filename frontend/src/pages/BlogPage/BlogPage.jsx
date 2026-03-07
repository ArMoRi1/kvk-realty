import { useState } from 'react'
import { posts } from '../../mocks/blog'

const tagColors = {
  "Deal Story": "text-gold border-gold",
  "Event": "text-blue-400 border-blue-400",
  "Market News": "text-green-400 border-green-400",
}

const filters = ["All", "Deal Story", "Event", "Market News"]

function BlogPage() {
  const [active, setActive] = useState("All")

  const filtered = active === "All"
    ? posts
    : posts.filter(p => p.tag === active)

  return (
    <div className="w-full min-h-screen bg-dark pt-24 pb-24">
      <div className="max-w-3xl mx-auto px-8">

        {/* Заголовок */}
        <div className="text-center mb-16">
          <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">
            KVK Realty Group
          </p>
          <h1 className="text-5xl font-serif text-white mb-6">Our Story</h1>
          <div className="w-12 h-px bg-gold mx-auto" />
        </div>

        {/* Фільтри */}
        <div className="flex gap-4 justify-center mb-16 flex-wrap">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
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

          {/* Вертикальна лінія */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

          <div className="flex flex-col gap-16">
            {filtered.map((post, index) => (
              <div
                key={post.id}
                className={`relative pl-12 transition-all duration-500`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Крапка на лінії */}
                <div className="absolute left-0 top-2 -translate-x-1/2 w-3 h-3 bg-gold rotate-45" />

                {/* Дата */}
                <p className="text-white/30 text-xs tracking-widest uppercase font-sans mb-3">
                  {post.date} — {post.location}
                </p>

                {/* Тег */}
                <span className={`text-xs tracking-widest uppercase font-sans border px-3 py-1 mb-4 inline-block ${tagColors[post.tag]}`}>
                  {post.tag}
                </span>

                {/* Фото */}
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 object-cover mt-4 mb-6"
                />

                {/* Текст */}
                <h2 className="text-2xl font-serif text-white mb-4">
                  {post.title}
                </h2>
                <p className="text-white/50 font-sans font-light leading-relaxed">
                  {post.text}
                </p>

                {/* Розділювач */}
                {index < filtered.length - 1 && (
                  <div className="w-full h-px bg-white/5 mt-16" />
                )}

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  )
}

export default BlogPage