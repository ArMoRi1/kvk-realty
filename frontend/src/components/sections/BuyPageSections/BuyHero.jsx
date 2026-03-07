function BuyHero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <img
        src="../../src/assets/img/Buy/HeroPhoto.avif"
        alt="Buy a home"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-8">
        <p className="text-gold text-xs tracking-widest uppercase font-sans mb-6">
          KVK Realty Group
        </p>
        <h1 className="text-7xl font-serif text-white mb-6 leading-tight">
          Find Your<br />Perfect Home
        </h1>
        <div className="w-12 h-px bg-gold mx-auto mb-6" />
        <p className="text-white/60 tracking-widest text-sm font-sans uppercase mb-10">
          Metro Detroit Area — Homes for every family
        </p>
        <a
          href="tel:2482123333"
          className="border border-gold text-gold px-10 py-4 text-xs tracking-widest font-sans uppercase hover:bg-gold hover:text-black transition-all duration-300"
        >
          Talk to an Agent
        </a>
      </div>
    </section>
  )
}

export default BuyHero