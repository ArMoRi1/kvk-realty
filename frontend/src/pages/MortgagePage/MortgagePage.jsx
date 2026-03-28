import MortgageCalculator from '../../components/ui/MortgageCalculator'

function MortgagePage() {
  return (
    <div className="w-full min-h-screen bg-dark pt-[100px] pb-20 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <p className="text-white/20 text-xs tracking-widest uppercase font-sans mb-2">Tools</p>
        <h1 className="text-white font-serif text-4xl mb-10">Mortgage Calculator</h1>
        <MortgageCalculator />
      </div>
    </div>
  )
}

export default MortgagePage