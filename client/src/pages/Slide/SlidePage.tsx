import { useState } from 'react'
import { useSelector } from 'react-redux'
import Slider from './components/Slider/Slider'
import type { RootState } from '../../store/store'
import SlideSelector from './components/Slide/SlideSelector'
import { SlideItem } from './components/Slide/SlideItem'

function SlidePage() {
  const slides = useSelector((s: RootState) => s.slide.slides)
  const [selectedSlideName, setSelectedSlideName] = useState<string>('')
  const currentSlide = slides.find(s => s.name === selectedSlideName)
  if (!selectedSlideName || !currentSlide) {
    return <SlideSelector slides={slides} onSlideSelect={setSelectedSlideName} />
  }
  const slideComponents = [
    <SlideItem key="slide1" slide={currentSlide.Slides[0]} />,
    ...currentSlide.Slides.map((slide, index) => (
      <SlideItem key={`slide-${index}`} slide={slide} />
    ))
  ]
  return (
    <Slider slideData={currentSlide}>
      {slideComponents}
    </Slider>
  )
}

export default SlidePage
