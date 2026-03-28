import { useState, useEffect } from 'react'

function formatUSD(n) {
  return '$' + Math.round(n).toLocaleString('en-US')
}

const TERMS = [
  { label: '30-Year Fixed', months: 360 },
  { label: '20-Year Fixed', months: 240 },
  { label: '15-Year Fixed', months: 180 },
  { label: '10-Year Fixed', months: 120 },
]

function MortgageCalculator({ defaultPrice = '' }) {
  const [homePrice,   setHomePrice]   = useState(defaultPrice || '')
  const [downPct,     setDownPct]     = useState(20)
  const [termIdx,     setTermIdx]     = useState(0)
  const [rate,        setRate]        = useState(6.75)
  const [insurance,   setInsurance]   = useState('')
  const [taxPct,      setTaxPct]      = useState(1.2)
  const [result,      setResult]      = useState(null)

  const price    = parseFloat(String(homePrice).replace(/,/g, '')) || 0
  const down     = price * (downPct / 100)
  const loan     = price - down
  const months   = TERMS[termIdx].months
  const monthly  = rate / 100 / 12

  useEffect(() => {
    if (!price || !loan) { setResult(null); return }
    const pi = monthly === 0
      ? loan / months
      : loan * monthly * Math.pow(1 + monthly, months) / (Math.pow(1 + monthly, months) - 1)
    const tax  = (price * (taxPct / 100)) / 12
    const ins  = parseFloat(insurance) || 0
    setResult({ pi, tax, ins, total: pi + tax + ins })
  }, [price, downPct, termIdx, rate, insurance, taxPct])

  const pct = result ? Math.round((result.pi / result.total) * 100) : 0
  const circumference = 2 * Math.PI * 54

  return (
    <div className="bg-[#0f0f0f] border border-white/10 p-6 sm:p-8">
      <p className="text-[#C9A84C] text-[10px] tracking-widest uppercase font-sans mb-6 flex items-center gap-2">
        <span className="w-4 h-px bg-[#C9A84C]" />
        Mortgage Calculator
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Inputs — 2 колонки */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Home Price */}
          <div>
            <label className="text-white/30 text-[10px] tracking-widest uppercase font-sans block mb-2">
              Price of Home
            </label>
            <div className="flex items-center border border-white/20 focus-within:border-[#C9A84C] transition-colors">
              <span className="text-white/40 font-sans text-sm px-3">$</span>
              <input
                type="number"
                value={homePrice}
                onChange={e => setHomePrice(e.target.value)}
                placeholder="500,000"
                className="flex-1 bg-transparent text-white font-sans text-sm py-2.5 pr-3 focus:outline-none placeholder-white/20"
              />
            </div>
          </div>

          {/* Down Payment */}
          <div>
            <label className="text-white/30 text-[10px] tracking-widest uppercase font-sans block mb-2">
              Down Payment
            </label>
            <div className="flex gap-2">
              <div className="flex items-center border border-white/20 focus-within:border-[#C9A84C] transition-colors flex-1">
                <span className="text-white/40 font-sans text-sm px-3">$</span>
                <input
                  type="number"
                  value={price ? Math.round(price * downPct / 100) : ''}
                  onChange={e => {
                    const v = parseFloat(e.target.value) || 0
                    setDownPct(price ? (v / price) * 100 : 20)
                  }}
                  placeholder="100,000"
                  className="flex-1 bg-transparent text-white font-sans text-sm py-2.5 pr-3 focus:outline-none placeholder-white/20 w-0"
                />
              </div>
              <div className="flex items-center border border-white/20 focus-within:border-[#C9A84C] transition-colors w-20">
                <input
                  type="number"
                  value={downPct}
                  onChange={e => setDownPct(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                  className="flex-1 bg-transparent text-white font-sans text-sm py-2.5 pl-3 focus:outline-none w-0"
                />
                <span className="text-white/40 font-sans text-sm pr-3">%</span>
              </div>
            </div>
          </div>

          {/* Loan Term */}
          <div>
            <label className="text-white/30 text-[10px] tracking-widest uppercase font-sans block mb-2">
              Loan Term
            </label>
            <select
              value={termIdx}
              onChange={e => setTermIdx(Number(e.target.value))}
              className="w-full bg-[#0f0f0f] border border-white/20 text-white font-sans text-sm py-2.5 px-3 focus:outline-none focus:border-[#C9A84C] transition-colors appearance-none"
            >
              {TERMS.map((t, i) => (
                <option key={i} value={i}>{t.label}</option>
              ))}
            </select>
          </div>

          {/* Interest Rate */}
          <div>
            <label className="text-white/30 text-[10px] tracking-widest uppercase font-sans block mb-2">
              Interest Rate
            </label>
            <div className="flex items-center border border-white/20 focus-within:border-[#C9A84C] transition-colors">
              <input
                type="number"
                step="0.1"
                value={rate}
                onChange={e => setRate(parseFloat(e.target.value) || 0)}
                className="flex-1 bg-transparent text-white font-sans text-sm py-2.5 pl-3 focus:outline-none"
              />
              <span className="text-white/40 font-sans text-sm px-3">%</span>
            </div>
          </div>

          {/* Home Insurance */}
          <div>
            <label className="text-white/30 text-[10px] tracking-widest uppercase font-sans block mb-2">
              Home Insurance <span className="text-white/20">(optional)</span>
            </label>
            <div className="flex items-center border border-white/20 focus-within:border-[#C9A84C] transition-colors">
              <span className="text-white/40 font-sans text-sm px-3">$</span>
              <input
                type="number"
                value={insurance}
                onChange={e => setInsurance(e.target.value)}
                placeholder="0"
                className="flex-1 bg-transparent text-white font-sans text-sm py-2.5 pr-3 focus:outline-none placeholder-white/20"
              />
            </div>
          </div>

          {/* Property Tax */}
          <div>
            <label className="text-white/30 text-[10px] tracking-widest uppercase font-sans block mb-2">
              Property Tax <span className="text-white/20">(annual %)</span>
            </label>
            <div className="flex items-center border border-white/20 focus-within:border-[#C9A84C] transition-colors">
              <input
                type="number"
                step="0.1"
                value={taxPct}
                onChange={e => setTaxPct(parseFloat(e.target.value) || 0)}
                className="flex-1 bg-transparent text-white font-sans text-sm py-2.5 pl-3 focus:outline-none"
              />
              <span className="text-white/40 font-sans text-sm px-3">%</span>
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col items-center justify-center">
          {result ? (
            <>
              {/* Donut chart */}
              <div className="relative mb-6">
                <svg width="128" height="128" viewBox="0 0 128 128">
                  {/* bg */}
                  <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
                  {/* PI — gold */}
                  <circle
                    cx="64" cy="64" r="54" fill="none"
                    stroke="#C9A84C" strokeWidth="12"
                    strokeDasharray={`${circumference * pct / 100} ${circumference}`}
                    strokeLinecap="butt"
                    transform="rotate(-90 64 64)"
                    style={{ transition: 'stroke-dasharray 0.5s ease' }}
                  />
                  {/* Tax — blue */}
                  <circle
                    cx="64" cy="64" r="54" fill="none"
                    stroke="#3B82F6" strokeWidth="12"
                    strokeDasharray={`${circumference * (result.tax / result.total)} ${circumference}`}
                    strokeDashoffset={`-${circumference * pct / 100}`}
                    strokeLinecap="butt"
                    transform="rotate(-90 64 64)"
                    style={{ transition: 'all 0.5s ease' }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-white/30 text-[9px] tracking-widest uppercase font-sans">Monthly</p>
                  <p className="text-white font-serif text-xl leading-tight">{formatUSD(result.total)}</p>
                </div>
              </div>

              {/* Breakdown */}
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-white/50 text-xs font-sans">
                    <span className="w-2 h-2 bg-[#C9A84C] inline-block" />
                    Principal & Interest
                  </span>
                  <span className="text-white text-xs font-sans">{formatUSD(result.pi)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2 text-white/50 text-xs font-sans">
                    <span className="w-2 h-2 bg-blue-500 inline-block" />
                    Property Tax
                  </span>
                  <span className="text-white text-xs font-sans">{formatUSD(result.tax)}</span>
                </div>
                {result.ins > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-2 text-white/50 text-xs font-sans">
                      <span className="w-2 h-2 bg-white/30 inline-block" />
                      Insurance
                    </span>
                    <span className="text-white text-xs font-sans">{formatUSD(result.ins)}</span>
                  </div>
                )}
                <div className="border-t border-white/10 pt-2 flex justify-between items-center">
                  <span className="text-white/30 text-xs font-sans tracking-widest uppercase">Loan Amount</span>
                  <span className="text-[#C9A84C] text-xs font-sans">{formatUSD(loan)}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <p className="text-white/20 text-xs font-sans tracking-widest uppercase">
                Enter home price<br />to calculate
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MortgageCalculator