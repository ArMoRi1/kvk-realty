function Navbar() {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">KVK Realty</div>
          <div className="space-x-4">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/buy" className="hover:text-gray-300">Buy</a>
            <a href="/sell" className="hover:text-gray-300">Sell</a>
            <a href="/blog" className="hover:text-gray-300">Blog</a>
            <a href="/agents" className="hover:text-gray-300">Agents</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar