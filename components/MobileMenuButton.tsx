"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function MobileMenuButton() {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Escuta os eventos de abertura/fechamento do menu global
  useEffect(() => {
    const handleOpen = () => setIsVisible(false);
    const handleClose = () => setIsVisible(true);
    
    window.addEventListener("mobile-menu-opened", handleOpen);
    window.addEventListener("mobile-menu-closed", handleClose);
    
    return () => {
      window.removeEventListener("mobile-menu-opened", handleOpen);
      window.removeEventListener("mobile-menu-closed", handleClose);
    };
  }, []);

  // Escuta o scroll nativo do container <main> no mobile
  useEffect(() => {
    const mainEl = document.querySelector("main");
    if (!mainEl) return;

    const handleScroll = () => {
      // Quando rolar mais de 20px, aciona a animação de recolher
      setIsScrolled(mainEl.scrollTop > 20);
    };

    mainEl.addEventListener("scroll", handleScroll, { passive: true });
    return () => mainEl.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`lg:hidden fixed top-4 left-0 w-full px-4 h-12 z-[60] flex items-center justify-between pointer-events-none transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      {/* Container Esquerdo: Nome (Anima via scroll) */}
      <div 
        className={`transition-all duration-300 origin-left
          ${isVisible ? "pointer-events-auto" : "pointer-events-none"}
          ${isScrolled ? "-translate-y-[150%] opacity-0 scale-95" : "translate-y-0 opacity-100 scale-100"}
        `}
      >
        <Link href="/" className="neo-btn bg-[#FFD23F] text-black h-12 px-4 sm:px-6 flex items-center justify-center rounded-none font-display font-bold tracking-tight no-underline">
          <span className="text-sm sm:text-base whitespace-nowrap">Ícaro Henrique</span>
        </Link>
      </div>

      {/* Container Direito: Botão de Tema e Botão Hambúrguer */}
      <div className={`flex items-center gap-2 ${isVisible ? "pointer-events-auto" : "pointer-events-none"}`}>
        {/* Botão de Tema (Anima via scroll) */}
        <div 
          className={`transition-all duration-300 origin-right [&>button]:h-12 [&>button]:w-12 [&>button]:bg-[#FFD23F] [&>button]:text-black
            ${isScrolled ? "-translate-y-[150%] opacity-0 scale-95 pointer-events-none" : "translate-y-0 opacity-100 scale-100"}
          `}
        >
          <ThemeToggle />
        </div>

        {/* Botão de Menu (Sempre Fixo) */}
        <button 
          onClick={() => window.dispatchEvent(new CustomEvent("open-mobile-menu"))}
          className="neo-btn bg-[#FFD23F] text-black w-12 h-12 p-0 flex items-center justify-center rounded-none shrink-0"
          aria-label="Abrir menu"
          id="hamburger-btn"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}
