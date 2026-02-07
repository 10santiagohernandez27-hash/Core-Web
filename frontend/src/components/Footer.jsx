import React from "react";
import { navLinks } from "../mock";

export const Footer = () => {
  const handleLinkClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-black text-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20 py-12 md:py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div>
            <a
              href="#"
              className="text-[22px] font-bold tracking-[-0.02em]"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              Core<span className="text-[#00E5FF]">.</span>
            </a>
            <p className="text-[14px] text-white/40 mt-2 max-w-[280px] leading-[1.5]">
              Infraestructura digital para negocios que quieren crecer.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[13px] text-white/50 hover:text-[#00E5FF] transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[12px] text-white/30">
            © {new Date().getFullYear()} Core. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[12px] text-white/30 hover:text-[#00E5FF] transition-colors duration-200">
              Privacidad
            </a>
            <a href="#" className="text-[12px] text-white/30 hover:text-[#00E5FF] transition-colors duration-200">
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
