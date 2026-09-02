export interface Category {
  id: string
  name: string
  slug: string
}

export interface Tag {
  id: string
  name: string
  slug: string
}

export interface LexicalNode {
  type: string
  version?: number
  children?: LexicalNode[]
  text?: string
  format?: number
  tag?: string
  listType?: string
  url?: string
  value?: Record<string, unknown>
  fields?: Record<string, unknown>
  [key: string]: unknown
}

export interface Post {
  id: string
  slug: string
  title: string
  excerpt: string
  category: Category
  tags: Tag[]
  date: string
  readTime: string
  imageUrl: string
  featured?: boolean
  content: LexicalNode[]
}

export interface LexicalContent {
  root: {
    type: 'root'
    children: LexicalNode[]
  }
}
