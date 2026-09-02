import { Post, Category, Tag } from '../types/blog'
import { getPayloadPosts, getPayloadCategories, getPayloadTags, getPayloadPostBySlug, PayloadPost, PayloadCategory, PayloadTag } from './payload-client'

/**
 * Converte um PayloadPost vindo do CMS para a interface Post utilizada nos componentes do site.
 */
export function mapPayloadPostToPost(payloadPost: PayloadPost): Post {
  return {
    id: String(payloadPost?.id || 'preview'),
    slug: payloadPost?.slug || '',
    title: payloadPost?.title || 'Título do Post',
    excerpt: payloadPost?.excerpt || '',
    category: typeof payloadPost?.category === 'object' && payloadPost?.category !== null
      ? {
          id: String(payloadPost.category.id),
          name: payloadPost.category.name,
          slug: payloadPost.category.slug,
        }
      : { id: '1', name: 'Geral', slug: 'geral' },
    tags: Array.isArray(payloadPost?.tags)
      ? payloadPost.tags.map((t: PayloadTag | string) =>
          typeof t === 'object' && t !== null
            ? { id: String(t.id), name: t.name, slug: t.slug }
            : { id: String(t), name: String(t), slug: String(t) }
        )
      : [],
    date: payloadPost?.publishedDate
      ? new Date(payloadPost.publishedDate).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        })
      : 'Hoje',
    readTime: '5 min',
    imageUrl: payloadPost?.featuredImage?.url || '/images/posts/post-1.png',
    featured: Boolean(payloadPost?.featured),
    content: payloadPost?.content?.root?.children
      ? payloadPost.content.root.children
      : [{ type: 'paragraph', version: 1, children: [{ type: 'text', text: payloadPost?.excerpt || '', version: 1 }] }],
  }
}

/**
 * Busca todos os posts publicados cadastrados no Payload CMS
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const payloadPosts = await getPayloadPosts()
    if (payloadPosts && payloadPosts.length > 0) {
      return payloadPosts.map(mapPayloadPostToPost)
    }
  } catch (error) {
    console.warn('Erro ao buscar posts do Payload CMS:', error)
  }
  return []
}

/**
 * Busca os dados brutos de um post específico pelo slug.
 * Permite buscar em modo rascunho com { draft: true }.
 */
export async function getRawPayloadPostBySlug(slug: string, options?: { draft?: boolean }) {
  try {
    return await getPayloadPostBySlug(slug, options)
  } catch {
    return null
  }
}

/**
 * Busca um post especifico pelo slug.
 * Permite buscar em modo rascunho com { draft: true }.
 */
export async function getPostBySlug(slug: string, options?: { draft?: boolean }): Promise<Post | undefined> {
  try {
    const payloadPost = await getPayloadPostBySlug(slug, options)
    if (payloadPost) {
      return mapPayloadPostToPost(payloadPost)
    }
  } catch (error) {
    console.warn(`Erro ao buscar post ${slug} do Payload CMS:`, error)
  }
  return undefined
}

/**
 * Busca todas as categorias cadastradas no Payload CMS
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await getPayloadCategories()
    if (categories && categories.length > 0) {
      return categories.map((cat: PayloadCategory) => ({
        id: String(cat.id),
        name: cat.name,
        slug: cat.slug,
      }))
    }
  } catch (error) {
    console.warn('Erro ao buscar categorias do Payload CMS:', error)
  }
  return []
}

/**
 * Busca todas as tags cadastradas no Payload CMS
 */
export async function getTags(): Promise<Tag[]> {
  try {
    const tags = await getPayloadTags()
    if (tags && tags.length > 0) {
      return tags.map((t: PayloadTag) => ({
        id: String(t.id),
        name: t.name,
        slug: t.slug,
      }))
    }
  } catch (error) {
    console.warn('Erro ao buscar tags do Payload CMS:', error)
  }
  return []
}
