import React from 'react'

interface SlideProps {
  children: React.ReactNode
  isActive: boolean
}

const Slide: React.FC<SlideProps> = ({ children, isActive }) => {
  return (
    <div className={`
      absolute inset-0 
      transition-all duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)]
      transform-gpu will-change-transform
      ${isActive 
        ? 'opacity-100 translate-x-0 scale-100' 
        : 'opacity-0 -translate-x-8 scale-95 blur-sm'
      }
    `}>
      <div className="w-full h-full flex items-center justify-center p-6 lg:p-12">
        <div className="max-w-4xl w-full bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl p-8 lg:p-12">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Slide
