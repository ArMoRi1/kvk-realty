import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage/HomePage'
import BuyPage from './pages/BuyPage/BuyPage'
import SellPage from './pages/SellPage/SellPage'
import AgentsPage from './pages/AgentsPage/AgentsPage'
import BlogPage from './pages/BlogPage/BlogPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="buy" element={<BuyPage />} />
          <Route path="sell" element={<SellPage />} />
          <Route path="agents" element={<AgentsPage />} />
          <Route path="blog" element={<BlogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App