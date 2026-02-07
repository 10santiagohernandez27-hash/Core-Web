import React, { useState, useEffect } from "react";
import { navLinks } from "../mock";
import { Menu, X } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80;
      const y = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-sm shadow-[0_1px_0_0_#F8F9FA]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex items-center justify-between h-[72px]">
          <a
            href="#"
            className="flex items-center gap-3"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <img
              src="https://customer-assets.emergentagent.com/job_digital-core-2/artifacts/s5rv5qa9_Logo%20Png.png"
              alt="Core - Infraestructura Digital"
              className="h-8 md:h-10 w-auto flex-shrink-0"
            />
            <span className="text-[22px] font-bold tracking-[-0.02em] text-black">
              Core<span className="text-[#00E5FF]">.</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-[16px] font-medium text-black/70 hover:text-black transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => handleLinkClick(e, "#contacto")}
              className="text-[16px] font-medium bg-[#00E5FF] text-black px-5 py-2.5 rounded-md hover:bg-[#00B8D4] hover:-translate-y-0.5 active:translate-y-0 transition-[background-color,transform,box-shadow] duration-300 shadow-sm hover:shadow-md tracking-[0.01em]"
            >
              Hablemos
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-black"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-[#F8F9FA] pb-6 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-[16px] font-medium text-black/70 hover:text-black px-2 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={(e) => handleLinkClick(e, "#contacto")}
                className="text-[16px] font-medium bg-[#00E5FF] text-black px-5 py-3 rounded-md text-center hover:bg-[#00B8D4] hover:-translate-y-0.5 active:translate-y-0 transition-[background-color,transform,box-shadow] duration-300 shadow-sm hover:shadow-md mx-2 tracking-[0.01em]"
              >
                Hablemos
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
