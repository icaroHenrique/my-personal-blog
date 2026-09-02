# Design System - Blog Pessoal (Neubrutalism)

Este documento define o sistema de design base do blog, focado no estilo **Neubrutalism**. A estética rejeita o polimento invisível (como sombras suaves e bordas arredondadas) em favor de alto contraste, bordas grossas, sombras duras e tipografia assertiva.

A implementação utiliza **Tailwind CSS v4** com tokens via `@theme` e CSS Custom Properties.

---

## 1. Paleta de Cores

O Neubrutalism utiliza cores categóricas e blocos sólidos, sem gradientes.

### Tema Claro (Light Mode)
*   **Fundo Base:** Off-White (`#FFFDF5`)
*   **Fundo Quadriculado (Grade):** Linhas sutis com cinza claro (`rgba(0, 0, 0, 0.05)` ou `#e5e5e5`) sobre o Off-White.
*   **Texto e Bordas (Stroke):** Preto Absoluto (`#000000`)
*   **Sombras Base:** Preto Absoluto (`#000000`)
*   **Acentos (Pop-art):**
    *   Amarelo Forte: `#FFD23F`
    *   Rosa Coral: `#FF6B6B`
    *   Azul Céu: `#74B9FF`
    *   Verde Suave: `#88D498`
    *   Laranja: `#FFA552`
    *   Lavanda: `#B8A9FA`

### Tema Escuro (Dark Mode)
*   **Fundo Base:** Cinza Grafite (`#242424`)
*   **Fundo Elevado (Surface):** Cinza Médio Escuro (`#2d2d2d`) para superfícies de cards/containers.
*   **Fundo Quadriculado (Grade):** Linhas sutis (`rgba(255, 255, 255, 0.04)`) sobre o Cinza Grafite.
*   **Texto Principal:** Off-White (`#FFFDF5`)
*   **Texto Secundário (Muted):** Cinza Claro (`#a0a0a0`)
*   **Bordas (Stroke):** Quase Preto (`#050505`) — mantendo as linhas grossas características do estilo.
*   **Sombras Base:** Preto Puro (`#000000`) — graças ao fundo cinza, as sombras sólidas pretas voltam a contrastar perfeitamente.
*   **Acentos Estáticos (Navegação):** Blocos de navegação primários na Sidebar mantêm suas cores vibrantes (Amarelo, Roxo, Verde, Rosa) e textos pretos independente do tema, garantindo que o estilo Pop-Art não se perca no Dark Mode.
*   **Acentos Dinâmicos P&B (Utilitários):** Botões utilitários (ícones de redes sociais, botões de alternância de tema) operam em um esquema dinâmico P&B. No modo claro, usam fundo branco e texto preto (invertendo no hover/ativo). No modo escuro, usam fundo grafite com ícones off-white (invertendo no hover/ativo). Isso separa visualmente a navegação do conteúdo utilitário.

### Regras de Contraste (WCAG AA)

> **Regra de ouro:** Todas as combinações de texto + fundo devem ter contraste mínimo de **4.5:1** (texto normal) ou **3:1** (texto grande/bold ≥ 18px).

*   **⚠️ Combinações proibidas:**
    *   Texto amarelo (`#FFD23F`) sobre fundo Off-White — ratio ~1.5:1 (FALHA)
    *   Texto laranja (`#FFA552`) sobre fundo Off-White — ratio ~2.5:1 (FALHA)
    *   Texto branco sobre fundo amarelo ou laranja — ratio insuficiente
*   **✅ Uso seguro das cores de acento:**
    *   Como **background de cards/badges** com texto preto (`#000`) — alto contraste
    *   Como **bordas** e **sombras** decorativas — não dependem de contraste de leitura
    *   Como **destaque de borda em `:focus`** — complementar ao outline, não substituto
*   **Ferramenta de verificação:** Usar o [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) para validar toda nova combinação antes de implementar.

---

## 2. Tipografia

Contraste extremo entre cabeçalhos barulhentos e corpo de texto calmo.

### Famílias Tipográficas

