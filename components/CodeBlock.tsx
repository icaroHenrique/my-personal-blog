"use client"

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Importação dinâmica para quebrar (code split) o javascript colossal do react-syntax-highlighter
const SyntaxHighlighter = dynamic(
  () => import('react-syntax-highlighter').then((mod) => mod.Prism),
  {
    loading: () => <div className="animate-pulse p-4 text-gray-500 font-code flex items-center justify-center">Carregando código...</div>,
  }
)

interface CodeBlockProps {
  language: string
  code: string
  filename?: string
  className?: string
}

export function CodeBlock({ language, code, filename, className = 'my-4' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`neo-border neo-shadow-md bg-[var(--theme-bg-elevation-2)] ${className}`}>
      {/* Header */}
      <div 
        className="flex items-center justify-between px-4 py-2 border-b-[3px] border-black transition-colors"
        style={{ backgroundColor: 'var(--code-header-bg)' }}
      >
        <div className="flex items-center gap-3">
          <span 
            className="font-code text-xs uppercase font-bold px-2 py-1 neo-border-thin"
            style={{ color: 'var(--code-header-text)', borderColor: 'var(--code-header-text)' }}
          >
            {language}
          </span>
          {filename && (
            <span 
              className="font-code text-sm opacity-90 font-bold"
              style={{ color: 'var(--code-header-text)' }}
            >
              {filename}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="neo-btn px-3 py-1 text-xs bg-[var(--code-btn-bg)] text-[var(--code-btn-text)] hover:!bg-[#FFD23F] hover:!text-black active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0_0_#000] transition-colors"
        >
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>
      
      {/* Code Area */}
      <div className="p-4 bg-[#282c34] text-sm font-code overflow-x-auto min-h-[100px]">
        <SyntaxHighlighter
          language={language.toLowerCase()}
          style={oneDark}
          customStyle={{
            margin: 0,
            padding: 0,
            background: 'transparent',
            borderRadius: 0,
          }}
          showLineNumbers={true}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#5c6370',
            textAlign: 'right',
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  )
}
