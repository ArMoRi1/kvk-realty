import { useState, useEffect } from 'react'
import { Star, X } from 'lucide-react'
import axiosInstance from '../../api/axiosInstance'
import { getAgents } from '../../api/agents'

const inputClass =
  'w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-3 text-base font-sans tracking-wide focus:outline-none focus:border-gold transition-colors duration-300'

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform duration-150 hover:scale-110"
        >
          <Star
            size={24}
            className={`transition-colors duration-150 ${
              i <= (hovered || value)
                ? 'fill-gold text-gold'
                : 'fill-transparent text-white/20'
            }`}
          />
        </button>
      ))}
    </div>
  )
}

function ReviewForm({ mode = 'inline', onClose, preselectedAgentId = null }) {
  const [agents, setAgents] = useState([])
  const [formData, setFormData] = useState({
    author: '',
    text: '',
    rating: 5,
    agent_id: preselectedAgentId || '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    getAgents()
      .then(res => setAgents(res.data))
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    if (preselectedAgentId) {
      setFormData(prev => ({ ...prev, agent_id: preselectedAgentId }))
    }
  }, [preselectedAgentId])

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await axiosInstance.post('/reviews/create/', formData)
      setSubmitted(true)
      if (mode === 'modal') {
        setTimeout(() => onClose?.(), 3000)
      }
    } catch (err) {
      console.error(err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const content = submitted ? (
    <div className="text-center py-8">
      <div className="w-12 h-px bg-gold mx-auto mb-6" />
      <p className="text-gold text-sm tracking-widest uppercase font-sans mb-3">Thank You!</p>
      <p className="text-white font-serif text-2xl mb-2">Your review has been submitted.</p>
      <p className="text-white/40 font-sans text-base">It will appear after moderation.</p>
      <div className="w-12 h-px bg-gold mx-auto mt-6" />
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <input
        type="text"
        name="author"
        placeholder="YOUR NAME"
        value={formData.author}
        onChange={handleChange}
        required
        className={inputClass}
      />

      <div>
        <p className="text-gold text-sm tracking-widest uppercase font-sans mb-2">Agent (optional)</p>
        <select
          name="agent_id"
          value={formData.agent_id}
          onChange={handleChange}
          className="w-full bg-dark-soft border border-white/20 text-white/70 py-2.5 px-3 text-base font-sans tracking-wide focus:outline-none focus:border-gold transition-colors duration-300"
        >
          <option value="">— General Review —</option>
          {agents.map(agent => (
            <option key={agent.id} value={agent.id}>
              {agent.name} — {agent.role}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="text-gold text-sm tracking-widest uppercase font-sans mb-3">Rating</p>
        <StarPicker
          value={formData.rating}
          onChange={val => setFormData(prev => ({ ...prev, rating: val }))}
        />
      </div>

      <textarea
        name="text"
        placeholder="YOUR REVIEW"
        value={formData.text}
        onChange={handleChange}
        required
        rows={4}
        className={`${inputClass} resize-none`}
      />

      <button
        type="submit"
        disabled={loading}
        className="border border-gold text-gold px-8 py-4 text-sm tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Sending...' : 'Submit Review'}
      </button>

    </form>
  )

  if (mode === 'inline') {
    return (
      <div className="border border-white/10 p-8 sm:p-10">
        <p className="text-gold text-sm tracking-widest uppercase font-sans mb-2">Share Your Experience</p>
        <h3 className="text-2xl font-serif text-white mb-2">Leave a Review</h3>
        <div className="w-8 h-px bg-gold mb-8" />
        {content}
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-dark border border-white/10 w-full max-w-lg mx-4 p-10 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-gold transition-colors duration-300"
        >
          <X size={20} />
        </button>
        <p className="text-gold text-sm tracking-widest uppercase font-sans mb-2">Share Your Experience</p>
        <h3 className="text-2xl font-serif text-white mb-2">Leave a Review</h3>
        <div className="w-8 h-px bg-gold mb-8" />
        {content}
      </div>
    </div>
  )
}

export default ReviewForm