import React from "react";
import { faqData } from "../mock";
import { useScrollReveal } from "../hooks/useScrollReveal";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";

export const FAQ = () => {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="py-[80px] md:py-[120px] bg-white reveal-section"
    >
      <div className="max-w-[720px] mx-auto px-6 md:px-10">
        <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-bold text-black text-center mb-[40px] md:mb-[60px] tracking-tight">
          Preguntas Frecuentes
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border-b border-[#F2F3D9]"
            >
              <AccordionTrigger className="text-[15px] md:text-[16px] font-semibold text-black py-5 md:py-6 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[14px] md:text-[15px] text-black/55 leading-[1.65] pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
