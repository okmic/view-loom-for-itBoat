import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Slider from './components/Slider/Slider'
import type { RootState } from '../../store/store'
import SlideSelector from './components/Slide/SlideSelector'
import { SlideItem } from './components/Slide/SlideItem'
function SlidePage() {
  const slides = useSelector((s: RootState) => s.slide.slides)
  const [selectedSlideName, setSelectedSlideName] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    if (slides !== undefined) {
      setIsLoading(false)
    }
  }, [slides])
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Загрузка презентаций...</p>
        </div>
      </div>
    )
  }
  const safeSlides = Array.isArray(slides) ? slides : []
  if (safeSlides.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Нет доступных презентаций</h1>
          <p className="opacity-70">Добавьте презентации для отображения</p>
        </div>
      </div>
    )
  }
  const currentSlide = safeSlides.find(s => s && s.name === selectedSlideName)
  if (!selectedSlideName || !currentSlide) {
    return <SlideSelector slides={safeSlides} onSlideSelect={setSelectedSlideName} />
  }
  const safeSlidesData = Array.isArray(currentSlide.Slides) ? currentSlide.Slides : []
  const slideComponents = safeSlidesData.map((slide, index) => (
    <SlideItem key={`slide-${index}`} slide={slide} />
  ))
  return (
    <Slider slideData={currentSlide}>
      {slideComponents}
    </Slider>
  )
}
export default SlidePage
