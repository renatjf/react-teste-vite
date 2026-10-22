# Next.js Exemplos

Projeto separado com exemplos práticos de Next.js 16 usando o App Router, JavaScript e a pasta `src/app`.

Para as instruções gerais dos dois projetos do repositório, consulte o [README da raiz](../README.md).

## Requisitos

- Node.js 20.9 ou superior
- npm 10 ou superior

## Instalação

```bash
cd next-examples
npm install
```

## Desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:3000`.

## Build e produção

```bash
npm run build
npm run start
```

## Lint

```bash
npm run lint
```

## Exemplos

| Rota | Conteúdo |
| --- | --- |
| `/app-router` | Layouts aninhados, `loading.js`, `error.js`, `not-found.js` e estado preservado no layout |
| `/server-client` | Server Components, Client Components e composição com `children` |
| `/data-fetching` | `fetch` no servidor, requisições paralelas, cache, revalidação e streaming com Suspense |
| `/dynamic-routes` | Rotas `[id]`, `await params`, `generateMetadata`, `Link` e `useRouter` |
| `/api-routes` | Route Handlers com GET e POST e rota dinâmica |
| `/server-actions` | Server Actions, `revalidatePath`, `useActionState` e `useFormStatus` |

## Endpoints de exemplo

- `GET /api/hello`
- `GET /api/posts`
- `POST /api/posts`
- `GET /api/posts/:id`

Os dados dos posts da API e das Server Actions ficam em memória no servidor e são reiniciados quando o processo do Next.js reinicia.
