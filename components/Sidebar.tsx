"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Post, Category, Tag } from "@/types/blog";

export function Sidebar({ posts = [], categories = [], tags = [] }: { posts?: Post[], categories?: Category[], tags?: Tag[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Filtra os artigos com base no termo buscado para o dropdown flutuante
  const searchResults = searchQuery.trim()
    ? posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    : [];

  // Executa a busca e redireciona para a página dedicada de busca (/search)
  const handleExecuteSearch = (queryToSearch = searchQuery) => {
    if (!queryToSearch.trim()) return;
    router.push(`/search?q=${encodeURIComponent(queryToSearch.trim())}`);
    setSearchQuery("");
    setIsOpen(false);
  };

  // Fecha a busca e o menu ao mudar de rota no mobile
  useEffect(() => {
    setIsOpen(false);
    setSearchQuery("");

    // Reseta o scrollLeft do container pai do mobile-wrapper.
    const wrapper = document.getElementById("mobile-wrapper");
    if (wrapper?.parentElement) {
      wrapper.parentElement.scrollLeft = 0;
    }

    // Reseta o scroll do <main> para o topo instantaneamente.
    const mainEl = document.querySelector("main");
    if (mainEl) {
      mainEl.scrollTop = 0;
    }
  }, [pathname]);

  // Manipula as classes do mobile-wrapper para deslizar a tela
  useEffect(() => {
    const wrapper = document.getElementById("mobile-wrapper");

    if (wrapper) {
      if (isOpen) {
        wrapper.style.transitionTimingFunction = 'ease-out';
        wrapper.classList.remove("-translate-x-[100vw]");
        wrapper.classList.add("translate-x-0");
        window.dispatchEvent(new CustomEvent("mobile-menu-opened"));
      } else {
        wrapper.style.transitionTimingFunction = 'ease-in-out';
        wrapper.classList.remove("translate-x-0");
        wrapper.classList.add("-translate-x-[100vw]");
        window.dispatchEvent(new CustomEvent("mobile-menu-closed"));

        if (wrapper.parentElement) {
          wrapper.parentElement.scrollLeft = 0;
        }
      }
    }
  }, [isOpen]);

  // Escuta clique fora para fechar o dropdown de busca
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Escuta o botão independente
  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-mobile-menu", handleOpen);
    return () => window.removeEventListener("open-mobile-menu", handleOpen);
  }, []);

  return (
    <>
      {/* Container Principal da Sidebar */}
      <aside className="w-full lg:w-[360px] h-[100dvh] lg:h-auto overflow-y-auto no-scrollbar lg:overflow-visible flex flex-col px-6 py-6 lg:px-8 lg:py-12 shrink-0 bg-transparent">

        {/* Cabeçalho Mobile com Botão de Fechar */}
        <div className="flex justify-between items-center lg:hidden mb-6">
          <span className="font-display text-xl font-bold">Navegação</span>
          <button
            onClick={() => setIsOpen(false)}
            className="neo-btn bg-[#FF6B6B] text-black w-12 h-12 p-0 flex items-center justify-center rounded-none"
            aria-label="Fechar menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="space-y-6">

          {/* Profile Block */}
          <div className="bg-[#B8A9FA] p-8 text-black neo-border neo-shadow flex flex-col items-center text-center">
            <div className="w-40 h-40 bg-black rounded-full mb-5 border-4 border-black overflow-hidden relative">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "url('imgs/perfil.jpeg')" }}></div>
            </div>
            <h1 className="font-display text-2xl font-bold mb-2 tracking-tight">Ícaro Henrique</h1>
            <h2 className="font-heading text-lg font-bold mb-3">Engenheiro DevOps e SRE</h2>
            <p className="font-body text-sm font-medium opacity-80">
              Constantemente na tentativa de manter o ambiente de produção funcionando.
            </p>
          </div>

          {/* Navigation Block */}
          <nav className="bg-[#88D498] p-5 space-y-4 font-code text-sm font-bold uppercase tracking-wider neo-border neo-shadow text-black">
            <Link href="/" className="flex items-center gap-3 hover:translate-x-2 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
              Home
            </Link>
            <Link href="/sobre-mim" className="flex items-center gap-3 hover:translate-x-2 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              Sobre Mim
            </Link>
            <Link href="/search" className="flex items-center gap-3 hover:translate-x-2 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              Busca
            </Link>
            <Link href="/categorias" className="flex items-center gap-3 hover:translate-x-2 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Categorias
            </Link>
            <Link href="/tags" className="flex items-center gap-3 hover:translate-x-2 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
              Tags
            </Link>
          </nav>

          {/* Search Block */}
          <div ref={searchRef} className="bg-[#FF6B6B] p-5 neo-border neo-shadow space-y-3 text-black">
            <label className="font-code text-xs font-bold uppercase tracking-widest text-black block mb-2">Buscar post</label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleExecuteSearch();
                  }
                }}
                placeholder="Digite para buscar..."
                className="neo-input w-full pl-3 pr-14 py-2 text-sm"
              />
              <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-1">
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="text-[var(--text-main)] font-bold text-xs hover:scale-110 p-1 cursor-pointer"
                    aria-label="Limpar busca"
                    title="Limpar busca"
                  >
                    ✕
                  </button>
                )}
                <button
                  onClick={() => handleExecuteSearch()}
                  className="text-[var(--text-main)] hover:scale-110 p-1 cursor-pointer"
                  aria-label="Buscar post"
                  title="Buscar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </button>
              </div>

              {/* Floating Dropdown - Directly below input box */}
              {searchQuery.trim() !== "" && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-[var(--bg-surface)] neo-border-thin z-50 p-3 max-h-80 overflow-y-auto space-y-2">
                  <span className="font-code text-xs font-bold uppercase tracking-wider text-[var(--text-muted)] block mb-1">
                    Resultados ({searchResults.length})
                  </span>
                  {searchResults.length > 0 ? (
                    <>
                      {searchResults.slice(0, 4).map((post) => (
                        <Link
                          key={post.id}
                          href={`/blog/${post.slug}`}
                          onClick={() => {
                            setSearchQuery("");
                            setIsOpen(false);
                          }}
                          className="block p-2 bg-[var(--bg-base)] neo-border-thin hover:translate-x-1 transition-transform"
                        >
                          <span
                            className="inline-block px-1.5 py-0.5 text-[10px] font-code font-bold uppercase mb-1 bg-[var(--text-main)] text-[var(--bg-base)]"
                          >
                            {post.category.name}
                          </span>
                          <h4 className="font-heading text-xs font-bold text-[var(--text-main)] line-clamp-2">
                            {post.title}
                          </h4>
                        </Link>
                      ))}

                      {searchResults.length > 4 && (
                        <button
                          onClick={() => handleExecuteSearch()}
                          className="w-full text-center py-2 px-3 bg-[#FFD23F] text-black font-code text-xs font-bold uppercase tracking-wider neo-border-thin hover:bg-[#88D498] transition-colors mt-2 cursor-pointer"
                        >
                          Mostrar mais ({searchResults.length - 4} adicionais) →
                        </button>
                      )}
                    </>
                  ) : (
                    <p className="font-body text-xs text-[var(--text-muted)] p-2">
                      Nenhum post encontrado para &quot;{searchQuery}&quot;.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Categories Block */}
          <div className="bg-[#74B9FF] p-5 text-black neo-border neo-shadow space-y-3">
            <h3 className="font-code text-xs font-bold uppercase tracking-widest text-black block mb-2">Categorias</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/search?category=${cat.slug}`}
                  className="bg-[var(--bg-surface)] text-[var(--text-main)] border-2 border-[var(--stroke-color)] px-2.5 py-1 text-xs font-code font-bold hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform inline-block"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Tags Block (somente se houver tags cadastradas) */}
          {tags && tags.length > 0 && (
            <div className="bg-[#FFA552] p-5 text-black neo-border neo-shadow space-y-3">
              <h3 className="font-code text-xs font-bold uppercase tracking-widest text-black block mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Link
                    key={tag.id}
                    href={`/search?tag=${tag.slug}`}
                    className="bg-[var(--bg-surface)] text-[var(--text-main)] border-2 border-[var(--stroke-color)] px-2.5 py-1 text-xs font-code font-bold hover:translate-x-0.5 hover:-translate-y-0.5 transition-transform inline-block"
                  >
                    {tag.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Contact Block */}
          <a
            href="mailto:hello@example.com"
            className="bg-[#FFD23F] p-4 text-black neo-border neo-shadow flex items-center justify-between group hover:-translate-y-0.5 transition-transform"
          >
            <span className="font-code text-xs font-bold uppercase tracking-widest">Entre em Contato</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" className="group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </a>

          {/* Footer Sidebar (Socials & Theme) */}
          <div className="pt-4 flex flex-col xl:flex-row items-start xl:items-center justify-between border-t-2 border-black neo-border-thin border-l-0 border-r-0 border-b-0 gap-4">
            <div className="flex gap-2">
              <a href="#" className="neo-btn bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] w-10 h-10 p-0 rounded-none flex items-center justify-center transition-colors" title="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="neo-btn bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] w-10 h-10 p-0 rounded-none flex items-center justify-center transition-colors" title="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
              </a>
              <a href="#" className="neo-btn bg-[var(--bg-surface)] text-[var(--text-main)] hover:bg-[var(--text-main)] hover:text-[var(--bg-base)] w-10 h-10 p-0 rounded-none flex items-center justify-center transition-colors" title="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
              </a>
            </div>
            <ThemeToggle />
          </div>

        </div>
      </aside>
    </>
  );
}
