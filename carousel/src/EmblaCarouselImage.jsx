import React, { useEffect, useRef } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from './EmblaCarouselDotButton'

const TWEEN_FACTOR_BASE = 0.1

const numberWithinRange = (number, min, max) =>
  Math.min(Math.max(number, min), max)

const EmblaCarousel = (props) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const slideRefs = useRef([])

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

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
        const height = numberWithinRange(1 - distance * tweenFactor, 0.5, 1)

        console.log(height)

        if (inner) {
          inner.style.height = `calc(var(--slide-height) * ${height})`
        }
      })
    }
  
    onScroll()
    emblaApi.on('scroll', onScroll)
    emblaApi.on('reInit', onScroll)
  }, [emblaApi, slides.length])

  return (
    <div className="embla embla--image">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide, i) => (
            <div className="embla__slide" ref={(el) => (slideRefs.current[i] = el)} key={i}>
              <div className="embla__slide__inner">
                <img src={slide.url} alt={`Slide ${slide.number}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        
        
        <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
        <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
      </div>
    </div>
  )
}

export default EmblaCarousel