"use client";

import { useEffect, useState } from "react";
import { SobreHero } from "@/components/sobre/SobreHero";
import { SkillGrid } from "@/components/sobre/SkillGrid";
import { ExperienceTimeline } from "@/components/sobre/ExperienceTimeline";
import { EducationBlock } from "@/components/sobre/EducationBlock";
import { sobreData } from "@/data/sobre";
import { CodeBlock } from "@/components/CodeBlock";

export default function DesignSystemPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") as "light" | "dark";
    if (currentTheme) {
      setTheme(currentTheme);
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto space-y-12">
      {/* Header / Intro */}
      <header className="neo-card p-6 md:p-8 bg-[#FFD23F] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <span className="neo-badge bg-black text-white mb-2">Design System</span>
          <h1 className="text-4xl md:text-6xl font-display leading-tight text-black">
            Neubrutalism Base
          </h1>
          <p className="text-lg font-body font-semibold text-black mt-2">
            Guia visual de primitivos, tokens e componentes interativos.
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className="neo-btn bg-[#74B9FF] hover:bg-[#88D498] text-black text-base font-heading"
        >
          {theme === "light" ? "🌙 Ativar Dark Mode" : "☀️ Ativar Light Mode"}
        </button>
      </header>

      {/* 1. Paleta de Cores */}
      <section className="space-y-4">
        <h2 className="text-3xl font-heading neo-border-thin inline-block px-3 py-1 bg-[#B8A9FA] text-black">
          1. Paleta de Cores (Acentos Pop-Art)
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <div className="neo-card p-4 bg-[#FFD23F] text-black font-heading text-center">
            <span className="block text-xs uppercase font-body font-bold">Amarelo</span>
            #FFD23F
          </div>
          <div className="neo-card p-4 bg-[#FF6B6B] text-black font-heading text-center">
            <span className="block text-xs uppercase font-body font-bold">Rosa Coral</span>
            #FF6B6B
          </div>
          <div className="neo-card p-4 bg-[#74B9FF] text-black font-heading text-center">
            <span className="block text-xs uppercase font-body font-bold">Azul Céu</span>
            #74B9FF
          </div>
          <div className="neo-card p-4 bg-[#88D498] text-black font-heading text-center">
            <span className="block text-xs uppercase font-body font-bold">Verde Suave</span>
            #88D498
          </div>
          <div className="neo-card p-4 bg-[#FFA552] text-black font-heading text-center">
            <span className="block text-xs uppercase font-body font-bold">Laranja</span>
            #FFA552
          </div>
          <div className="neo-card p-4 bg-[#B8A9FA] text-black font-heading text-center">
            <span className="block text-xs uppercase font-body font-bold">Lavanda</span>
            #B8A9FA
          </div>
        </div>
      </section>

      {/* 2. Dark Theme (Tema Escuro) */}
      <section className="space-y-4">
        <h2 className="text-3xl font-heading neo-border-thin inline-block px-3 py-1 bg-[#121212] text-[#FFFDF5]">
          2. Dark Theme (Tema Escuro)
        </h2>
        <div className="neo-card p-6 space-y-4">
          <h3 className="text-xl font-heading mb-2">Fundos e Contrastes Brutos</h3>
          <p className="text-base font-body leading-relaxed max-w-3xl">
            O Dark Mode no Neubrutalism deste blog mantém as sombras e bordas <strong>pretas</strong> puras.
            Para garantir que a sombra não desapareça no fundo escuro, utilizamos um <strong>Cinza Grafite (#242424)</strong> como base.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="p-4 border-4 border-black" style={{ backgroundColor: "#242424" }}>
              <span className="text-[#FFFDF5] font-code text-sm block mb-1">Background Base</span>
              <span className="text-[#FFFDF5] font-bold">#242424</span>
            </div>
            <div className="p-4 border-4 border-black shadow-[5px_5px_0_0_#000]" style={{ backgroundColor: "#2d2d2d" }}>
              <span className="text-[#FFFDF5] font-code text-sm block mb-1">Surface (Cards)</span>
              <span className="text-[#FFFDF5] font-bold">#2d2d2d</span>
            </div>
            <div className="p-4 border-4 border-[#050505] bg-[#B8A9FA] text-black shadow-[5px_5px_0_0_#000]">
              <span className="font-code text-sm block mb-1">Acentos Estáticos</span>
              <span className="font-bold">Cores Pop-Art não mudam</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Tipografia */}
      <section className="space-y-6">
        <h2 className="text-3xl font-heading neo-border-thin inline-block px-3 py-1 bg-[#88D498] text-black">
          3. Tipografia
        </h2>
        <div className="neo-card p-6 space-y-6">
          <div>
            <span className="neo-badge bg-[#FF6B6B] text-black mb-2">Display - Archivo Black 400</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display leading-none tracking-tight">
              No ornament. Just weight.
            </h1>
          </div>
          <div>
            <span className="neo-badge bg-[#74B9FF] text-black mb-2">Heading - Space Grotesk 700</span>
            <h2 className="text-2xl sm:text-3xl font-heading">
              H2: Estrutura Aparente e Alto Contraste
            </h2>
          </div>
          <div>
            <span className="neo-badge bg-[#FFD23F] text-black mb-2">Body - Inter 400</span>
            <p className="text-base font-body leading-relaxed max-w-2xl">
              O corpo de texto deve ser calmo e altamente legível para artigos de blog.
              As cores saturadas e os títulos imponentes trazem o impacto, enquanto o parágrafo
              mantém o conforto visual na leitura.
            </p>
          </div>
          <div>
            <span className="neo-badge bg-[#B8A9FA] text-black mb-2">Code - JetBrains Mono</span>
            <pre className="font-code text-sm p-4 neo-border-thin bg-[#121212] text-[#FFFDF5] overflow-x-auto">
              {`const designSystem = {\n  style: "Neubrutalism",\n  border: "3px solid #000",\n  shadow: "5px 5px 0 0 #000"\n};`}
            </pre>
          </div>
        </div>
      </section>

      {/* 4. Tiers de Sombra e Borda */}
      <section className="space-y-6">
        <h2 className="text-3xl font-heading neo-border-thin inline-block px-3 py-1 bg-[#74B9FF] text-black">
          4. Geometria, Bordas e Sombras (Hard Shadows)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-bg-surface neo-border-thin neo-shadow-sm">
            <h3 className="font-heading">Shadow SM</h3>
            <p className="text-xs font-code mt-1">3px 3px 0 0</p>
            <p className="text-xs font-code mt-1">Border Thin (2px)</p>
          </div>
          <div className="p-6 bg-bg-surface neo-border neo-shadow-md">
            <h3 className="font-heading">Shadow MD</h3>
            <p className="text-xs font-code mt-1">5px 5px 0 0</p>
            <p className="text-xs font-code mt-1">Border Default (3px)</p>
          </div>
          <div className="p-6 bg-bg-surface neo-border neo-shadow-lg">
            <h3 className="font-heading">Shadow LG</h3>
            <p className="text-xs font-code mt-1">8px 8px 0 0</p>
            <p className="text-xs font-code mt-1">Border Default (3px)</p>
          </div>
          <div className="p-6 bg-bg-surface neo-border-thick neo-shadow-xl">
            <h3 className="font-heading">Shadow XL</h3>
            <p className="text-xs font-code mt-1">12px 12px 0 0</p>
            <p className="text-xs font-code mt-1">Border Thick (4px)</p>
          </div>
        </div>
      </section>

      {/* 5. Componentes Interativos */}
      <section className="space-y-6">
        <h2 className="text-3xl font-heading neo-border-thin inline-block px-3 py-1 bg-[#FFA552] text-black">
          5. Componentes Base e Micro-Interações
        </h2>

        {/* Botões */}
        <div className="neo-card p-6 space-y-4">
          <h3 className="text-xl font-heading">Botões (Efeito Press)</h3>
          <div className="flex flex-wrap gap-4">
            <button className="neo-btn bg-[#FFD23F] text-black">Primário (Amarelo)</button>
            <button className="neo-btn bg-[#FF6B6B] text-black">Secundário (Rosa)</button>
            <button className="neo-btn bg-[#74B9FF] text-black">Ação (Azul)</button>
            <button className="neo-btn bg-[#88D498] text-black">Sucesso (Verde)</button>
          </div>
        </div>

        {/* Cards (Hover Lift) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="neo-card neo-card-hover p-6">
            <span className="neo-badge bg-[#FFD23F] mb-3">Card Hover Lift</span>
            <h3 className="text-xl font-heading mb-2">Passe o mouse aqui</h3>
            <p className="text-sm font-body">
              Este card se desloca para cima (-2px, -2px) e aumenta a sombra ao receber hover.
            </p>
          </div>
          <div className="neo-card p-6 bg-[#FF6B6B] text-black">
            <span className="neo-badge bg-black text-white mb-3">Colored Card</span>
            <h3 className="text-xl font-heading mb-2">Card com Fundo de Acento</h3>
            <p className="text-sm font-body font-semibold">
              Preenchimento sólido vibrante com texto preto de alto contraste.
            </p>
          </div>
          <div className="neo-card p-6 bg-[#B8A9FA] text-black">
            <span className="neo-badge bg-black text-white mb-3">Badge e Tag</span>
            <h3 className="text-xl font-heading mb-2">Exemplo de Artigo</h3>
            <p className="text-sm font-body">
              Combinação de etiquetas com texto estruturado em neubrutalism.
            </p>
          </div>
        </div>

        {/* Formulários e Inputs */}
        <div className="neo-card p-6 space-y-4">
          <h3 className="text-xl font-heading">Inputs de Texto (Focus State)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            <div>
              <label className="block text-sm font-heading mb-1">Nome de usuário</label>
              <input
                type="text"
                placeholder="Digite seu nome..."
                className="neo-input w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-heading mb-1">E-mail para Newsletter</label>
              <input
                type="email"
                placeholder="seu.email@exemplo.com"
                className="neo-input w-full"
              />
            </div>
          </div>
        </div>

        {/* 6. Componentes Estruturais (Layout) */}
        <h2 className="text-3xl font-heading neo-border-thin inline-block px-3 py-1 bg-[#88D498] text-black">
          6. Componentes de Layout
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="neo-card p-6">
            <h3 className="text-xl font-heading mb-4 border-b-2 border-[var(--stroke-color)] pb-2">Listagem e Paginação de Posts (HomePostList)</h3>
            <p className="text-sm font-body mb-4 opacity-80">
              O componente <code>HomePostList</code> exibe o limite de 4 posts por página e apresenta uma barra de paginação numerada neobrutalista (com botões de navegação para a próxima página e páginas numéricas). Ao navegar, a página rola suavemente para o topo do bloco e o rodapé permanece acessível.
            </p>
          </div>

          <div className="neo-card p-6">
            <h3 className="text-xl font-heading mb-4 border-b-2 border-[var(--stroke-color)] pb-2">Central de Busca e Filtros (/search)</h3>
            <p className="text-sm font-body mb-4 opacity-80">
              Toda a lógica de busca e filtragem por palavras-chave, <strong>Categorias</strong> e <strong>Tags</strong> está centralizada na página <code>/search</code>, agora com suporte total a **paginação de resultados** (4 posts por página) e redefinição automática para a página 1 ao alterar filtros.
            </p>
          </div>
        </div>

        {/* 7. Componentes da Página Sobre Mim / Currículo */}
        <h2 className="text-3xl font-heading neo-border-thin inline-block px-3 py-1 bg-[#B8A9FA] text-black">
          7. Componentes da Página Sobre Mim (Currículo)
        </h2>

        <div className="space-y-8">
          <div className="neo-card p-6 space-y-4">
            <h3 className="text-xl font-heading border-b-2 border-[var(--stroke-color)] pb-2">SobreHero</h3>
            <SobreHero resume={sobreData} />
          </div>

          <div className="neo-card p-6 space-y-4">
            <h3 className="text-xl font-heading border-b-2 border-[var(--stroke-color)] pb-2">SkillGrid</h3>
            <SkillGrid title={sobreData.sectionTitles.skills} categories={sobreData.skillCategories} />
          </div>

          <div className="neo-card p-6 space-y-4">
            <h3 className="text-xl font-heading border-b-2 border-[var(--stroke-color)] pb-2">EducationBlock</h3>
            <EducationBlock title={sobreData.sectionTitles.education} education={sobreData.education} />
          </div>

          <div className="neo-card p-6 space-y-4">
            <h3 className="text-xl font-heading border-b-2 border-[var(--stroke-color)] pb-2">ExperienceTimeline</h3>
            <ExperienceTimeline title={sobreData.sectionTitles.experience} labels={sobreData.labels} experiences={sobreData.experiences} />
          </div>
        </div>

        {/* 8. Bloco de Código (Syntax Highlighting) */}
        <h2 className="text-3xl font-heading neo-border-thin inline-block px-3 py-1 bg-[#FFD23F] text-black">
          8. Bloco de Código (Syntax Highlighting)
        </h2>
        
        <div className="space-y-6">
          <div className="neo-card p-6">
            <h3 className="text-xl font-heading mb-4">Código com Nome de Arquivo (TypeScript)</h3>
            <CodeBlock 
              language="typescript" 
              filename="designSystem.ts"
              code={`export const designSystem = {
  theme: "Neubrutalism",
  colors: {
    primary: "#FFD23F",
    secondary: "#FF6B6B",
    background: "#FFFDF5",
    darkBackground: "#242424"
  },
  borders: {
    thin: "2px solid #000",
    default: "3px solid #000"
  },
  shadows: {
    md: "5px 5px 0 0 #000"
  }
};

// Exemplo de função utilitária
function applyTheme(element: HTMLElement, themeConfig: typeof designSystem) {
  element.style.border = themeConfig.borders.default;
  element.style.boxShadow = themeConfig.shadows.md;
}`} 
            />
          </div>

          <div className="neo-card p-6">
            <h3 className="text-xl font-heading mb-4">Código Simples (CSS)</h3>
            <CodeBlock 
              language="css" 
              code={`.neo-card {
  background-color: var(--bg-surface);
  border: 3px solid var(--stroke-color);
  box-shadow: 5px 5px 0 0 var(--shadow-color);
  border-radius: 0;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.neo-card:hover {
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 0 var(--shadow-color);
}`} 
            />
          </div>

          <div className="neo-card p-6">
            <h3 className="text-xl font-heading mb-2">Espaçamento Compacto no Fluxo de Texto (com className="my-1")</h3>
            <p className="text-sm opacity-80 mb-2 font-body">Exemplo integrado com texto anterior imediato, reduzindo a distância vertical entre o parágrafo explicativo e o código.</p>
            <CodeBlock 
              language="json"
              filename="config.json"
              className="my-1"
              code={`{\n  "compact": true,\n  "margin": "my-1"\n}`}
            />
          </div>
        </div>

        {/* 9. Indicadores de Live Preview e Rascunho (Payload CMS) */}
        <h2 className="text-3xl font-heading neo-border-thin inline-block px-3 py-1 bg-[#FFD23F] text-black">
          9. Indicadores de Live Preview e Rascunhos (Payload CMS)
        </h2>

        <div className="neo-card p-6 space-y-4">
          <h3 className="text-xl font-heading">Badges de Sincronia e Status de Publicação</h3>
          <p className="font-body text-sm opacity-90">
            Exibidos no topo do artigo quando o iframe do blog detecta mensagens ativas via <code>window.postMessage</code> ou quando o artigo está no estágio de rascunho (não publicado no feed público):
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#4ADE80] text-black font-code text-xs font-bold neo-border shadow-[2px_2px_0_0_#000]">
              <span className="w-2 h-2 rounded-full bg-black inline-block animate-ping" />
              MODO LIVE PREVIEW ATIVO
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FF6B6B] text-white font-code text-xs font-bold neo-border shadow-[2px_2px_0_0_#000]">
              RASCUNHO (NÃO PUBLICADO)
            </div>
          </div>
        </div>

        {/* 10. Caixa de Estado Vazio (Sem Artigos) */}
        <h2 className="text-3xl font-heading neo-border-thin inline-block px-3 py-1 bg-[#FFD23F] text-black">
          10. Caixa de Estado Vazio (Sem Artigos)
        </h2>

        <div className="w-full neo-card p-8 bg-[var(--bg-surface)] text-center flex flex-col items-center gap-4">
          <span className="neo-badge bg-[#FFD23F] text-black">
            Blog e Publicações
          </span>
          <div className="space-y-2 max-w-lg">
            <h3 className="font-display text-2xl font-bold">
              Nenhum artigo publicado ainda
            </h3>
            <p className="font-body text-sm text-[var(--text-muted)] leading-relaxed">
              Volte em breve.
            </p>
          </div>
        </div>

        {/* Footer Demo */}
        <footer className="py-6 px-4 text-center font-code text-xs md:text-sm text-[var(--text-muted)] space-y-1 mt-8">
          <p>
            Criado por Ícaro Henrique | Conceito -{" "}
            <a
              href="https://neubrutalism.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold"
            >
              Neubrutalism
            </a>
          </p>
          <p>&copy; 2026 | CC BY-NC 4.0</p>
        </footer>
      </section>
    </div>
  );
}
