import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getBlogPost } from '../../api/blog'
import { ArrowLeft } from 'lucide-react'

function BlogPostPage() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getBlogPost(id)
      .then(res => setPost(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="w-full min-h-screen bg-dark flex items-center justify-center">
      <p className="text-gold text-base tracking-widest uppercase font-sans">Loading...</p>
    </div>
  )

  if (!post) return (
    <div className="w-full min-h-screen bg-dark flex items-center justify-center">
      <p className="text-white/50 font-sans text-base">Post not found</p>
    </div>
  )

  return (
    <div className="w-full min-h-screen bg-dark pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-8">

        <Link
          to="/blog"
          className="flex items-center gap-2 text-white/40 hover:text-gold transition-colors duration-300 text-base tracking-widest uppercase font-sans mb-12"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        <p className="text-white/30 text-base tracking-widest uppercase font-sans mb-3">
          {post.date} — {post.location}
        </p>

        {post.category_label && (
          <span
            className="text-base tracking-widest uppercase font-sans border px-3 py-1 mb-6 inline-block"
            style={{ color: post.category_color, borderColor: post.category_color }}
          >
            {post.category_label}
          </span>
        )}

        <h1 className="text-3xl font-serif text-white mt-6 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="w-12 h-px bg-gold mb-10" />

        {post.image && (
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover mb-10"
          />
        )}

        <div className="flex flex-col gap-6">
          {post.text.split('\n').filter(Boolean).map((paragraph, i) => (
            <p key={i} className="text-white/60 font-sans font-light leading-relaxed text-lg">
              {paragraph}
            </p>
          ))}
        </div>

      </div>
    </div>
  )
}

export default BlogPostPage