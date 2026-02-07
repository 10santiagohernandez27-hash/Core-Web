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
      className="relative min-h-screen flex flex-col justify-center bg-white overflow-hidden pt-[72px]">

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 w-full">
        <div className="flex flex-col items-center text-center py-16 md:py-20">
          <h1
            className="text-[40px] md:text-[64px] font-bold text-black leading-[1.1] tracking-[-0.02em] max-w-[900px] animate-fade-in-up">

            {heroData.title}
          </h1>
          <h2
            className="text-[16px] md:text-[18px] font-normal text-black/60 mt-6 md:mt-8 max-w-[640px] leading-[1.6] animate-fade-in-up-delay">

            {heroData.subtitle}
          </h2>
          <button
            onClick={scrollToServices}
            className="mt-10 md:mt-12 bg-[#00E5FF] text-black text-[16px] font-medium px-8 py-4 rounded-md hover:bg-[#00B8D4] hover:-translate-y-0.5 active:translate-y-0 transition-[background-color,transform,box-shadow] duration-300 ease-out shadow-sm hover:shadow-md tracking-[0.01em]">

            {heroData.ctaText}
          </button>
        </div>

        {/* Hero Image with subtle parallax */}
        <div
          className="relative w-full max-w-[960px] mx-auto mt-4 md:mt-0 animate-fade-in-up-delay-2"
          style={{ transform: `translateY(${offset}px)` }}>

          <div className="relative rounded-xl overflow-hidden">
            <img
              src={heroData.heroImage}
              alt="Ecosistema digital completo - Core infraestructura para negocios"
              className="w-full h-[320px] sm:h-[400px] md:h-[480px] lg:h-[560px] object-contain !mt-[-10px] !mb-[-10px]"
              loading="eager" />

          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-12 md:mt-16 pb-8 animate-bounce-slow">
          <button
            onClick={scrollToServices}
            className="text-black/30 hover:text-black/60 transition-colors duration-200"
            aria-label="Scroll hacia abajo">

            <ArrowDown size={24} />
          </button>
        </div>
      </div>
    </section>);

};