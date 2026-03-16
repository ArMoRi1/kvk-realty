import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import BuyPage from './pages/BuyPage/BuyPage'
import SellPage from './pages/SellPage/SellPage'
import AgentsPage from './pages/AgentsPage/AgentsPage'
import BlogPage from './pages/BlogPage/BlogPage'
import BlogPostPage from './pages/BlogPage/BlogPostPage'
import ReviewsPage from './pages/ReviewsPage/ReviewsPage'

function App() {

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === 'K') {
      window.open('http://localhost:8000/admin/', '_blank')
    }
  }
  window.addEventListener('keydown', handleKeyDown)
  return () => window.removeEventListener('keydown', handleKeyDown)
}, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="buy" element={<BuyPage />} />
          <Route path="sell" element={<SellPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:id" element={<BlogPostPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
        </Route>

        <Route path="/agents" element={<AgentsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App