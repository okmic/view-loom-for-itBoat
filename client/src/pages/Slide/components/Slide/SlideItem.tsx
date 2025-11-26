import type { FC } from "react"
import type { ISlide } from "../../../../../../shared/types/slide"

type PropsType = {
  slide: ISlide["Slides"][0]
}

export const SlideItem: FC<PropsType> = ({ slide }) => (
  <div className="text-center text-white h-full flex flex-col justify-center relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49px,rgba(255,255,255,0.02)_50px,transparent_51px),linear-gradient(transparent_49px,rgba(255,255,255,0.02)_50px,transparent_51px)] bg-[size:100px_100px]"></div>
    </div>

    <div className="absolute inset-0 opacity-30">
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full animate-pulse-slow"
          style={{
            left: i < 6 ? `${15 + i * 14}%` : `${15 + (i-6) * 14}%`,
            top: i < 6 ? `${25}%` : `${75}%`,
            animationDelay: `${(i % 6) * 1.5}s`,
            animationDuration: `${6 + (i % 3) * 2}s`
          }}
        />
      ))}
    </div>

    <div className="max-w-5xl mx-auto px-6 space-y-12 relative z-10">
      {/* Иконка с симметричным оформлением */}
      {slide.iconImgUrl && (
        <div className="flex justify-center mb-4">
          <div className="relative">
            {/* Симметричное свечение */}
            <div className="absolute -inset-4 bg-white/5 rounded-full blur-lg"></div>
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-sm"></div>
            
            {/* Контейнер для фото с градиентной рамкой */}
            <div className="relative bg-slate-800/80 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <img 
                src={slide.iconImgUrl} 
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover transform hover:scale-105 transition-transform duration-500"
                alt=""
                onError={(e) => {
                  // Fallback для битых изображений
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>

            {/* Симметричные угловые акценты */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t border-l border-purple-400/50 rounded-tl-lg"></div>
            <div className="absolute -top-2 -right-2 w-4 h-4 border-t border-r border-pink-400/50 rounded-tr-lg"></div>
            <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-purple-400/50 rounded-bl-lg"></div>
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-pink-400/50 rounded-br-lg"></div>
          </div>
        </div>
      )}

      {/* Заголовок с симметричными отступами */}
      <div className="space-y-8">
        <h1 className="text-4xl md:text-6xl font-light tracking-tight text-white px-8">
          {slide.title.split('').map((letter, index) => (
            <span 
              key={index}
              className="inline-block opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Подзаголовок с симметричными границами */}
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute -inset-6 bg-gradient-to-r from-transparent via-white/3 to-transparent rounded-lg"></div>
          <p className="relative text-lg md:text-2xl text-white/70 font-light leading-relaxed px-12 py-8 border-y border-white/10 bg-white/5 backdrop-blur-sm">
            {slide.subTitle}
          </p>
          
          {/* Симметричные боковые элементы */}
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-pink-400 to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Симметричный список */}
      {(slide.list && slide.list.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 max-w-4xl mx-auto">
          {slide.list.map((li, index) => (
            <div 
              key={index}
              className="group relative"
            >
              <div className="flex items-center space-x-4 p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-500 hover:bg-white/10 h-full">
                {/* Улучшенное отображение фото */}
                {li.iconImgUrl && (
                  <div className="flex-shrink-0 relative">
                    <div className="absolute -inset-2 bg-white/10 rounded-xl blur-sm"></div>
                    <div className="relative w-12 h-12 bg-slate-700/80 rounded-lg overflow-hidden border border-white/10">
                      <img 
                        src={li.iconImgUrl} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        alt=""
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.parentElement!.style.background = 'linear-gradient(135deg, #4F46E5, #EC4899)'
                        }}
                      />
                    </div>
                  </div>
                )}
                
                <div className="flex-grow text-left">
                  <h3 className="text-base md:text-lg font-medium text-white/90 leading-tight">
                    {li.title}
                  </h3>
                </div>
                
                {/* Симметричный номер */}
                <div className="flex-shrink-0 w-8 h-8 border border-white/30 rounded-full flex items-center justify-center text-sm text-white/60 group-hover:bg-white/10 group-hover:text-white/80 transition-all duration-300">
                  {index + 1}
                </div>
              </div>

              {/* Симметричные линии при наведении */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-4/5 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Симметричный индикатор прогресса */}
      <div className="flex justify-center space-x-2 pt-12">
        {[...Array(slide.list?.length || 3)].map((_, index) => (
          <div
            key={index}
            className="w-2 h-2 bg-white/30 rounded-full animate-pulse"
            style={{ 
              animationDelay: `${index * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>

    {/* Симметричные угловые акценты */}
    <div className="absolute top-8 right-8 w-6 h-6">
      <div className="w-full h-full border-t border-r border-white/20"></div>
    </div>
    <div className="absolute top-8 left-8 w-6 h-6">
      <div className="w-full h-full border-t border-l border-white/20"></div>
    </div>
    <div className="absolute bottom-8 right-8 w-6 h-6">
      <div className="w-full h-full border-b border-r border-white/20"></div>
    </div>
    <div className="absolute bottom-8 left-8 w-6 h-6">
      <div className="w-full h-full border-b border-l border-white/20"></div>
    </div>

    {/* Центральные направляющие линии (едва заметные) */}
    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 transform -translate-y-1/2"></div>
    <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/5 transform -translate-x-1/2"></div>
  </div>
)