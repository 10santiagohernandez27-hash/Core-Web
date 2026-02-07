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
        <h2 className="text-[32px] md:text-[48px] font-bold text-black text-center mb-[40px] md:mb-[60px] tracking-[-0.01em] leading-[1.2]">
          Preguntas Frecuentes
        </h2>

        <Accordion type="single" collapsible className="w-full">
          {faqData.map((item, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="border-b border-[#F8F9FA]"
            >
              <AccordionTrigger className="text-[16px] md:text-[18px] font-bold text-black py-5 md:py-6 hover:no-underline hover:bg-[#F8F9FA] px-3 -mx-3 rounded-lg [&>svg]:text-[#00E5FF]">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-[16px] md:text-[18px] text-black/80 leading-[1.6] pb-5">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
