import type { Metadata } from "next";
import Link from "next/link";
import { getTags, getPosts } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Tags | Ícaro Henrique",
  description: "Explore os tópicos e tags mais discutidos no blog.",
};

export default async function TagsPage() {
  const tags = await getTags();
  const posts = await getPosts();

  const tagsWithCount = tags.map((tag) => {
    const count = posts.filter((post) =>
      post.tags?.some((t) => t.slug === tag.slug || t.name.toLowerCase() === tag.name.toLowerCase())
    ).length;
    return { ...tag, count };
  });

  return (
    <div className="w-full px-4 sm:px-6 md:px-12 py-6 lg:py-12 max-w-5xl mx-auto flex flex-col gap-10">
      {/* Header */}
      <header className="neo-card p-6 sm:p-8 bg-[#FFA552] text-black flex flex-col gap-3">
        <span className="neo-badge bg-black text-white w-fit">Tópicos</span>
        <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight">
          Tags e Assuntos
        </h1>
        <p className="font-body text-base font-medium opacity-90 max-w-2xl">
          Navegue pelas tags e palavras-chave mais citadas. Selecione uma tag para visualizar as publicações correspondentes na página de busca.
        </p>
      </header>

      {/* Tags diretamente no fundo ou caixa de aviso se não houver tags */}
      {tagsWithCount.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {tagsWithCount.map((tag) => (
            <Link
              key={tag.id}
              href={`/search?tag=${tag.slug}`}
              className="neo-btn font-code text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer bg-[var(--bg-surface)] text-[var(--text-main)] hover:-translate-y-1"
            >
              {tag.name}
              <span className="bg-black text-white px-1.5 py-0.5 text-[10px] rounded-none">
                {tag.count}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="neo-card p-8 bg-[var(--bg-surface)] text-center space-y-3">
          <h2 className="font-display text-xl font-bold">Nenhuma tag cadastrada ainda</h2>
          <p className="font-body text-sm text-[var(--text-muted)]">
            As tags serão listadas aqui conforme novos tópicos forem adicionados no CMS. Volte em breve!
          </p>
        </div>
      )}
    </div>
  );
}
