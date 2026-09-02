import Link from "next/link";
import { Post } from "../types/blog";

interface PostCardProps {
  post: Post;
  variant?: "top" | "left" | "right";
}

export function PostCard({ post, variant = "top" }: PostCardProps) {
  // Mobile sempre exibe a variante "top" visualmente (colunas empilhadas)
  // No desktop as variantes horizontais entram em ação
  
  const isHorizontal = variant === "left" || variant === "right";
  
  return (
    <Link href={`/blog/${post.slug}`} className="block no-underline group h-full">
      <article 
        className={`neo-card neo-card-hover h-full flex flex-col ${
          isHorizontal ? "md:flex-row md:min-h-[300px]" : ""
        } ${variant === "right" ? "md:flex-row-reverse" : ""}`}
      >
        <div 
          className={`bg-[var(--color-grid)] border-b-[3px] border-[var(--stroke-color)] relative overflow-hidden ${
            isHorizontal ? "w-full aspect-[16/10] md:aspect-auto md:border-b-0 md:w-[45%] shrink-0" : "w-full aspect-[4/3] sm:aspect-video"
          } ${variant === "left" ? "md:border-r-[3px]" : ""} ${variant === "right" ? "md:border-l-[3px]" : ""}`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${post.imageUrl}), url('https://picsum.photos/seed/${post.id}/800/600')` }} />
        </div>
        
        {/* Conteúdo */}
        <div className={`p-6 md:p-10 flex flex-col flex-1 ${isHorizontal ? "md:justify-center" : ""}`}>
          <div className="flex items-center gap-3 mb-6">
            <span 
              className="font-code text-xs font-bold uppercase tracking-widest px-2 py-1 border-2 border-[var(--stroke-color)] bg-[var(--bg-base)] text-[var(--text-main)]" 
            >
              {post.category.name}
            </span>
            <span className="font-code text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider bg-[var(--bg-base)] px-2 py-1 border-2 border-[var(--stroke-color)]">
              {post.date}
            </span>
          </div>
          
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-4 leading-tight group-hover:underline decoration-4 underline-offset-4">
            {post.title}
          </h3>
          
          <p className="font-body text-[var(--text-main)] text-sm md:text-base mb-8 flex-1 opacity-90">
            {post.excerpt}
          </p>
          
          <div className="mt-auto flex items-center font-code text-xs font-bold uppercase tracking-wider text-[var(--text-main)] pt-6">
            <span className="flex items-center gap-2 group-hover:translate-x-1 transition-transform">
              LER POST 
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
