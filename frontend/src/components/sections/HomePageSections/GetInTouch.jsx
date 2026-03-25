import { useState } from 'react'
import axiosInstance from '../../../api/axiosInstance'

function GetInTouch() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await axiosInstance.post('/contact/', formData)
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 4000)
      setFormData({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      console.error('Error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-transparent border-b border-white/20 text-white placeholder-white/30 py-3 text-sm font-sans tracking-wide focus:outline-none focus:border-gold transition-colors duration-300"

  return (
    <section className="w-full bg-dark py-16 sm:py-24 px-6 sm:px-10 lg:px-16 border-t border-white/10">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Ліва частина */}
          <div className="flex flex-col justify-center">
            <p className="text-gold text-base tracking-widest uppercase font-sans mb-4">
              Contact Us
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white mb-6 lg:mb-8 leading-tight">
              Let's Find Your<br />Perfect Home
            </h2>
            <div className="w-12 h-px bg-gold mb-6 lg:mb-8" />
            <p className="text-white/50 font-sans font-light leading-relaxed mb-8 lg:mb-12 text-sm sm:text-base">
              Whether you're buying, selling, or just exploring — our team is ready to guide you every step of the way.
            </p>

            <div className="flex flex-col gap-5 sm:gap-6">
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">Phone</p>
                <p className="text-white font-sans font-light">248-212-3333</p>
              </div>
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">Email</p>
                <p className="text-white font-sans font-light">info@kvkrealtygroup.com</p>
              </div>
              <div>
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-1">Office</p>
                <p className="text-white font-sans font-light">Metro Detroit Area, Michigan</p>
              </div>
            </div>
          </div>

          {/* Форма */}
          <div className="flex flex-col justify-center">
            {submitted ? (
              <div className="text-center py-12 sm:py-16">
                <div className="w-16 h-px bg-gold mx-auto mb-8" />
                <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">Thank You</p>
                <p className="text-white font-serif text-2xl sm:text-3xl">We'll be in touch soon.</p>
                <div className="w-16 h-px bg-gold mx-auto mt-8" />
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
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
                  rows={4}
                  className={`${inputClass} resize-none`}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 sm:mt-4 border border-gold text-gold px-8 py-4 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300 w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

export default GetInTouch