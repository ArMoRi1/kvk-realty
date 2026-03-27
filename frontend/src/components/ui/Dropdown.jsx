import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

function Dropdown({ label, children, minWidth = 'min-w-[220px]' }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(p => !p)}
        className={`flex items-center gap-2 border px-4 py-2.5 text-xs tracking-widest font-sans uppercase transition-all duration-300 ${
          open
            ? 'border-gold text-gold'
            : 'border-white/20 text-white/60 hover:border-gold hover:text-gold'
        }`}
      >
        {label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className={`absolute top-full left-0 mt-2 z-20 bg-dark-soft border border-white/10 p-4 ${minWidth}`}>
            {children}
          </div>
        </>
      )}
    </div>
  )
}

export default Dropdown