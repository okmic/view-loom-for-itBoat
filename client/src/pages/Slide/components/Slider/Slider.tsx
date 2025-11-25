import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Play, Pause, Headphones, RotateCcw } from 'lucide-react'
import Slide from '../Slide/Slide'
import Background from '../ui/Background/Background'
import type { ISlide } from '../../../../../../shared/types/slide'

interface SliderProps {
  children: React.ReactNode[]
  slideData: ISlide
}

type AppState = 'initial' | 'playing' | 'finished'

const Slider: React.FC<SliderProps> = ({ children, slideData }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [appState, setAppState] = useState<AppState>('initial')
  const [showAudioAlert, setShowAudioAlert] = useState(false)
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const animationRef = useRef<number>(0)
  const startTimeRef = useRef<number>(0)
  const currentTimeRef = useRef<number>(0)

  const timeMarks = slideData.audioTimeMarks.length > 0 
    ? slideData.audioTimeMarks 
    : Array.from({ length: children.length - 1 }, (_, i) => (i + 1) * 15000)

  useEffect(() => {
    const audioSource = slideData.mp3Link || ''
    audioRef.current = new Audio(audioSource)
    audioRef.current.preload = 'metadata'

    const handleEnded = () => {
      setIsPlaying(false)
      setAppState('finished')
      setCurrentSlide(0)
    }

    audioRef.current.addEventListener('ended', handleEnded)

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded)
        audioRef.current.pause()
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [slideData.mp3Link])

  const updateSlide = useCallback(() => {
    if (!isPlaying) return

    const elapsed = Date.now() - startTimeRef.current
    currentTimeRef.current = elapsed
    
    let newSlide = 0
    for (let i = timeMarks.length - 1; i >= 0; i--) {
      if (elapsed >= timeMarks[i]) {
        newSlide = i + 1
        break
      }
    }

    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide)
    }

    animationRef.current = requestAnimationFrame(updateSlide)
  }, [isPlaying, currentSlide, timeMarks])

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = Date.now() - currentTimeRef.current
      animationRef.current = requestAnimationFrame(updateSlide)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, updateSlide])

  const togglePlayPause = async () => {
    if (!audioRef.current) return

    if (isPlaying) {
      setIsPlaying(false)
      audioRef.current.pause()
    } else {
      try {
        await audioRef.current.play()
        setIsPlaying(true)
        setAppState('playing')
        setShowAudioAlert(false)
      } catch (error) {
        setShowAudioAlert(true)
      }
    }
  }

  const resetPresentation = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
    setIsPlaying(false)
    setCurrentSlide(0)
    currentTimeRef.current = 0
    setAppState('initial')
    setShowAudioAlert(false)
  }

  const startPresentation = async () => {
    if (!audioRef.current) return
    
    try {
      audioRef.current.currentTime = 0
      await audioRef.current.play()
      setIsPlaying(true)
      setAppState('playing')
      setShowAudioAlert(false)
      currentTimeRef.current = 0
      startTimeRef.current = Date.now()
    } catch (error) {
      setShowAudioAlert(true)
    }
  }

  useEffect(() => {
    const blockNavigation = (e: Event) => {
      if (appState === 'playing') {
        e.preventDefault()
      }
    }

    const blockKeys = (e: KeyboardEvent) => {
      if (appState === 'playing' && [
        'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown',
        'Space', 'PageUp', 'PageDown'
      ].includes(e.key)) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', blockNavigation, { passive: false })
    window.addEventListener('keydown', blockKeys)
    window.addEventListener('touchstart', blockNavigation)
    
    return () => {
      window.removeEventListener('wheel', blockNavigation)
      window.removeEventListener('keydown', blockKeys)
      window.removeEventListener('touchstart', blockNavigation)
    }
  }, [appState])

  const renderInitialScreen = () => (
    <div className="relative w-full h-screen overflow-hidden select-none">
      <Background />
      
      <div className="flex items-center justify-center h-full px-4 pb-20">
        <div className="text-white text-center backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-purple-500/20 rounded-2xl border border-purple-500/30">
              <Headphones className="w-8 h-8 text-purple-300" />
            </div>
          </div>
          <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-200 to-pink-200 bg-clip-text text-transparent">
            {slideData.startScreen.title}
          </h1>
          <p className="mb-6 text-white/70 text-sm leading-relaxed">
            {slideData.startScreen.description}
          </p>
          
          {slideData.mp3Link && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mb-6 backdrop-blur-lg">
              <p className="text-yellow-200 text-xs flex items-center justify-center space-x-2">
                <Headphones className="w-4 h-4" />
                <span>Наденьте наушники для полного погружения</span>
              </p>
            </div>
          )}
          
          <button
            onClick={startPresentation}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 backdrop-blur-lg border border-purple-400/30 transition-all duration-300 active:scale-95 text-white hover:from-purple-600 hover:to-pink-600 flex items-center justify-center space-x-3 text-sm font-medium shadow-lg"
          >
            <Play className="w-5 h-5" />
            <span>Начать погружение</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderFinishedScreen = () => (
    <div className="relative w-full h-screen overflow-hidden select-none">
      <Background />
      
      <div className="flex items-center justify-center h-full px-4 pb-20">
        <div className="text-white text-center backdrop-blur-xl bg-white/5 p-8 rounded-3xl border border-white/10 shadow-2xl max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4 bg-gradient-to-r from-green-200 to-blue-200 bg-clip-text text-transparent">
            Презентация завершена!
          </h1>
          <p className="mb-6 text-white/70 text-sm">
            Надеюсь, это было незабываемое путешествие
          </p>
          
          <button
            onClick={resetPresentation}
            className="w-full py-4 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-300 active:scale-95 text-white hover:bg-white/20 flex items-center justify-center space-x-3 text-sm font-medium"
          >
            <Play className="w-5 h-5" />
            <span>Пережить заново</span>
          </button>
        </div>
      </div>
    </div>
  )

  const renderPresentation = () => (
    <div className="relative w-full h-screen overflow-hidden select-none touch-pan-y">
      <Background />
      
      <div className="w-full h-full flex items-center justify-center">
        <div className="max-w-full max-h-full">
          {React.Children.map(children, (child, index) => (
            <Slide isActive={index === currentSlide}>
              {child}
            </Slide>
          ))}
        </div>
      </div>
      
      {showAudioAlert && (
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full">
          <div className="bg-red-500/20 backdrop-blur-xl border border-red-500/30 rounded-xl p-4 shadow-2xl">
            <p className="text-red-200 text-xs text-center">
              Для полного опыта разрешите воспроизведение аудио
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={togglePlayPause}
          className="p-4 rounded-2xl bg-white/20 backdrop-blur-xl border border-white/30 transition-all duration-300 active:scale-95 hover:bg-white/30 shadow-2xl"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      <div className="absolute bottom-6 right-6 z-10">
        <button
          onClick={resetPresentation}
          className="p-3 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-300 active:scale-95 hover:bg-white/20 shadow-2xl"
          title="С начала"
        >
          <RotateCcw className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  )

  if (appState === 'initial') return renderInitialScreen()
  if (appState === 'finished') return renderFinishedScreen()
  return renderPresentation()
}

export default Slider