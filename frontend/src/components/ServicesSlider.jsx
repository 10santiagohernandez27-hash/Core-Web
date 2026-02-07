import React, { useState, useCallback } from "react";
import { servicesData } from "../mock";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export const ServicesSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useScrollReveal();

  const goTo = useCallback(
    (index) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const prev = () => goTo(current === 0 ? servicesData.length - 1 : current - 1);
  const next = () => goTo(current === servicesData.length - 1 ? 0 : current + 1);

  const slide = servicesData[current];
  const isImageRight = slide.imagePosition === "right";

  return (
    <section
      id="servicios"
      ref={sectionRef}
      className="py-[80px] md:py-[120px] bg-white reveal-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-black text-center mb-[40px] md:mb-[60px] tracking-tight">
          Nuestros Servicios
        </h2>

        {/* Slider Container */}
        <div className="relative">
          {/* Desktop Layout */}
          <div className="hidden md:block">
            <div
              className={`flex items-center gap-12 lg:gap-16 min-h-[500px] transition-opacity duration-500 ease-in-out ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* Text */}
              <div
                className={`flex-1 ${
                  isImageRight ? "order-1" : "order-2"
                }`}
              >
                <h3 className="text-[28px] md:text-[36px] font-bold text-black leading-[1.2] mb-5">
                  {slide.title}
                </h3>
                <p className="text-[16px] md:text-[18px] text-black/60 leading-[1.6] mb-8 max-w-[480px]">
                  {slide.description}
                </p>
                <button className="border-2 border-[#D2FDFE] text-black text-[14px] font-semibold px-6 py-3 rounded-md hover:bg-[#D2FDFE] transition-colors duration-200 hover:scale-[1.02] active:scale-[0.98]">
                  {slide.ctaText}
                </button>
              </div>

              {/* Image */}
              <div
                className={`flex-1 ${
                  isImageRight ? "order-2" : "order-1"
                }`}
              >
                <div className="relative">
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
                  <button className="border-2 border-[#D2FDFE] text-black text-[14px] font-semibold px-5 py-2.5 rounded-md hover:bg-[#D2FDFE] transition-colors duration-200">
                    {service.ctaText}
                  </button>
                </div>
                {idx < servicesData.length - 1 && (
                  <div className="border-b border-[#F2F3D9] pt-4" />
                )}
              </div>
            ))}
          </div>

          {/* Desktop Navigation Controls */}
          <div className="hidden md:flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-200"
              aria-label="Servicio anterior"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-3">
              {servicesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`rounded-full transition-all duration-300 ${
                    idx === current
                      ? "w-8 h-3 bg-[#D2FDFE]"
                      : "w-3 h-3 bg-black/15 hover:bg-black/30"
                  }`}
                  aria-label={`Ir al servicio ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors duration-200"
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
