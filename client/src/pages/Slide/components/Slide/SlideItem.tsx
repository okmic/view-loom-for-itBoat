import type { FC } from "react"
import type { ISlide } from "../../../../../../shared/types/slide"
type PropsType = {
  slide: ISlide["Slides"][0]
}
export const SlideItem: FC<PropsType> = ({ slide }) => (
  <div className="text-center text-white h-full flex flex-col justify-center relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_24px,rgba(255,255,255,0.02)_25px,transparent_26px),linear-gradient(transparent_24px,rgba(255,255,255,0.02)_25px,transparent_26px)] bg-[size:50px_50px] md:bg-[size:100px_100px]"></div>
    </div>
    <div className="absolute inset-0 opacity-20 md:opacity-30">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full animate-pulse-slow"
          style={{
            left: i < 4 ? `${10 + i * 25}%` : `${10 + (i-4) * 25}%`,
            top: i < 4 ? `${20}%` : `${80}%`,
            animationDelay: `${(i % 4) * 1.5}s`,
            animationDuration: `${6 + (i % 3) * 2}s`
          }}
        />
      ))}
    </div>
    <div className="max-w-5xl mx-auto px-4 md:px-6 space-y-6 md:space-y-12 relative z-10">
      {slide.iconImgUrl && (
        <div className="flex justify-center mb-2 md:mb-4">
          <div className="relative">
            <div className="absolute -inset-2 md:-inset-4 bg-white/5 rounded-full blur-md md:blur-lg"></div>
            <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-sm"></div>
            
            <div className="relative bg-slate-800/80 backdrop-blur-md rounded-xl md:rounded-2xl p-2 md:p-3 border border-white/10">
              <img 
                src={slide.iconImgUrl} 
                className="relative w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-lg md:rounded-xl object-cover transform hover:scale-105 transition-transform duration-500"
                alt=""
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>

            <div className="hidden md:block absolute -top-2 -left-2 w-4 h-4 border-t border-l border-purple-400/50 rounded-tl-lg"></div>
            <div className="hidden md:block absolute -top-2 -right-2 w-4 h-4 border-t border-r border-pink-400/50 rounded-tr-lg"></div>
            <div className="hidden md:block absolute -bottom-2 -left-2 w-4 h-4 border-b border-l border-purple-400/50 rounded-bl-lg"></div>
            <div className="hidden md:block absolute -bottom-2 -right-2 w-4 h-4 border-b border-r border-pink-400/50 rounded-br-lg"></div>
          </div>
        </div>
      )}
      <div className="space-y-4 md:space-y-8">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-light tracking-tight text-white px-2 md:px-8 leading-tight md:leading-normal">
          {slide.title.split('').map((letter, index) => (
            <span 
              key={index}
              className="inline-block opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.02}s` }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute -inset-2 md:-inset-6 bg-gradient-to-r from-transparent via-white/3 to-transparent rounded-lg"></div>
          <p className="relative text-sm md:text-lg lg:text-2xl text-white/70 font-light leading-relaxed px-4 md:px-12 py-4 md:py-8 border-y border-white/10 bg-white/5 backdrop-blur-sm">
            {slide.subTitle}
          </p>
          <div className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-purple-400 to-transparent rounded-full"></div>
          <div className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 w-1 h-16 bg-gradient-to-b from-pink-400 to-transparent rounded-full"></div>
        </div>
      </div>
      {(slide.list && slide.list.length > 0) && (
        <div className="grid grid-cols-1 gap-3 md:gap-4 md:grid-cols-2 mt-8 md:mt-16 max-w-4xl mx-auto">
          {slide.list.map((li, index) => (
            <div 
              key={index}
              className="group relative"
            >
              <div className="flex items-center space-x-3 md:space-x-4 p-4 md:p-6 rounded-lg md:rounded-xl bg-white/5 backdrop-blur-sm border border-white/5 hover:border-white/20 transition-all duration-500 hover:bg-white/10 h-full">
                {li.iconImgUrl && (
                  <div className="flex-shrink-0 relative">
                    <div className="absolute -inset-1 md:-inset-2 bg-white/10 rounded-lg md:rounded-xl blur-sm"></div>
                    <div className="relative w-8 h-8 md:w-12 md:h-12 bg-slate-700/80 rounded-md md:rounded-lg overflow-hidden border border-white/10">
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
                <div className="flex-grow text-left min-w-0">
                  <h3 className="text-xs md:text-base lg:text-lg font-medium text-white/90 leading-tight break-words">
                    {li.title}
                  </h3>
                </div>
                <div className="flex-shrink-0 w-6 h-6 md:w-8 md:h-8 border border-white/30 rounded-full flex items-center justify-center text-xs md:text-sm text-white/60 group-hover:bg-white/10 group-hover:text-white/80 transition-all duration-300">
                  {index + 1}
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-4/5 transition-all duration-500 rounded-full"></div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center space-x-1 md:space-x-2 pt-6 md:pt-12">
        {[...Array(slide.list?.length || 3)].map((_, index) => (
          <div
            key={index}
            className="w-1 h-1 md:w-2 md:h-2 bg-white/30 rounded-full animate-pulse"
            style={{ 
              animationDelay: `${index * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>
    </div>
    <div className="hidden md:block absolute top-8 right-8 w-6 h-6">
      <div className="w-full h-full border-t border-r border-white/20"></div>
    </div>
    <div className="hidden md:block absolute top-8 left-8 w-6 h-6">
      <div className="w-full h-full border-t border-l border-white/20"></div>
    </div>
    <div className="hidden md:block absolute bottom-8 right-8 w-6 h-6">
      <div className="w-full h-full border-b border-r border-white/20"></div>
    </div>
    <div className="hidden md:block absolute bottom-8 left-8 w-6 h-6">
      <div className="w-full h-full border-b border-l border-white/20"></div>
    </div>
    <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 transform -translate-y-1/2"></div>
    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/5 transform -translate-x-1/2"></div>
  </div>
)
