import { useEffect, useRef, useState } from 'react'
import bossPhoto from '../../../assets/img/AboutUs/boss.jpg'
import teamPhoto from '../../../assets/img/AboutUs/team.jpg'

const bossText = `KVK Realty Group was founded with one simple belief — everyone deserves a home they're proud of. 
Our founder brings years of experience in Metro Detroit real estate, deep knowledge of every suburb, 
and a genuine passion for helping families find their perfect place to call home.`

const teamText = `Our team of dedicated agents lives and breathes Metro Detroit. 
We know every street, every neighborhood, every hidden gem in the suburbs — because this is our home too. 
Honesty, local expertise, and genuine care — that's what KVK Realty Group delivers on every deal.`

function AboutUs() {
  const [bossDisplayed, setBossDisplayed] = useState('')
  const [teamDisplayed, setTeamDisplayed] = useState('')
  const [bossVisible, setBossVisible] = useState(false)
  const [teamVisible, setTeamVisible] = useState(false)
  const bossRef = useRef(null)
  const teamRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBossVisible(true) },
      { threshold: 0.3 }
    )
    if (bossRef.current) observer.observe(bossRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTeamVisible(true) },
      { threshold: 0.3 }
    )
    if (teamRef.current) observer.observe(teamRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!bossVisible) return
    let i = 0
    const t = setInterval(() => {
      i++
      setBossDisplayed(bossText.slice(0, i))
      if (i >= bossText.length) clearInterval(t)
    }, 20)
    return () => clearInterval(t)
  }, [bossVisible])

  useEffect(() => {
    if (!teamVisible) return
    let i = 0
    const t = setInterval(() => {
      i++
      setTeamDisplayed(teamText.slice(0, i))
      if (i >= teamText.length) clearInterval(t)
    }, 20)
    return () => clearInterval(t)
  }, [teamVisible])

  return (
    <section className="w-full bg-dark">

      {/* Блок 1 — Текст зліва, фото боса справа */}
      <div
        ref={bossRef}
        className="grid grid-cols-[60fr_40fr] min-h-[600px]"
      >
        {/* Текст */}
        <div className={`flex flex-col justify-center px-16 py-24 transition-all duration-1000 ${
          bossVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}>
          <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">
            Founder & CEO
          </p>
          <h2 className="text-5xl font-serif text-white mb-8 leading-tight">
            About<br />KVK Realty Group
          </h2>
          <div className="w-12 h-px bg-gold mb-8" />
          <p className="text-white/60 font-sans font-light leading-relaxed text-base">
            {bossDisplayed}
            <span className="text-gold animate-pulse">|</span>
          </p>
        </div>

        {/* Фото боса */}
        <div className={`transition-all duration-1000 ${
          bossVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <img
            src={bossPhoto}
            alt="Founder & CEO"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Блок 2 — Фото команди зліва, текст справа і знизу */}
      <div
        ref={teamRef}
        className="grid grid-cols-[60fr_40fr]"
      >
        {/* Фото команди */}
        <div className={`transition-all duration-1000 ${
          teamVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}>
          <img
            src={teamPhoto}
            alt="Our Team"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Текст справа */}
        <div className={`flex flex-col justify-center px-12 py-24 transition-all duration-1000 ${
          teamVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <p className="text-gold text-xs tracking-widest uppercase font-sans mb-4">
            Our Team
          </p>
          <div className="w-12 h-px bg-gold mb-8" />
          <p className="text-white/60 font-sans font-light leading-relaxed text-base">
            {teamDisplayed}
            <span className="text-gold animate-pulse">|</span>
          </p>
        </div>
      </div>

    </section>
  )
}

export default AboutUs