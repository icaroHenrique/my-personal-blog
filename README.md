# Meu Blog Pessoal

Front-end do meu blog pessoal, construído com **Next.js** e **Tailwind CSS v4** usando a estética **Neubrutalism**.

## Funcionalidades

- **Design System:** Alto contraste, bordas grossas, sombras duras e cores sólidas (detalhes no `DESIGN.MD`). O visualizador de tokens localiza-se em `/design-system` (apenas modo desenvolvimento).
- **Temas claro e escuro:** Preserva legibilidade (WCAG AA) em ambos os modos.
- **Rotas (App Router):** `/blog`, `/categorias`, `/tags`, `/sobre-mim` e `/search`.
- **CMS (Payload):** Integrado nativamente com suporte a *Live Preview* via iframe e cache automático de 60 segundos (ISR).

## Tecnologias

- **Next.js** (v16.3.0) - App Router, Server Components e Next Image API (habilitada por padrão)
- **React** e **React DOM** (v19)
- **Tailwind CSS** (v4)
- **TypeScript**

## Variáveis de ambiente

As variáveis devem ser declaradas (no `.env.local` para desenvolvimento ou no pipeline de build para o Docker):

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `NEXT_PUBLIC_PAYLOAD_URL` | URL base do backend (API do Payload CMS). Ela controla o roteamento da API, Content Security Policy (CSP) e lista de domínios seguros para otimização de imagens. | `https://cms.meublog.com` |
| `NEXT_PUBLIC_SITE_URL` | URL pública da própria aplicação para gerar links canônicos e metadados SEO. | `https://meublog.com` |

## Como implantar (Produção / Docker)

O projeto está otimizado para produção usando a configuração `standalone` do Next.js. O contêiner embarca apenas as pastas puras da compilação, mantendo o ambiente Node.js de produção leve e com total suporte a rotas dinâmicas.

Para gerar e subir o contêiner:

```bash
docker build \
  --build-arg NEXT_PUBLIC_PAYLOAD_URL=https://(url-do-cms) \
  --build-arg NEXT_PUBLIC_SITE_URL=https://(url-do-frontend) \
  -t meu-blog-pessoal .

docker run -d -p 3000:3000 meu-blog-pessoal
```

## Como executar localmente (Desenvolvimento)

1. Clone o repositório.
2. Instale as dependências com `npm install`.
3. Crie um arquivo `.env.local` usando as variáveis da tabela.
4. Inicie o servidor em modo dev com `npm run dev` e acesse [http://localhost:3000](http://localhost:3000).
