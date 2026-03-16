import { Link } from 'react-router-dom'
import PropertyCard from '../../ui/PropertyCard'

function BuyListings({ listings, activeId, onCardClick, onClear }) {
  return (
    <div className="w-full lg:w-1/2 overflow-y-auto border-r border-white/10 flex flex-col">

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-4 py-24">
          <div className="w-8 h-px bg-gold/40" />
          <p className="text-white/30 text-xs tracking-widest uppercase font-sans">No properties found</p>
          <button
            onClick={onClear}
            className="text-gold text-xs tracking-widest uppercase font-sans hover:text-gold-light transition-colors duration-300"
          >
            Clear filters
          </button>
          <div className="w-8 h-px bg-gold/40" />
        </div>
      ) : (
        <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          {listings.map(listing => (
            <PropertyCard
              key={listing.id}
              listing={listing}
              isActive={listing.id === activeId}
              onClick={() => onCardClick(listing.id)}
            />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="border-t border-white/10 p-6 text-center mt-auto">
        <p className="text-white/30 text-xs font-sans tracking-widest uppercase mb-3">
          Don't see what you're looking for?
        </p>
        <Link
          to="/agents"
          className="inline-block border border-gold text-gold px-8 py-3 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
        >
          Talk to an Agent
        </Link>
      </div>

    </div>
  )
}

export default BuyListings