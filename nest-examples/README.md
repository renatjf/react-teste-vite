# NestJS Exemplos

API de tarefas criada para estudar os fundamentos do NestJS: módulos, controllers, services, injeção de dependência, DTOs, validação, pipes, tratamento de erros e testes.

Para as instruções gerais do repositório, consulte o [README da raiz](../README.md).

## Requisitos

- Node.js 20.9 ou superior
- npm 10 ou superior

## Instalação

```bash
cd nest-examples
npm install
```

## Executar em desenvolvimento

```bash
npm run start:dev
```

A API fica disponível em `http://localhost:3001/api`. O modo `start:dev` reinicia automaticamente ao alterar os arquivos.

Outros comandos:

```bash
npm run start        # inicia sem watch
npm run start:debug  # inicia com debug e watch
```

## Build e produção

```bash
npm run build
npm run start:prod
```

## Endpoints

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/api` | Informações da API e lista de endpoints |
| GET | `/api/tasks` | Lista todas as tarefas |
| GET | `/api/tasks?status=pending` | Lista apenas tarefas pendentes |
| GET | `/api/tasks?status=completed` | Lista apenas tarefas concluídas |
| GET | `/api/tasks/stats` | Retorna total, concluídas e pendentes |
| GET | `/api/tasks/:id` | Busca uma tarefa pelo id |
| POST | `/api/tasks` | Cria uma tarefa |
| PATCH | `/api/tasks/:id` | Atualiza parcialmente uma tarefa |
| DELETE | `/api/tasks/:id` | Remove uma tarefa |

### Criar tarefa

```bash
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Estudar NestJS","description":"Criar uma API de tarefas"}'
```

### Atualizar tarefa

```bash
curl -X PATCH http://localhost:3001/api/tasks/2 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

### Filtrar tarefas

```bash
curl "http://localhost:3001/api/tasks?status=pending"
```

### Remover tarefa

```bash
curl -X DELETE http://localhost:3001/api/tasks/3
```

## Estrutura

```text
src/
├── main.ts                    # bootstrap, prefixo global, CORS e ValidationPipe
├── app.module.ts              # módulo raiz
├── app.controller.ts          # rota GET /api
├── app.service.ts             # informações da API
├── app.controller.spec.ts     # teste unitário do controller raiz
└── tasks/
    ├── tasks.module.ts
    ├── tasks.controller.ts
    ├── tasks.service.ts
    ├── tasks.service.spec.ts
    ├── dto/
    │   ├── create-task.dto.ts
    │   └── update-task.dto.ts
    └── entities/
        └── task.entity.ts
test/
└── app.e2e-spec.ts            # testes E2E com Supertest
```

## Conceitos demonstrados

- **Módulo** (`TasksModule`) organizando o domínio de tarefas.
- **Controller** recebendo requisições HTTP e delegando para o service.
- **Provider/Service** com `@Injectable()` e injeção de dependência.
- **DTOs** para definir o formato dos dados de entrada.
- **class-validator** com `@IsString`, `@IsNotEmpty`, `@IsOptional`, `@IsBoolean` e `@MaxLength`.
- **ValidationPipe** global com `whitelist` e `forbidNonWhitelisted`.
- **ParseIntPipe** para validar e converter o parâmetro `:id`.
- **NotFoundException** para retornar `404` quando a tarefa não existe.
- **Query parameters** para filtrar tarefas por status.
- **CORS** habilitado e prefixo global `/api` para facilitar o consumo pelo frontend.
- **Testes unitários** do service e do controller com Jest.
- **Testes E2E** da API com Supertest.

## Testes

Os testes são divididos em unitários (Jest) e E2E (Jest + Supertest). Para executar todos:

```bash
npm test          # testes unitários
npm run test:e2e  # testes E2E
```

Ao final, o Jest deve exibir algo como `Test Suites: 2 passed` / `Tests: 9 passed` para os unitários e `Test Suites: 1 passed` / `Tests: 11 passed` para os E2E.

### Testes unitários

```bash
npm test                              # executa uma vez
npm run test:watch                    # modo watch
npm test -- tasks.service.spec.ts     # apenas um arquivo
npm run test:cov                      # cobertura em coverage/
```

Cobrem o `TasksService` (listagem, filtros, criação, atualização, remoção, estatísticas e `NotFoundException`) e o `AppController`.

### Testes E2E

```bash
npm run test:e2e                    # todos os testes E2E
npm run test:e2e -- app.e2e-spec.ts # apenas um arquivo
```

Os testes E2E criam a aplicação Nest em memória com o `AppModule`, aplicam o prefixo `/api` e o `ValidationPipe`, e chamam as rotas com Supertest. Não é necessário ter o servidor rodando. Como a aplicação é recriada antes de cada teste, os dados em memória são reiniciados.

Cobrem:

- `GET /api` e listagem/filtros de tarefas
- estatísticas e busca por id
- `404` para tarefa inexistente e `400` para id inválido
- criação com validação do corpo
- rejeição de campos desconhecidos
- atualização e remoção de tarefas

### Teste manual

Com a API rodando (`npm run start:dev`), execute em outro terminal:

```bash
curl http://localhost:3001/api
curl http://localhost:3001/api/tasks
curl "http://localhost:3001/api/tasks?status=pending"
curl -X POST http://localhost:3001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Teste manual"}'
```

## Lint

```bash
npm run lint
```

## Validação

Campos obrigatórios, tipos e limites são validados automaticamente. Exemplo de resposta para um corpo inválido:

```json
{
  "statusCode": 400,
  "message": ["O título é obrigatório."],
  "error": "Bad Request"
}
```

Campos desconhecidos no corpo também retornam `400`, pois o `ValidationPipe` está configurado com `forbidNonWhitelisted`.

## Observações

- Os dados ficam em memória e são reiniciados quando o processo do NestJS reinicia.
- A API usa a porta `3001` para não conflitar com o Next.js (`3000`) nem com o Vite (`5173`).
- O prefixo global é `/api`; por isso as rotas são acessadas com `/api/tasks`, por exemplo.
