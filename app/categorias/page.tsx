import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Categorias | Ícaro Henrique",
  description: "Navegue pelos artigos do blog organizados por categoria.",
};

export default async function CategoriesPage() {
  const categories = await getCategories();
  const posts = await getPosts();

  const categoriesWithCount = categories.map((category) => {
    const count = posts.filter((p) => p.category.id === category.id).length;
    return { ...category, count };
  });

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-6 lg:py-12 max-w-5xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <header className="neo-card p-6 sm:p-8 bg-[#88D498] text-black flex flex-col gap-3">
        <span className="neo-badge bg-black text-white w-fit">Explorar</span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
          Categorias
        </h1>
        <p className="font-body text-base font-medium opacity-90 max-w-2xl">
          Encontre os artigos organizados por assunto. Selecione uma categoria para visualizar suas publicações na página de busca.
        </p>
      </header>

      {/* Categorias diretamente no fundo ou caixa de aviso se não houver categorias */}
      {categoriesWithCount.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {categoriesWithCount.map((category) => (
            <Link
              key={category.id}
              href={`/search?category=${category.slug}`}
              className="neo-btn font-code text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer bg-[var(--bg-surface)] text-[var(--text-main)] hover:-translate-y-1"
            >
              {category.name}
              <span className="bg-black text-white px-1.5 py-0.5 text-[10px] rounded-none">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="neo-card p-8 bg-[var(--bg-surface)] text-center space-y-3">
          <h2 className="font-display text-xl font-bold">Nenhuma categoria cadastrada ainda</h2>
          <p className="font-body text-sm text-[var(--text-muted)]">
            As categorias serão exibidas aqui assim que forem cadastradas no CMS. Volte em breve!
          </p>
        </div>
      )}
    </div>
  );
}
