import HeroSlider from '../../components/sections/HomePageSections/HeroSlider'
import AboutUs from '../../components/sections/HomePageSections/AboutUs'
import GetInTouch from '../../components/sections/HomePageSections/GetInTouch'

import ReviewsSection from '../../components/sections/HomePageSections/ReviewsSection';
function HomePage() {
  return (
    <>
      <HeroSlider />
      <AboutUs />
      <ReviewsSection />
      <GetInTouch />
    </>
  )
}

export default HomePage