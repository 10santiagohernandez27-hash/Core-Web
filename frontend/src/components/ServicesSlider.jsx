import React, { useState, useCallback, useRef, useEffect } from "react";
import { servicesData } from "../mock";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const AUTO_INTERVAL = 10000;
const RESUME_DELAY = 5000;
const SWIPE_THRESHOLD = 50;

export const ServicesSlider = () => {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState("visible");
  const [progressKey, setProgressKey] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);

  const transitionTimerRef = useRef(null);
  const autoTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);
  const isHoveredRef = useRef(false);
  const currentRef = useRef(current);
  const phaseRef = useRef(phase);
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchDeltaRef = useRef(0);
  const isSwipingRef = useRef(false);
  const sectionRef = useScrollReveal();

  currentRef.current = current;
  phaseRef.current = phase;

  const clearAllTimers = useCallback(() => {
    if (autoTimerRef.current) { clearInterval(autoTimerRef.current); autoTimerRef.current = null; }
    if (resumeTimerRef.current) { clearTimeout(resumeTimerRef.current); resumeTimerRef.current = null; }
  }, []);

  const doNavigate = useCallback((newIndex) => {
    if (phaseRef.current !== "visible") return;
    setPhase("exiting");
    transitionTimerRef.current = setTimeout(() => {
      setCurrent(newIndex);
      setPhase("entering");
      transitionTimerRef.current = setTimeout(() => {
        setPhase("visible");
      }, 700);
    }, 300);
  }, []);

  const startAutoRotation = useCallback(() => {
    clearAllTimers();
    setAutoPaused(false);
    setProgressKey((k) => k + 1);
    autoTimerRef.current = setInterval(() => {
      if (phaseRef.current === "visible" && !isHoveredRef.current) {
        const nextIdx = (currentRef.current + 1) % servicesData.length;
        doNavigate(nextIdx);
        setProgressKey((k) => k + 1);
      }
    }, AUTO_INTERVAL);
  }, [clearAllTimers, doNavigate]);

  const pauseAndResume = useCallback(() => {
    clearAllTimers();
    setAutoPaused(true);
    resumeTimerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        startAutoRotation();
      }
    }, RESUME_DELAY);
  }, [clearAllTimers, startAutoRotation]);

  useEffect(() => {
    startAutoRotation();
    return () => {
      clearAllTimers();
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    };
  }, [startAutoRotation, clearAllTimers]);

  const handleManualNav = useCallback((newIndex) => {
    doNavigate(newIndex);
    pauseAndResume();
  }, [doNavigate, pauseAndResume]);

  const prev = () => handleManualNav(current === 0 ? servicesData.length - 1 : current - 1);
  const next = () => handleManualNav(current === servicesData.length - 1 ? 0 : current + 1);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setAutoPaused(true);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (!resumeTimerRef.current) {
      startAutoRotation();
    }
  };

  // Touch / Swipe handlers
  const handleTouchStart = useCallback((e) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    touchDeltaRef.current = 0;
    isSwipingRef.current = false;
    isHoveredRef.current = true;
    setAutoPaused(true);
  }, []);

  const handleTouchMove = useCallback((e) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    if (!isSwipingRef.current && Math.abs(deltaX) > 10) {
      if (Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        isSwipingRef.current = true;
      }
    }

    if (isSwipingRef.current) {
      e.preventDefault();
      touchDeltaRef.current = deltaX;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    isHoveredRef.current = false;

    if (isSwipingRef.current && phaseRef.current === "visible") {
      const delta = touchDeltaRef.current;
      if (delta < -SWIPE_THRESHOLD) {
        const nextIdx = (currentRef.current + 1) % servicesData.length;
        handleManualNav(nextIdx);
      } else if (delta > SWIPE_THRESHOLD) {
        const prevIdx = currentRef.current === 0 ? servicesData.length - 1 : currentRef.current - 1;
        handleManualNav(prevIdx);
      } else {
        pauseAndResume();
      }
    } else {
      pauseAndResume();
    }

    isSwipingRef.current = false;
    touchDeltaRef.current = 0;
  }, [handleManualNav, pauseAndResume]);

  const slide = servicesData[current];
  const isImageRight = slide.imagePosition === "right";

  const slideClass =
    phase === "exiting"
      ? "slide-exit"
      : phase === "entering"
      ? "slide-enter"
      : "slide-visible";

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-[80px] md:py-[120px] bg-white reveal-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
        <h2 className="text-[32px] md:text-[48px] font-bold text-black text-center mb-[40px] md:mb-[60px] tracking-[-0.01em] leading-[1.2]">
          Nuestros Servicios
        </h2>

        {/* Slider Container - touch enabled for all breakpoints */}
        <div
          className="relative touch-pan-y"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Slide content */}
          <div className={slideClass}>
            {/* Desktop / Tablet: side-by-side layout */}
            <div className="hidden md:flex items-center gap-12 lg:gap-16 min-h-[500px]">
              <div className={`flex-1 ${isImageRight ? "order-1" : "order-2"}`}>
                <h3 className="slide-title text-[24px] md:text-[32px] font-bold text-black leading-[1.3] mb-5">
                  {slide.title}
                </h3>
                <p className="slide-description text-[16px] md:text-[18px] text-black/60 leading-[1.6] mb-8 max-w-[480px]">
                  {slide.description}
                </p>
                <button className="slide-cta border-2 border-[#00E5FF] text-black text-[16px] font-medium px-6 py-3 rounded-md hover:bg-[#00E5FF] hover:-translate-y-0.5 active:translate-y-0 transition-[background-color,transform,box-shadow] duration-300 tracking-[0.01em]">
                  {slide.ctaText}
                </button>
              </div>
              <div className={`flex-1 ${isImageRight ? "order-2" : "order-1"}`}>
                <div className="slide-image relative">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[400px] lg:h-[460px] object-contain"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile: stacked layout (image top, text below) - swipeable */}
            <div className="md:hidden min-h-[480px]">
              <div className="slide-image">
                <div className="rounded-xl overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-[280px] sm:h-[320px] object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mt-6">
                <h3 className="slide-title text-[22px] sm:text-[24px] font-bold text-black leading-[1.3] mb-3">
                  {slide.title}
                </h3>
                <p className="slide-description text-[15px] sm:text-[16px] text-black/60 leading-[1.6] mb-5">
                  {slide.description}
                </p>
                <button className="slide-cta border-2 border-[#00E5FF] text-black text-[15px] sm:text-[16px] font-medium px-5 py-2.5 rounded-md hover:bg-[#00E5FF] transition-[background-color,transform] duration-300 tracking-[0.01em]">
                  {slide.ctaText}
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Controls - visible on ALL breakpoints */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mt-8 md:mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 flex items-center justify-center text-black hover:text-[#00E5FF] hover:border-[#00E5FF] transition-colors duration-200 flex-shrink-0"
              aria-label="Servicio anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="flex items-center gap-2 sm:gap-3">
              {servicesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleManualNav(idx)}
                  className={`relative rounded-full overflow-hidden transition-[width,height,transform] duration-300 ${
                    idx === current
                      ? "w-8 sm:w-10 h-3 scale-110"
                      : "w-3 h-3 bg-[#F8F9FA] hover:bg-black/20"
                  }`}
                  aria-label={`Ir al servicio ${idx + 1}`}
                >
                  {idx === current && (
                    <>
                      <span className="absolute inset-0 bg-[#00E5FF]/25 rounded-full" />
                      <span
                        key={progressKey}
                        className="absolute inset-y-0 left-0 bg-[#00E5FF] rounded-full"
                        style={{
                          animation: autoPaused
                            ? "none"
                            : `dotFill ${AUTO_INTERVAL}ms linear forwards`,
                          width: autoPaused ? "100%" : undefined,
                          opacity: autoPaused ? 0.5 : 1,
                        }}
                      />
                    </>
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-black/10 flex items-center justify-center text-black hover:text-[#00E5FF] hover:border-[#00E5FF] transition-colors duration-200 flex-shrink-0"
              aria-label="Servicio siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
