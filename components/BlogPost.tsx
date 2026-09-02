"use client"

import { useEffect, useState } from 'react'
import { Post, LexicalNode } from '@/types/blog'
import { mapPayloadPostToPost } from '@/lib/cms'
import { PayloadPost } from '@/lib/payload-client'
import { CodeBlock } from '@/components/CodeBlock'

interface BlogPostProps {
  initialPost: Post
  initialRawData?: PayloadPost | null
}

function formatText(text: string, format?: number) {
  if (!format) return text
  let el: React.ReactNode = text
  if (format & 1) el = <strong>{el}</strong>
  if (format & 2) el = <em>{el}</em>
  if (format & 4) el = <span className="line-through">{el}</span>
  if (format & 8) el = <span className="underline">{el}</span>
  if (format & 16) el = <code className="bg-[var(--color-grid)] px-1 rounded">{el}</code>
  return el
}

function RichTextNode({ node }: { node: LexicalNode }): React.ReactNode {
  switch (node.type) {
    case 'text':
      return <>{formatText(node.text || '', node.format)}</>
      
    case 'linebreak':
      return <br />
      
    case 'link':
    case 'autolink':
      return (
        <a 
          href={(node.fields?.url as string) || (node.url as string) || '#'} 
          className="text-blue-600 underline font-bold hover:text-black hover:bg-[#FFD23F] transition-colors"
          target={node.fields?.newTab ? '_blank' : undefined}
          rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
        >
          {node.children?.map((c: LexicalNode, i: number) => <RichTextNode key={i} node={c} />)}
        </a>
      )
      
    case 'heading': {
      const tag = node.tag || 'h2'
      if (tag === 'h1' || tag === 'h2') {
        return <h2 className="font-display text-3xl md:text-4xl mt-8 mb-2">{node.children?.map((c: LexicalNode, i: number) => <RichTextNode key={i} node={c} />)}</h2>
      }
      if (tag === 'h3') {
        return <h3 className="font-display text-2xl md:text-3xl mt-6 mb-2">{node.children?.map((c: LexicalNode, i: number) => <RichTextNode key={i} node={c} />)}</h3>
      }
      return <h4 className="font-display text-xl md:text-2xl mt-4 mb-2">{node.children?.map((c: LexicalNode, i: number) => <RichTextNode key={i} node={c} />)}</h4>
    }
    
    case 'quote':
      return (
        <blockquote className="neo-border p-4 sm:p-6 bg-[#FFD23F] my-4 text-black neo-shadow">
          <p className="font-heading text-xl md:text-2xl italic">
            {node.children?.map((c: LexicalNode, i: number) => <RichTextNode key={i} node={c} />)}
          </p>
        </blockquote>
      )
      
    case 'list': {
      const ListTag = node.listType === 'number' || node.tag === 'ol' ? 'ol' : 'ul'
      const className = ListTag === 'ol' ? 'list-decimal list-inside my-4 pl-4 space-y-2 font-body text-base md:text-lg' : 'list-disc list-inside my-4 pl-4 space-y-2 font-body text-base md:text-lg'
      return <ListTag className={className}>{node.children?.map((c: LexicalNode, i: number) => <RichTextNode key={i} node={c} />)}</ListTag>
    }
    
    case 'listitem':
      return <li className="opacity-90">{node.children?.map((c: LexicalNode, i: number) => <RichTextNode key={i} node={c} />)}</li>
      
    case 'upload':
    case 'image': {
      const url = node.value?.url || node.fields?.url || node.url
      if (!url) return null
      return (
        <div className="neo-border w-full aspect-video my-8 bg-[var(--color-grid)] relative overflow-hidden neo-shadow">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${url})` }} />
        </div>
      )
    }
    
    case 'block':
      if (node.fields?.blockType === 'code') {
        return (
          <CodeBlock
            language={(node.fields.language as string) || 'text'}
            code={(node.fields.code as string) || ''}
            filename={node.fields.filename as string | undefined}
            className="my-1"
          />
        )
      }
      return null
      
    case 'paragraph':
    default:
      if (!node.children || node.children.length === 0) {
         if (node.type === 'paragraph') return <br />
         return null
      }
      return (
        <p className="font-body text-base md:text-lg leading-relaxed opacity-90">
          {node.children?.map((c: LexicalNode, i: number) => <RichTextNode key={i} node={c} />)}
        </p>
      )
  }
}

function RichTextRenderer({ content }: { content: LexicalNode[] }) {
  return (
    <div className="flex flex-col gap-6">
      {content.map((node, i) => <RichTextNode key={i} node={node} />)}
    </div>
  )
}

export function BlogPost({ initialPost, initialRawData }: BlogPostProps) {
  const [post, setPost] = useState<Post>(initialPost)
  const [isLivePreviewActive, setIsLivePreviewActive] = useState(false)
  const [isDraft, setIsDraft] = useState(Boolean(initialRawData?._status === 'draft'))

  useEffect(() => {
    const CMS_ORIGIN = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

    // Comunica com o Payload CMS Live Preview
    // O painel do CMS envia mensagens window.postMessage quando o documento é editado
    const handleMessage = (event: MessageEvent) => {
      // Validate origin
      if (event.origin !== new URL(CMS_ORIGIN).origin) return

      try {
        const payloadData = typeof event.data === 'string' ? JSON.parse(event.data) : event.data

        if (payloadData && (payloadData.type === 'payload-live-preview' || payloadData.data || payloadData.title)) {
          const docData = payloadData.data || payloadData
          if (docData && typeof docData === 'object') {
            const mapped = mapPayloadPostToPost(docData)
            setPost(mapped)
            setIsLivePreviewActive(true)
            if (docData._status) {
              setIsDraft(docData._status === 'draft')
            }
          }
        }
      } catch (err) {
        // Ignora mensagens de outras extensões/origens
      }
    }

    window.addEventListener('message', handleMessage)

    // Handshake exigido pelo Payload CMS LivePreviewProvider:
    // O Payload aguarda { type: 'payload-live-preview', ready: true } para setar appIsReady = true
    const notifyReady = () => {
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({ type: 'payload-live-preview', ready: true }, CMS_ORIGIN)
      }
    }

    notifyReady()
    // Dispara novamente após 500ms para o caso do listener da janela mãe ter sido anexado logo após o load
    const timer = setTimeout(notifyReady, 500)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  const hasIndicators = isLivePreviewActive || isDraft

  return (
    <div className="w-full px-0 sm:px-6 md:px-12 py-6 lg:py-12 max-w-5xl mx-auto flex flex-col">
      {/* Post Block (Image + Header + Content) */}
      <article className="bg-[var(--bg-surface)] border-y-[3px] sm:border-[3px] border-[var(--stroke-color)] shadow-none sm:shadow-[5px_5px_0_0_var(--shadow-color)] flex flex-col overflow-hidden transition-shadow relative">
        {/* Live Preview / Draft Indicators Flutuantes (Overlay sobre a imagem de destaque) */}
        {hasIndicators && (
          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex flex-wrap items-center gap-2">
            {isLivePreviewActive && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4ADE80] text-black font-code text-xs font-bold neo-border shadow-[2px_2px_0_0_#000]">
                <span className="w-2 h-2 rounded-full bg-black inline-block animate-ping" />
                MODO LIVE PREVIEW ATIVO
              </div>
            )}
            {isDraft && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B6B] text-white font-code text-xs font-bold neo-border shadow-[2px_2px_0_0_#000]">
                RASCUNHO (NÃO PUBLICADO)
              </div>
            )}
          </div>
        )}

        {/* Featured Image at the top */}
        <div className="w-full aspect-[4/3] sm:aspect-video md:aspect-[21/9] bg-[var(--color-grid)] relative border-b-[3px] border-[var(--stroke-color)]">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${post.imageUrl}), url('https://picsum.photos/seed/${post.id}/1200/600')`,
            }}
          />
        </div>

        {/* Post Body (Header + Content) */}
        <div className="p-4 sm:p-6 md:p-10 lg:p-12 flex flex-col">
          {/* Header Info */}
          <header className="mb-4 lg:mb-6">
            <div className="flex items-center flex-wrap gap-3 mb-6">
              <span className="neo-badge bg-[var(--text-main)] text-[var(--bg-base)]">
                {post.category.name}
              </span>
              <span className="font-code text-xs text-[var(--text-muted)] font-bold uppercase tracking-wider bg-[var(--bg-base)] px-2 py-1 neo-border-thin">
                {post.date}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="font-heading text-lg sm:text-xl md:text-2xl opacity-90 mt-6 border-l-4 border-[#FFD23F] pl-4">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Main Content */}
          <div>
            {post.content && post.content.length > 0 ? (
              <RichTextRenderer content={post.content} />
            ) : (
              <p className="font-code">Conteúdo não disponível.</p>
            )}
          </div>
        </div>
      </article>
    </div>
  )
}
