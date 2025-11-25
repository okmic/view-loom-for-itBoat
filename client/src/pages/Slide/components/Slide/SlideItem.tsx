import type { FC } from "react"
import type { ISlide } from "../../../../../../shared/types/slide"

type PropsType = {
  slide: ISlide["Slides"][0]
}

export const SlideItem: FC<PropsType> = ({ slide }) => (
  <div className="text-center text-white px-6 h-full flex flex-col justify-center">
    <div className="max-w-md md:max-w-2xl mx-auto space-y-6 md:space-y-8">
      {slide.iconImgUrl && (
        <div className="flex justify-center">
          <img 
            src={slide.iconImgUrl} 
            className="w-12 h-12 md:w-16 md:h-16 opacity-90"
            alt=""
          />
        </div>
      )}
      
      <div className="space-y-4 md:space-y-6">
        <h1 className="text-3xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          {slide.title}
        </h1>
        <p className="text-lg md:text-2xl opacity-80 leading-relaxed">
          {slide.subTitle}
        </p>
      </div>

      {slide.list.length > 0 && (
        <div className="space-y-4 md:space-y-5 mt-8 md:mt-12">
          {slide.list.map((li, index) => (
            <div 
              key={index}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-5 md:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:bg-white/10 flex items-start space-x-4"
            >
              {li.iconImgUrl && (
                <img 
                  src={li.iconImgUrl} 
                  className="w-7 h-7 md:w-9 md:h-9 opacity-80 flex-shrink-0 mt-1"
                  alt=""
                />
              )}
              <div className="text-left flex-grow">
                <h3 className="text-base md:text-xl font-semibold text-white/90 leading-relaxed">
                  {li.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
)
