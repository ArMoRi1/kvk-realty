import { useState } from 'react'
import axios from 'axios'
import { X } from 'lucide-react'

function ContactAgentModal({ agent, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axios.post('http://127.0.0.1:8000/api/contact/', {
        ...formData,
        agent_name: agent.name,
        agent_email: agent.email,
      })
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        onClose()
      }, 3000)
    } catch (err) {
      console.error('Error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-3 text-sm font-sans tracking-wide focus:outline-none focus:border-gold transition-colors duration-300"

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <div
        className="relative bg-dark border border-white/10 w-full max-w-lg mx-4 p-10"
        onClick={e => e.stopPropagation()}
      >

        {/* Кнопка закрити */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-gold transition-colors duration-300"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-px bg-gold mx-auto mb-6" />
            <p className="text-gold text-xs tracking-widest uppercase font-sans mb-3">Message Sent</p>
            <p className="text-white font-serif text-2xl">We'll be in touch soon.</p>
            <div className="w-12 h-px bg-gold mx-auto mt-6" />
          </div>
        ) : (
          <>
            {/* Заголовок */}
            <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">
              Contact Agent
            </p>
            <h3 className="text-2xl font-serif text-white mb-1">
              {agent.name}
            </h3>
            <p className="text-white/40 text-xs tracking-widest uppercase font-sans mb-8">
              {agent.role}
            </p>
            <div className="w-8 h-px bg-gold mb-8" />

            {/* Форма */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input
                type="text"
                name="name"
                placeholder="YOUR NAME"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                type="email"
                name="email"
                placeholder="EMAIL ADDRESS"
                value={formData.email}
                onChange={handleChange}
                required
                className={inputClass}
              />
              <input
                type="tel"
                name="phone"
                placeholder="PHONE NUMBER"
                value={formData.phone}
                onChange={handleChange}
                className={inputClass}
              />
              <textarea
                name="message"
                placeholder="YOUR MESSAGE"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
              <button
                type="submit"
                disabled={loading}
                className="mt-2 border border-gold text-gold px-8 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 self-start disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}

      </div>
    </div>
  )
}

export default ContactAgentModal