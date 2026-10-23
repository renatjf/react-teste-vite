# React + Vite — Exemplos de estudo

Este repositório contém três projetos independentes:

1. **App principal (Vite + React)** — exemplos de hooks, Zustand, Apollo Client, design patterns e testes com Vitest e Cypress.
2. **`next-examples/`** — exemplos de Next.js 16 com App Router.
3. **`nest-examples/`** — API REST de tarefas com NestJS, DTOs, validação e testes.

## Requisitos

- Node.js 20.9 ou superior (recomendado: 22)
- npm 10 ou superior

Cada projeto tem seu próprio `package.json` e `node_modules`. Instale as dependências separadamente.

## Estrutura

```text
.
├── src/                 # app Vite + React
├── cypress/             # testes E2E do app Vite
├── cypress.config.ts
├── package.json
├── next-examples/       # projeto Next.js separado
│   ├── src/app/
│   └── package.json
└── nest-examples/       # API NestJS separada
    ├── src/
    ├── test/
    └── package.json
```

## Rodando os projetos

| Projeto | Pasta | Comando | URL |
| --- | --- | --- | --- |
| Vite + React | raiz | `npm run dev` | `http://localhost:5173` |
| Next.js | `next-examples` | `npm run dev` | `http://localhost:3000` |
| NestJS | `nest-examples` | `npm run start:dev` | `http://localhost:3001/api` |

Os projetos são independentes e podem rodar ao mesmo tempo, cada um em um terminal, pois usam portas diferentes.

## Como testar

Cada projeto tem seus próprios testes. Execute os comandos na pasta indicada.

| Projeto | Pasta | Comando | O que testa |
| --- | --- | --- | --- |
| Vite + React | raiz | `npm run typecheck` | Verificação de tipos com TypeScript |
| Vite + React | raiz | `npm run test:run` | Testes unitários com Vitest |
| Vite + React | raiz | `npm run test:e2e` | Fluxos da interface com Cypress |
| Next.js | `next-examples` | `npm run typecheck` | Verificação de tipos com TypeScript |
| Next.js | `next-examples` | `npm run lint && npm run build` | Lint e build (não possui testes automatizados) |
| NestJS | `nest-examples` | `npm test` | Testes unitários com Jest |
| NestJS | `nest-examples` | `npm run test:e2e` | Testes da API com Supertest |

### Testes do app Vite

Na raiz do repositório:

```bash
npm run test:run   # executa os testes unitários uma vez
npm run test       # modo watch
npm run test:e2e   # Cypress (inicia e encerra o servidor automaticamente)
```

Para abrir o Cypress e acompanhar os testes visualmente, rode `npm run dev` em um terminal e `npm run cypress:open` em outro.

### Testes do NestJS

Dentro de `nest-examples`:

```bash
npm test                                      # todos os testes unitários
npm run test:watch                            # testes unitários em watch
npm test -- tasks.service.spec.ts             # apenas um arquivo
npm run test:cov                              # cobertura
npm run test:e2e                              # todos os testes E2E
npm run test:e2e -- app.e2e-spec.ts           # apenas um arquivo E2E
```

Os testes E2E sobem a aplicação Nest em memória e não precisam do servidor rodando. Eles usam Supertest para chamar as rotas `/api`.

### Teste manual da API NestJS

Com `npm run start:dev` rodando em `nest-examples`:

```bash
curl http://localhost:3001/api
curl http://localhost:3001/api/tasks
curl http://localhost:3001/api/tasks/stats
curl "http://localhost:3001/api/tasks?status=pending"
```

## App principal (Vite + React)

### Instalação

Na raiz do repositório:

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:5173`.

### Build e preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

### Testes unitários (Vitest)

```bash
npm run test       # modo watch
npm run test:run   # executa uma vez
```

### Testes E2E (Cypress)

```bash
npm run test:e2e
```

Esse comando inicia o servidor Vite automaticamente, executa os testes no Cypress em modo headless e encerra o servidor ao final.

Para abrir a interface do Cypress, inicie o servidor em um terminal e abra o Cypress em outro:

```bash
# terminal 1
npm run dev

