import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
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