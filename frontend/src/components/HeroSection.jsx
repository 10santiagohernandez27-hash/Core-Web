import React, { useEffect, useRef, useState } from "react";
import { heroData } from "../mock";
import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
  const [offset, setOffset] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        if (rect.bottom > 0) {
          setOffset(window.scrollY * 0.15);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToServices = () => {
    const target = document.querySelector("#servicios");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden pt-[72px]"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 w-full">
        <div className="flex flex-col items-center text-center py-16 md:py-20">
          <h1
            className="text-[36px] sm:text-[48px] md:text-[56px] lg:text-[64px] font-bold text-black leading-[1.1] tracking-tight max-w-[900px] animate-fade-in-up"
          >
            {heroData.title}
          </h1>
          <h2
            className="text-[16px] sm:text-[18px] md:text-[22px] lg:text-[24px] font-normal text-black/60 mt-6 md:mt-8 max-w-[640px] leading-[1.5] animate-fade-in-up-delay"
          >
            {heroData.subtitle}
          </h2>
          <button
            onClick={scrollToServices}
            className="mt-10 md:mt-12 bg-[#D2FDFE] text-black text-[15px] font-semibold px-8 py-4 rounded-md hover:opacity-90 transition-opacity duration-200 hover:scale-[1.02] active:scale-[0.98] transition-transform"
          >
            {heroData.ctaText}
          </button>
        </div>

        {/* Hero Image with subtle parallax */}
        <div
          className="relative w-full max-w-[960px] mx-auto mt-4 md:mt-0 animate-fade-in-up-delay-2"
          style={{ transform: `translateY(${offset}px)` }}
        >
          <div className="relative rounded-xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)]">
            <img
              src={heroData.heroImage}
              alt="Infraestructura digital moderna para negocios - Core"
              className="w-full h-[280px] sm:h-[360px] md:h-[440px] lg:h-[500px] object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12 md:mt-16 pb-8 animate-bounce-slow">
          <button
            onClick={scrollToServices}
            className="text-black/30 hover:text-black/60 transition-colors duration-200"
            aria-label="Scroll hacia abajo"
          >
            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};
