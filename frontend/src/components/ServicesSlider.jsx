import React, { useState, useCallback, useRef, useEffect } from "react";
import { servicesData } from "../mock";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export const ServicesSlider = () => {
  const [current, setCurrent] = useState(0);
  const [phase, setPhase] = useState("visible"); // 'visible' | 'exiting' | 'entering'
  const timerRef = useRef(null);
  const sectionRef = useScrollReveal();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const navigate = useCallback(
    (newIndex) => {
      if (phase !== "visible") return;

      setPhase("exiting");

      timerRef.current = setTimeout(() => {
        setCurrent(newIndex);
        setPhase("entering");

        timerRef.current = setTimeout(() => {
          setPhase("visible");
        }, 700);
      }, 300);
    },
    [phase]
  );

  const prev = () =>
    navigate(current === 0 ? servicesData.length - 1 : current - 1);
  const next = () =>
    navigate(current === servicesData.length - 1 ? 0 : current + 1);

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

        {/* Slider Container */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div
              className={`flex items-center gap-12 lg:gap-16 min-h-[500px] ${slideClass}`}
            >
              {/* Text */}
              <div
                className={`flex-1 ${
                  isImageRight ? "order-1" : "order-2"
                }`}
              >
                <h3 className="slide-title text-[28px] md:text-[36px] font-bold text-black leading-[1.2] mb-5">
                  {slide.title}
                </h3>
                <p className="slide-description text-[16px] md:text-[18px] text-black/60 leading-[1.6] mb-8 max-w-[480px]">
                  {slide.description}
                </p>
                <button className="slide-cta border-2 border-[#00E5FF] text-black text-[14px] font-semibold px-6 py-3 rounded-md hover:bg-[#00E5FF] hover:-translate-y-0.5 active:translate-y-0 transition-[background-color,transform,box-shadow] duration-300">
                  {slide.ctaText}
                </button>
              </div>

              {/* Image */}
              <div
                className={`flex-1 ${
                  isImageRight ? "order-2" : "order-1"
                }`}
              >
                <div className="slide-image relative">
                  <div className="rounded-xl overflow-hidden shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06)]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-[400px] lg:h-[460px] object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout - Vertical scroll */}
          <div className="md:hidden space-y-12">
            {servicesData.map((service, idx) => (
              <div key={service.id} className="space-y-5">
                <div className="rounded-xl overflow-hidden shadow-[0_8px_30px_-10px_rgba(0,0,0,0.06)]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-[260px] object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3 className="text-[22px] font-bold text-black leading-[1.2] mb-3">
                    {service.title}
                  </h3>
                  <p className="text-[15px] text-black/60 leading-[1.6] mb-5">
                    {service.description}
                  </p>
                  <button className="border-2 border-[#00E5FF] text-black text-[14px] font-semibold px-5 py-2.5 rounded-md hover:bg-[#00E5FF] transition-[background-color,transform] duration-300 hover:-translate-y-0.5 active:translate-y-0">
                    {service.ctaText}
                  </button>
                </div>
                {idx < servicesData.length - 1 && (
                  <div className="border-b border-[#F8F9FA] pt-4" />
                )}
              </div>
            ))}
          </div>

          {/* Desktop Navigation Controls */}
          <div className="hidden md:flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black hover:text-[#00E5FF] hover:border-[#00E5FF] transition-colors duration-200"
              aria-label="Servicio anterior"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {servicesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(idx)}
                  className={`rounded-full transition-[width,height,background-color,transform] duration-300 ${
                    idx === current
                      ? "w-8 h-3 bg-[#00E5FF] scale-110"
                      : "w-3 h-3 bg-[#F8F9FA] hover:bg-black/20"
                  }`}
                  aria-label={`Ir al servicio ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black hover:text-[#00E5FF] hover:border-[#00E5FF] transition-colors duration-200"
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
