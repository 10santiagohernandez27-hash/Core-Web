import React from "react";
import { stepsData } from "../mock";
import { useScrollReveal } from "../hooks/useScrollReveal";

export const HowItWorks = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="proceso"
      ref={sectionRef}
      className="py-[80px] md:py-[120px] bg-[#F8F9FA] reveal-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-black text-center mb-[40px] md:mb-[60px] tracking-tight">
          Cómo Funciona
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {stepsData.map((step, idx) => (
            <div
              key={step.number}
              className="group relative bg-white border border-[#F8F9FA] rounded-xl p-8 md:p-10 hover:shadow-[0_4px_12px_rgba(0,229,255,0.15)] transition-shadow duration-300"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <span className="block text-[52px] md:text-[64px] font-bold text-[#00E5FF] leading-none mb-5 select-none">
                {step.number}
              </span>
              <h3 className="text-[18px] md:text-[20px] font-bold text-black leading-[1.3] mb-3">
                {step.title}
              </h3>
              <p className="text-[15px] md:text-[16px] text-black/55 leading-[1.6]">
                {step.description}
              </p>

              {/* Subtle bottom accent on hover */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-16 h-[3px] bg-[#00E5FF] rounded-full transition-[width] duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
