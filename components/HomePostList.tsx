"use client";

import { useState, useRef } from "react";
import { Post } from "@/types/blog";
import { PostCard } from "@/components/PostCard";

interface HomePostListProps {
  posts: Post[];
  pageSize?: number;
}

export function HomePostList({
  posts,
  pageSize = 4,
}: HomePostListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const totalPages = Math.ceil(posts.length / pageSize);

  const getVariant = (index: number) => {
    const variants: ("left" | "right")[] = ["left", "right"];
    return variants[index % variants.length];
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentPosts = posts.slice(startIndex, startIndex + pageSize);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    setTimeout(() => {
      // 1. Rolar o elemento <main> (usado no layout mobile onde o scroll é interno)
      const mainEl = document.querySelector("main");
      if (mainEl) {
        mainEl.scrollTo({ top: 0, behavior: "smooth" });
      }

      // 2. Rolar a window (usada no layout desktop)
      window.scrollTo({ top: 0, behavior: "smooth" });

      // 3. Rolar até o topo do container de posts como garantia
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  if (posts.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto neo-card p-8 sm:p-12 bg-[var(--bg-surface)] text-center flex flex-col items-center gap-4 my-6">
        <span className="neo-badge bg-[#FFD23F] text-black">
          Blog e Publicações
        </span>
        <div className="space-y-2 max-w-lg">
          <h2 className="font-display text-2xl sm:text-4xl font-bold">
            Nenhum artigo publicado ainda
          </h2>
          <p className="font-body text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
            Volte em breve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section ref={containerRef} className="space-y-10">
      {/* Lista dos posts da página atual */}
      <div className="flex flex-col gap-6 md:gap-10">
        {currentPosts.map((post, index) => {
          const variant = getVariant(index);
          return (
            <div key={post.id} className="w-full">
              <PostCard post={post} variant={variant} />
            </div>
          );
        })}
      </div>

      {/* Controles de Paginação Neobrutalistas */}
      {totalPages > 1 && (
        <div className="neo-card p-4 sm:p-6 bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-4 font-code text-xs sm:text-sm font-bold uppercase tracking-wider">
          {/* Números das Páginas */}
          <div className="flex items-center justify-center gap-2 flex-wrap w-full sm:w-auto">
            <span className="text-[var(--text-muted)] mr-1 hidden md:inline">Página:</span>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => goToPage(pageNum)}
                className={`neo-btn w-9 h-9 p-0 flex items-center justify-center transition-all ${
                  currentPage === pageNum
                    ? "bg-[#FFD23F] text-black shadow-none translate-x-[2px] translate-y-[2px]"
                    : "bg-[var(--bg-base)] text-[var(--text-main)] cursor-pointer hover:-translate-y-0.5"
                }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          {/* Botões de Navegação Anterior / Próxima */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`neo-btn py-2 px-3 sm:px-4 transition-all flex-1 sm:flex-none text-center ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed bg-[var(--bg-base)] text-[var(--text-muted)] border-gray-400 shadow-none"
                  : "bg-[#FFD23F] text-black cursor-pointer hover:-translate-y-0.5"
              }`}
            >
              ← Anterior
            </button>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`neo-btn py-2 px-3 sm:px-4 transition-all flex-1 sm:flex-none text-center ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed bg-[var(--bg-base)] text-[var(--text-muted)] border-gray-400 shadow-none"
                  : "bg-[#FFD23F] text-black cursor-pointer hover:-translate-y-0.5"
              }`}
            >
              Próxima Página →
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
