import { LexicalContent } from '@/types/blog'

export const PAYLOAD_API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

export interface PayloadCategory {
  id: string
  name: string
  slug: string
}

export interface PayloadTag {
  id: string
  name: string
  slug: string
}

export interface PayloadPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content?: LexicalContent
  featuredImage?: {
    url: string
    alt: string
  }
  category: PayloadCategory
  tags?: PayloadTag[]
  publishedDate: string
  featured?: boolean
  _status?: 'published' | 'draft'
}

/**
 * Busca todos os posts publicados cadastrados no Payload CMS.
 * Garante que posts em rascunho (draft) não apareçam nas listagens ou buscas públicas.
 */
export async function getPayloadPosts(): Promise<PayloadPost[]> {
  try {
    const res = await fetch(`${PAYLOAD_API_URL}/api/posts?where[_status][not_equals]=draft&depth=2`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Erro ao buscar posts do Payload CMS:', error)
    return []
  }
}

/**
 * Busca um post específico pelo seu slug.
 * Permite passar { draft: true } para buscar rascunhos em modo de Live Preview.
 */
export async function getPayloadPostBySlug(
  slug: string,
  options?: { draft?: boolean }
): Promise<PayloadPost | null> {
  try {
    const draftQuery = options?.draft ? '&draft=true' : ''
    const fetchOptions: RequestInit = options?.draft 
      ? { cache: 'no-store' } 
      : { next: { revalidate: 60 } }
      
    const res = await fetch(`${PAYLOAD_API_URL}/api/posts?where[slug][equals]=${encodeURIComponent(slug)}&depth=2${draftQuery}`, fetchOptions)
    
    if (!res.ok) return null
    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error(`Erro ao buscar post ${slug} do Payload CMS:`, error)
    return null
  }
}

/**
 * Busca todas as categorias cadastradas no Payload CMS
 */
export async function getPayloadCategories(): Promise<PayloadCategory[]> {
  try {
    const res = await fetch(`${PAYLOAD_API_URL}/api/categories`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Erro ao buscar categorias do Payload CMS:', error)
    return []
  }
}

/**
 * Busca todas as tags cadastradas no Payload CMS
 */
export async function getPayloadTags(): Promise<PayloadTag[]> {
  try {
    const res = await fetch(`${PAYLOAD_API_URL}/api/tags`, {
      next: { revalidate: 60 },
    })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Erro ao buscar tags do Payload CMS:', error)
    return []
  }
}
