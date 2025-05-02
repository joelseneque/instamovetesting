import React, { useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'

const TWEEN_FACTOR_BASE = 0.1

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max)

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  console.log(options)
  const slideRefs = useRef([])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  useEffect(() => {
      if (!emblaApi) return
    
      slideRefs.current = slideRefs.current.slice(0, slides.length)
      const tweenFactor = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length
    
      const onScroll = () => {
        const engine = emblaApi.internalEngine()
        const scrollProgress = emblaApi.scrollProgress()
    
        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
          let diffToTarget = scrollSnap - scrollProgress
    
          // Handle loop wrap-around
          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              if (loopItem.index !== snapIndex) return
              const sign = Math.sign(loopItem.target())
              if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress)
              if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress)
            })
          }
    
          const slideEl = slideRefs.current[snapIndex]
          if (!slideEl) return
    
          const inner = slideEl.querySelector('.embla__slide__inner')
  
          const distance = Math.abs(diffToTarget)
          const scale = numberWithinRange(1 - distance * tweenFactor, 0.85, 1) // softer scaling
  
          if (inner) {
            inner.style.transform = `scale(${scale})`
          }
        })
      }
    
      onScroll()
      emblaApi.on('scroll', onScroll)
      emblaApi.on('reInit', onScroll)
    }, [emblaApi, slides.length])

  return (
    <div className="embla embla--card">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, i) => (
            <div
              className="embla__slide embla__slide--card"
              ref={(el) => (slideRefs.current[i] = el)}
              key={i}
            >
              <div className="embla__slide__inner">
                <h2>{slide.name}</h2>
                <h4>{slide.location}</h4>
                <p><img src="rating.svg" alt="5 Star Rating" width="100px" /></p>
                <p>{slide.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  )
}

export default EmblaCarousel