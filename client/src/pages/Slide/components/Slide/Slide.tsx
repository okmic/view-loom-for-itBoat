import React from 'react'

interface SlideProps {
  children: React.ReactNode
  isActive: boolean
  transitionDirection?: 'next' | 'prev'
}

const Slide: React.FC<SlideProps> = ({ children, isActive, transitionDirection = 'next' }) => {
  const getTransitionClasses = () => {
    const baseClasses = 'absolute inset-0 transition-all duration-1000 ease-out transform-gpu'
    
    if (isActive) {
      return `${baseClasses} opacity-100 scale-100 translate-x-0`
    } else {
      if (transitionDirection === 'next') {
        return `${baseClasses} opacity-0 scale-95 translate-x-8`
      } else {
        return `${baseClasses} opacity-0 scale-95 -translate-x-8`
      }
    }
  }

  return (
    <div className={getTransitionClasses()}>
      <div className="w-full h-full flex items-center justify-center p-6 lg:p-12">
        <div className="max-w-4xl w-full">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Slide