import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchClient } from "./SearchClient";
import { getPosts, getCategories, getTags } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Buscar e Filtros | Ícaro Henrique",
  description: "Pesquise por artigos, navegue pelas categorias e explore tags.",
};

export default async function SearchPage() {
  const posts = await getPosts();
  const categories = await getCategories();
  const tags = await getTags();

  return (
    <Suspense fallback={<div className="p-8 font-code text-center">Carregando busca...</div>}>
      <SearchClient posts={posts} categories={categories} tags={tags} />
    </Suspense>
  );
}
