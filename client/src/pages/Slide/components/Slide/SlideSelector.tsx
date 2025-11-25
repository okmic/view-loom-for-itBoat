import { useState } from 'react'
import { Play, Headphones, Clock, Layers } from 'lucide-react'

interface ISlide {
  name: string
  startScreen: {
    iconImgUrl: string | null
    title: string
    description: string
  }
  Slides: any[]
  mp3Link?: string
}

interface SlideSelectorProps {
  slides: ISlide[]
  onSlideSelect: (slideName: string) => void
}

function SlideSelector({ slides, onSlideSelect }: SlideSelectorProps) {
  const [selectedSlide, setSelectedSlide] = useState<string>('')

  const handleSlideSelect = (slideName: string) => {
    setSelectedSlide(slideName)
  }

  const startPresentation = () => {
    if (selectedSlide) {
      onSlideSelect(selectedSlide)
    }
  }

  if (slides.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Layers className="w-10 h-10 text-white/40" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-3">Нет доступных презентаций</h1>
          <p className="text-white/60 text-sm md:text-base">Добавьте презентации для отображения</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-4">
            Выберите презентацию
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto">
            Погрузитесь в увлекательные истории с синхронизированным аудио и визуальными эффектами
          </p>
        </div>

        {/* Slides Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {slides.map((slide) => (
            <div
              key={slide.name}
              className={`group relative backdrop-blur-xl rounded-3xl border-2 p-4 md:p-6 cursor-pointer transition-all duration-500 ${
                selectedSlide === slide.name
                  ? 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-400/50 scale-105 shadow-2xl'
                  : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10 hover:scale-105'
              }`}
              onClick={() => handleSlideSelect(slide.name)}
            >
              {/* Selection Indicator */}
              {selectedSlide === slide.name && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-2 h-2 bg-white rounded-full" />
                </div>
              )}

              {/* Content */}
              <div className="text-center space-y-4">
                {/* Icon */}
                <div className={`relative mx-auto w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                  selectedSlide === slide.name 
                    ? 'bg-white/20' 
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  {slide.startScreen.iconImgUrl ? (
                    <img 
                      src={slide.startScreen.iconImgUrl} 
                      className="w-10 h-10 md:w-12 md:h-12 opacity-90"
                      alt=""
                    />
                  ) : (
                    <Play className="w-6 h-6 md:w-8 md:h-8 text-white/60" />
                  )}
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                  <h3 className="font-bold text-white text-lg md:text-xl line-clamp-2 leading-tight">
                    {slide.startScreen.title}
                  </h3>
                  <p className="text-white/60 text-xs md:text-sm leading-relaxed line-clamp-3">
                    {slide.startScreen.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex justify-between items-center text-xs text-white/40 pt-2 border-t border-white/10">
                  <div className="flex items-center space-x-1">
                    <Layers className="w-3 h-3" />
                    <span>{slide.Slides.length + 1}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {slide.mp3Link && (
                      <div className="flex items-center space-x-1">
                        <Headphones className="w-3 h-3" />
                        <span>Аудио</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>~{(slide.Slides.length + 1) * 15}с</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 opacity-0 group-hover:opacity-100 -z-10" />
            </div>
          ))}
        </div>

        {/* Start Button */}
        {selectedSlide && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4">
            <button
              onClick={startPresentation}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-xl border border-purple-400/30 text-white font-semibold text-lg transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:scale-105 active:scale-95 shadow-2xl flex items-center justify-center space-x-3"
            >
              <Play className="w-5 h-5" />
              <span>Начать погружение</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default SlideSelector