*   **Display (Headlines, Hero):** `Archivo Black` (Peso 400). Função: Chamar atenção máxima. Foco em peso ("No ornament. Just weight.") com espaçamento de letras mais apertado.
*   **Headings (H2, H3, Títulos de cards):** `Space Grotesk` (Peso 700). Função: Limpo, mas com forte identidade.
*   **Body (Texto principal):** `Inter` (Peso 400). Função: Alta legibilidade para os artigos, contraste calmo para as fontes Display.
*   **Monospace (Blocos de código):** `JetBrains Mono`. Função: Estética "engenharia/bruta".

### Escala Tipográfica

| Nível      | Tamanho (Responsivo)                 | Line-Height | Letter-Spacing | Peso |
|------------|--------------------------------------|-------------|----------------|------|
| Display    | `clamp(3rem, 8vw, 6rem)`            | `0.95`      | `-0.02em`      | 800  |
| H2         | `clamp(1.75rem, 4vw, 2.5rem)`       | `1.1`       | `-0.01em`      | 700  |
| H3         | `clamp(1.25rem, 3vw, 1.75rem)`      | `1.2`       | `0`            | 700  |
| H4         | `clamp(1.1rem, 2vw, 1.25rem)`       | `1.3`       | `0`            | 600  |
| Body       | `1rem` (16px)                        | `1.6`       | `0`            | 400  |
| Body Small | `0.875rem` (14px)                    | `1.5`       | `0`            | 400  |
| Code       | `0.875rem` (14px)                    | `1.5`       | `0`            | 400  |

> **Princípio:** O body text deve ser *intencionalmente calmo*. Espaçamento previsível e tamanhos convencionais são o que tornam os gestos tipográficos bold sustentáveis. Reserve as escalas extremas para headlines e CTAs.

---

## 3. Geometria e Formas

A estrutura deve parecer carimbada ou impressa, com blocos rígidos.

### Tokens de Geometria

| Token             | Valor                | Uso                                          |
|-------------------|----------------------|----------------------------------------------|
| `--border-thin`   | `2px solid #000`     | Elementos pequenos: badges, separadores       |
| `--border`        | `3px solid #000`     | Padrão: cards, botões, inputs                |
| `--border-thick`  | `4px solid #000`     | Destaque: hero elements, CTAs principais      |
| `--radius`        | `0px`                | Cantos perfeitamente quadrados em tudo        |

*   **Border Radius:** `0px` (cantos perfeitamente quadrados em tudo: botões, inputs, cards, imagens).
*   **Espessura da Borda (Stroke):** Tokenizada em 3 níveis (`thin`, padrão, `thick`). Desviar apenas intencionalmente para criar hierarquia visual.
*   **Linhas e Divisórias:** Divisões claras (bordas sólidas) para separar seções, sem mesclar elementos.

---

## 4. Profundidade (Hard Shadows)

Sombras não têm desfoque (`blur: 0`). Elas representam um deslocamento (offset) sólido e nítido.

### Tokens de Sombra

| Token            | Valor               | Uso                                              |
|------------------|----------------------|--------------------------------------------------|
| `--shadow-sm`    | `3px 3px 0 0 #000`  | Badges, tags, botões secundários                  |
| `--shadow-md`    | `5px 5px 0 0 #000`  | Cards de postagem, blocos da sidebar, inputs     |
| `--shadow-lg`    | `8px 8px 0 0 #000`  | Destaques, dropdowns grandes                      |
| `--shadow-xl`    | `12px 12px 0 0 #000`| Modais, hero cards, overlays de destaque extremo  |

*(Em Tailwind v4: configurado via `@theme` estendendo `--shadow-neo-sm`, `--shadow-neo-md`, etc.)*

### Sombras no Dark Mode

No dark mode, as sombras **não devem ser brancas** (evitar efeito glassmorphism/brilho):
*   **Opção padrão:** Cinza médio (`#555555`) — cria profundidade sem brilho.
*   **Opção por componente:** Cor de acento do componente como cor da sombra (ex: card amarelo → sombra `#FFD23F`). Variação canônica chamada "Colored Shadow".

---

## 5. Padrão de Fundo (Background Grid)

O fundo do blog terá um padrão quadriculado (grid pattern) remetendo a cadernos de engenharia ou wireframes, reforçando o conceito de "estrutura exposta" do Neubrutalism.

