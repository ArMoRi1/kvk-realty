import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from '../ui/ScrollToTop'

function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>

    // <div className="flex flex-col min-h-screen">
    //   <Navbar />
    //   <main className="flex-1">
    //     <Outlet />
    //   </main>
    //   <Footer />
    // </div>
  )
}

export default Layout