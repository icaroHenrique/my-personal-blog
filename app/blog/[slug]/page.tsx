import { notFound } from "next/navigation";
import { getPostBySlug, getRawPayloadPostBySlug } from "../../../lib/cms";
import { BlogPost } from "@/components/BlogPost";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ preview?: string }>
}

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
  const { slug } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const isPreview = resolvedSearchParams?.preview === 'true';

  const post = await getPostBySlug(slug, { draft: isPreview });
  const rawPost = await getRawPayloadPostBySlug(slug, { draft: isPreview });

  if (!post) {
    if (isPreview) {
      const draftFallbackPost = {
        id: 'draft-preview',
        slug,
        title: 'Novo Rascunho',
        excerpt: 'Digite o conteúdo no painel administrativo do Payload CMS para visualizar em tempo real...',
        category: { id: '1', name: 'Rascunho', slug: 'rascunho' },
        tags: [],
        date: 'Rascunho',
        readTime: '1 min',
        imageUrl: '/images/posts/post-1.png',
        featured: false,
        content: [],
      };
      return <BlogPost initialPost={draftFallbackPost} initialRawData={{ id: 'draft-preview', title: 'Novo Rascunho', slug, excerpt: '', category: { id: '1', name: 'Rascunho', slug: 'rascunho' }, publishedDate: '', _status: 'draft' }} />;
    }
    notFound();
  }

  return <BlogPost initialPost={post} initialRawData={rawPost} />;
}