# terminal 2
npm run cypress:open
```

Se o binário do Cypress não estiver instalado:

```bash
npx cypress install
```

> Importante: os comandos de teste E2E do Cypress devem ser executados na **raiz do repositório**, não dentro de `next-examples/` nem de `nest-examples/`.

### Exemplos disponíveis no menu

Props, Props com useState, Zustand, Zustand API, Design Patterns, useLayoutEffect, useMemo, useEffect API, useEffect, useState, useReducer, useRef, useCallback, useContext e Apollo Client.

## Projeto Next.js (`next-examples`)

O projeto Next.js é separado e usa a porta `3000`.

### Instalação

```bash
cd next-examples
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra `http://localhost:3000`.

### Build e execução em produção

```bash
npm run build
npm run start
```

### Lint

```bash
npm run lint
```

### Exemplos disponíveis

- App Router e layouts (`/app-router`)
- Server e Client Components (`/server-client`)
- Data fetching (`/data-fetching`)
- Rotas dinâmicas e navegação (`/dynamic-routes`)
- Route Handlers / API (`/api-routes`)
- Server Actions e formulários (`/server-actions`)

Endpoints de exemplo:

- `GET /api/hello`
- `GET /api/posts`
- `POST /api/posts`
- `GET /api/posts/:id`

## Projeto NestJS (`nest-examples`)

API REST de tarefas separada, com prefixo global `/api` e porta `3001`. Consulte também o [`nest-examples/README.md`](nest-examples/README.md) para detalhes.

### Instalação

```bash
cd nest-examples
npm install
```

### Desenvolvimento

```bash
npm run start:dev
```

Abra `http://localhost:3001/api`.

### Build e execução em produção

```bash
npm run build
npm run start:prod
```

### Lint e testes

```bash
npm run lint
npm test          # testes unitários com Jest
npm run test:e2e  # testes E2E da API com Supertest
```

### Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/api` | Informações da API |
| GET | `/api/tasks` | Lista tarefas |
| GET | `/api/tasks?status=pending` | Filtra tarefas pendentes |
| GET | `/api/tasks?status=completed` | Filtra tarefas concluídas |
| GET | `/api/tasks/stats` | Retorna estatísticas |
| GET | `/api/tasks/:id` | Busca tarefa por id |
| POST | `/api/tasks` | Cria tarefa |
| PATCH | `/api/tasks/:id` | Atualiza tarefa |
| DELETE | `/api/tasks/:id` | Remove tarefa |

Exemplo de criação:

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Estudar NestJS","description":"Criar uma API de tarefas"}'
```

### Conceitos demonstrados

Módulos, controllers, services com injeção de dependência, DTOs, `class-validator`, `ValidationPipe`, `ParseIntPipe`, `NotFoundException`, query parameters, CORS, prefixo global, testes unitários com Jest e testes E2E com Supertest.

## Problemas comuns

### `npm error Missing script: "test:e2e"`

Na raiz, `npm run test:e2e` executa o Cypress do app Vite. Dentro de `next-examples/` esse script não existe; volte para a raiz:

```bash
cd ..
npm run test:e2e
```

Dentro de `nest-examples/`, `npm run test:e2e` executa os testes E2E da API NestJS, não o Cypress.

### O Cypress não consegue acessar a aplicação

Use `npm run test:e2e`, que inicia o servidor automaticamente. Se estiver usando `npm run cypress:open`, mantenha `npm run dev` rodando em outro terminal.

### Cypress não encontrado ou binário ausente

```bash
npx cypress install
```

### A porta 5173 já está em uso

Encerre o processo que está usando a porta ou reinicie o terminal. O `baseUrl` do Cypress está configurado para `http://localhost:5173`.

### As portas 3000 ou 3001 já estão em uso

O Next.js usa `3000` e o NestJS usa `3001`. Encerre o processo que estiver ocupando a porta ou defina outra porta:

```bash
# Next.js
PORT=3002 npm run dev

# NestJS
PORT=3002 npm run start:dev
```

### Exemplos com API externa não carregam

As páginas de data fetching e Apollo Client dependem de acesso à internet. Em caso de falha, a página de data fetching exibe dados de fallback e o exemplo de Apollo Client exibe uma mensagem de erro com opção de tentar novamente.