*   **Implementação Visual:** Um padrão repetitivo de quadrados (ex: `40px` por `40px`).
*   **Comportamento:** O grid deve ficar no *background* e não interferir na leitura. Em contêineres principais de texto (como o artigo em si), o fundo do contêiner pode ser sólido para tapar a grade onde for necessário foco.

---

## 6. Micro-Interações (O Efeito "Físico")

Interações no Neubrutalism devem parecer físicas, "clicáveis" ou "deslizantes", usando transformações geométricas (Translate) em vez de alterações sutis de cor. Todas as transições devem respeitar `prefers-reduced-motion`.

### 6.1. O Efeito de Clique ("Press Effect")

Usado em botões, links de cards e inputs.
*   **Estado Padrão:** Elemento tem borda de 3px e sombra offset (`5px 5px`).
*   **Estado Hover:** A sombra cresce levemente (`translate(-2px, -2px)`) — o elemento "sobe" da superfície.
*   **Estado Active:** A sombra offset reduz para `0px`, e o próprio botão "desce" (`translate(3px, 3px)`) ocupando o espaço que era da sombra.
*   **Sensação:** O usuário sente que empurrou fisicamente um bloco de madeira/plástico na tela.

### 6.2. O Efeito "Levantar" (Hover Up)

Alternativa ao clique, usado para dar foco em Cards de Postagens quando não estão sendo ativamente clicados, mas o mouse passa por cima.
*   **Estado Padrão:** Sombra média (`5px 5px`).
*   **Estado Hover:** A sombra cresce (vai para `8px 8px`) e o card sobe (`translate(-2px, -2px)`). O card parece "saltar" da tela.

### 6.3. Focus States (Acessibilidade e Inputs)

Quando um input de texto (ex: busca ou newsletter) é focado:
*   **Estado Padrão:** Borda 3px, sombra de `3px 3px`.
*   **Estado em Foco (`:focus-visible`):** A borda muda para uma cor de acento vibrante (ex: Amarelo ou Azul Céu), ou ganha um contorno duplo de alto contraste. Nunca usar brilho esfumaçado (ring/outline suave).

---

## 7. Layout: "Quebrado mas não Aleatório"

O neubrutalism permite layouts que parecem "quebrados" visualmente, mas devem ser construídos sobre uma grid estruturada e previsível por baixo.

### Princípios de Layout

*   **Macro (Expressivo):** Heroes, stacks de cards, ilustrações — permitir assimetrias, offsets, elementos overlapped e escalas exageradas para criar energia visual.
*   **Micro (Mecânico):** Labels, campos de formulário, botões, estados de erro — manter alinhamento mecânico, espaçamento previsível e hierarquia clara.
*   **Separar Expressão de Interação:** Usar neubrutalism agressivamente em hero sections e blocos editoriais. Moderar a intensidade em áreas de leitura contínua (artigos do blog) para preservar a legibilidade.

> **Para o blog:** Artigos longos devem ter containers com fundo sólido (tapando o grid background), tipografia body calma (Inter 400), e espaçamento generoso. O neubrutalism aparece na *moldura* (header, sidebar, cards de navegação), não no *conteúdo* de leitura.

---

## 8. Dark Mode (Estratégia Híbrida)

O site utiliza uma estratégia **híbrida** de dark mode:
*   **Inicialização:** Respeitar `prefers-color-scheme` do sistema operacional do usuário.
*   **Override Manual:** Permitir que o usuário alterne o tema via toggle, salvando a preferência em `localStorage`.
*   **Prioridade:** `localStorage` > `prefers-color-scheme`.
*   **Implementação:** Atributo `data-theme="dark"` no `<html>`, controlado por script inline no `<head>` para evitar flash de tema incorreto (FOUC).

---

## 9. Documentação Viva e Testes (Manutenção Obrigatória)

Toda alteração ou adição no sistema de design deve ser documentada visualmente na página dedicada `/design-system` (`app/design-system/page.tsx`).

*   **Regra de Ouro:** Qualquer novo componente, variação de token, efeito visual, animação ou estado interativo DEVE ser adicionado à página `/design-system`.
*   **Propósito:** Garantir testes contínuos de contraste, validação em ambos os temas (light/dark) e manter uma documentação viva para o projeto.

