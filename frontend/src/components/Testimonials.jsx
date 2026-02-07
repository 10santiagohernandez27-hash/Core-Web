import React from "react";
import { testimonialsData } from "../mock";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Quote } from "lucide-react";

export const Testimonials = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="testimonios"
      ref={sectionRef}
      className="py-[80px] md:py-[120px] bg-white reveal-section"
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-black text-center mb-[40px] md:mb-[60px] tracking-tight">
          Lo que dicen nuestros clientes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {testimonialsData.map((testimonial, idx) => (
            <div
              key={testimonial.id}
              className="border border-[#F8F9FA] rounded-xl p-7 md:p-9 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:scale-[1.02] transition-[box-shadow,transform] duration-300"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                {/* Avatar placeholder */}
                <div className="w-11 h-11 rounded-full bg-[#F2F3D9] flex items-center justify-center flex-shrink-0">
                  <span className="text-[14px] font-bold text-black/50">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <Quote size={18} className="text-[#D2FDFE] mb-3" />
                  <p className="text-[15px] md:text-[16px] text-black/65 leading-[1.65] mb-5">
                    {testimonial.text}
                  </p>
                  <div>
                    <p className="text-[14px] font-semibold text-black">
                      {testimonial.name}
                    </p>
                    <p className="text-[13px] text-black/40">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
