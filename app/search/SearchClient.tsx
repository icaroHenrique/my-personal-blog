"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import type { Post, Category, Tag } from "@/types/blog";
import { PostCard } from "@/components/PostCard";

export function SearchClient({ posts = [], categories = [], tags = [] }: { posts?: Post[], categories?: Category[], tags?: Tag[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const queryParam = searchParams.get("q") || "";
  const categoryParam = searchParams.get("category") || "";
  const tagParam = searchParams.get("tag") || "";
  const selectedTags = tagParam ? tagParam.split(",").filter(Boolean) : [];

  const [query, setQuery] = useState(queryParam);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const pageSize = 4;

  // Sincroniza o estado do input quando a URL muda (ex: cliques na Sidebar)
  useEffect(() => {
    setQuery(queryParam);
  }, [queryParam]);

  // Reseta para a primeira página sempre que os parâmetros de pesquisa mudarem
  useEffect(() => {
    setCurrentPage(1);
  }, [queryParam, categoryParam, tagParam]);

  const updateURL = (newQ: string, newCat: string, newTags: string[]) => {
    const params = new URLSearchParams();
    if (newQ.trim()) params.set("q", newQ.trim());
    if (newCat) params.set("category", newCat);
    if (newTags.length > 0) params.set("tag", newTags.join(","));

    const queryString = params.toString();
    router.push(queryString ? `/search?${queryString}` : "/search", { scroll: false });
  };

  const handleQueryChange = (val: string) => {
    setQuery(val);
    updateURL(val, categoryParam, selectedTags);
  };

  const handleCategoryToggle = (catSlug: string) => {
    const nextCat = categoryParam === catSlug ? "" : catSlug;
    updateURL(query, nextCat, selectedTags);
  };

  const handleTagToggle = (tagSlug: string) => {
    const isSelected = selectedTags.includes(tagSlug);
    const nextTags = isSelected
      ? selectedTags.filter((t) => t !== tagSlug)
      : [...selectedTags, tagSlug];
    updateURL(query, categoryParam, nextTags);
  };

  const clearAll = () => {
    setQuery("");
    router.push("/search", { scroll: false });
  };

  // Filtragem dos posts
  const filteredPosts = posts.filter((post) => {
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const matchTitle = post.title.toLowerCase().includes(q);
      const matchExcerpt = post.excerpt.toLowerCase().includes(q);
      const matchCat = post.category.name.toLowerCase().includes(q);
      const matchTag = post.tags?.some((t) => t.name.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchCat && !matchTag) return false;
    }

    if (categoryParam) {
      const matchCat =
        post.category.slug === categoryParam ||
        post.category.name.toLowerCase() === categoryParam.toLowerCase();
      if (!matchCat) return false;
    }

    if (selectedTags.length > 0) {
      const matchAllTags = selectedTags.every((slug) =>
        post.tags?.some(
          (t) => t.slug === slug || t.name.toLowerCase() === slug.toLowerCase()
        )
      );
      if (!matchAllTags) return false;
    }

    return true;
  });

  // Lógica de Paginação
  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + pageSize);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);

    setTimeout(() => {
      const mainEl = document.querySelector("main");
      if (mainEl) {
        mainEl.scrollTo({ top: 0, behavior: "smooth" });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  const activeCategory = categories.find((c) => c.slug === categoryParam);
  const hasActiveFilters = Boolean(query.trim() || categoryParam || selectedTags.length > 0);

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-6 lg:py-12 max-w-5xl mx-auto flex flex-col gap-8">
      {/* Header */}
      <header className="neo-card p-6 sm:p-8 bg-[#FF6B6B] text-black flex flex-col gap-3">
        <span className="neo-badge bg-black text-white w-fit">Pesquisa e Filtros</span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
          Buscar Artigos
        </h1>
        <p className="font-body text-base font-medium opacity-90 max-w-2xl">
          Pesquise por palavras-chave ou filtre o conteúdo por categorias e tags.
        </p>
      </header>

      {/* Barra de Pesquisa e Filtros */}
      <div className="neo-card p-6 bg-[var(--bg-surface)] space-y-6">
        {/* Input de Busca */}
        <div className="space-y-2">
          <label className="font-code text-xs font-bold uppercase tracking-widest text-[var(--text-main)] block">
            Pesquisar por texto
          </label>
          <div className="relative">
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Digite um título, assunto, tag ou categoria..."
              className="neo-input w-full pl-4 pr-12 py-3 text-base"
            />
            {query && (
              <button
                onClick={() => handleQueryChange("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-main)] font-bold text-sm hover:scale-110 p-1 cursor-pointer"
                title="Limpar busca"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filtro de Categorias */}
        <div className="space-y-2">
          <label className="font-code text-xs font-bold uppercase tracking-widest text-[var(--text-main)] block">
            Categorias
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isSelected = categoryParam === cat.slug;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryToggle(cat.slug)}
                  className={`neo-btn text-xs font-code font-bold uppercase tracking-wider py-1.5 px-3 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#74B9FF] text-black shadow-none translate-x-[2px] translate-y-[2px]"
                      : "bg-[var(--bg-base)] text-[var(--text-main)] hover:-translate-y-0.5"
                  }`}
                >
                  {isSelected ? `✓ ${cat.name}` : cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtro de Tags (somente se houver tags cadastradas) */}
        {tags && tags.length > 0 && (
          <div className="space-y-2">
            <label className="font-code text-xs font-bold uppercase tracking-widest text-[var(--text-main)] block">
              Tags (Múltipla seleção)
            </label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => {
                const isSelected = selectedTags.includes(tag.slug);
                return (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.slug)}
                    className={`neo-btn text-xs font-code font-bold uppercase tracking-wider py-1.5 px-3 transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#FFA552] text-black shadow-none translate-x-[2px] translate-y-[2px]"
                        : "bg-[var(--bg-base)] text-[var(--text-main)] hover:-translate-y-0.5"
                    }`}
                  >
                    {isSelected ? `✓ ${tag.name}` : tag.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Resumo de Filtros Ativos e Limpar */}
        {hasActiveFilters && (
          <div className="pt-4 border-t-2 border-[var(--stroke-color)] flex flex-wrap justify-between items-center gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs font-code font-bold text-[var(--text-main)]">
              <span>Filtros ativos:</span>
              {query && (
                <span className="bg-[#FF6B6B] text-black px-2 py-1 neo-border-thin flex items-center gap-1">
                  Busca: &quot;{query}&quot;
                  <button
                    onClick={() => handleQueryChange("")}
                    className="hover:scale-110 font-bold ml-1 cursor-pointer"
                    title="Remover termo de busca"
                  >
                    ✕
                  </button>
                </span>
              )}
              {activeCategory && (
                <span className="bg-[#74B9FF] text-black px-2 py-1 neo-border-thin flex items-center gap-1">
                  Categoria: {activeCategory.name}
                  <button
                    onClick={() => handleCategoryToggle(activeCategory.slug)}
                    className="hover:scale-110 font-bold ml-1 cursor-pointer"
                    title="Remover categoria"
                  >
                    ✕
                  </button>
                </span>
              )}
              {selectedTags.map((tagSlug) => {
                const tagObj = tags.find((t) => t.slug === tagSlug);
                const tagName = tagObj ? tagObj.name : tagSlug;
                return (
                  <span key={tagSlug} className="bg-[#FFA552] text-black px-2 py-1 neo-border-thin flex items-center gap-1">
                    Tag: {tagName}
                    <button
                      onClick={() => handleTagToggle(tagSlug)}
                      className="hover:scale-110 font-bold ml-1 cursor-pointer"
                      title="Remover tag"
                    >
                      ✕
                    </button>
                  </span>
                );
              })}
            </div>

            <button
              onClick={clearAll}
              className="neo-btn bg-[var(--text-main)] text-[var(--bg-base)] hover:opacity-90 text-xs font-code font-bold uppercase tracking-wider py-1.5 px-3 cursor-pointer"
            >
              Limpar Todos os Filtros ✕
            </button>
          </div>
        )}
      </div>

      {/* Resultados de Pesquisa */}
      <section ref={resultsRef} className="space-y-6">
        <div className="flex justify-between items-center border-b-4 border-black pb-2">
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide">
            {hasActiveFilters ? "Resultados da Pesquisa" : "Todos os Artigos"}
          </h2>
          <span className="font-code text-xs font-bold bg-black text-white px-2 py-1">
            {filteredPosts.length} {filteredPosts.length === 1 ? "artigo" : "artigos"}
          </span>
        </div>

        {currentPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="neo-card p-8 bg-[var(--bg-surface)] text-center space-y-4">
            <h3 className="font-display text-xl font-bold">Nenhum artigo encontrado</h3>
            <p className="font-body text-sm text-[var(--text-muted)]">
              Tente alterar os termos da busca ou desmarcar alguns dos filtros selecionados.
            </p>
            <button
              onClick={clearAll}
              className="neo-btn bg-[#FFD23F] text-black text-xs font-code font-bold uppercase cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}

        {/* Controles de Paginação Neobrutalistas */}
        {totalPages > 1 && (
          <div className="neo-card p-4 sm:p-6 bg-[var(--bg-surface)] flex flex-col sm:flex-row items-center justify-between gap-4 font-code text-xs sm:text-sm font-bold uppercase tracking-wider mt-8">
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
    </div>
  );
}
