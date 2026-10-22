import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import type { AppInfo } from './../src/app.service';
import type { Task } from './../src/tasks/entities/task.entity';

describe('API (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /api deve retornar as informações da API', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(200)
      .expect(({ body }) => {
        const apiInfo = body as AppInfo;
        expect(apiInfo.name).toBe('NestJS Exemplos API');
      });
  });

  it('GET /api/tasks deve listar as tarefas', () => {
    return request(app.getHttpServer())
      .get('/api/tasks')
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveLength(3);
      });
  });

  it('GET /api/tasks deve filtrar por status', async () => {
    const completed = await request(app.getHttpServer())
      .get('/api/tasks?status=completed')
      .expect(200);

    const pending = await request(app.getHttpServer())
      .get('/api/tasks?status=pending')
      .expect(200);

    expect(completed.body).toHaveLength(1);
    expect(pending.body).toHaveLength(2);
  });

  it('GET /api/tasks/stats deve retornar as estatísticas', () => {
    return request(app.getHttpServer())
      .get('/api/tasks/stats')
      .expect(200)
      .expect({ total: 3, completed: 1, pending: 2 });
  });

  it('GET /api/tasks/:id deve retornar 404 para tarefa inexistente', () => {
    return request(app.getHttpServer()).get('/api/tasks/999').expect(404);
  });

  it('GET /api/tasks/:id deve retornar 400 para id inválido', () => {
    return request(app.getHttpServer()).get('/api/tasks/abc').expect(400);
  });

  it('POST /api/tasks deve criar uma tarefa', () => {
    return request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'Nova tarefa', description: 'Criada no teste E2E' })
      .expect(201)
      .expect(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            id: 4,
            title: 'Nova tarefa',
            description: 'Criada no teste E2E',
            completed: false,
          }),
        );
      });
  });

  it('POST /api/tasks deve validar o corpo da requisição', () => {
    return request(app.getHttpServer())
      .post('/api/tasks')
      .send({ description: 'Sem título' })
      .expect(400)
      .expect(({ body }) => {
        const errorBody = body as { message: string[] };
        expect(errorBody.message).toContain('O título é obrigatório.');
      });
  });

  it('POST /api/tasks deve rejeitar campos desconhecidos', () => {
    return request(app.getHttpServer())
      .post('/api/tasks')
      .send({ title: 'Tarefa', priority: 'alta' })
      .expect(400);
  });

  it('PATCH /api/tasks/:id deve atualizar uma tarefa', () => {
    return request(app.getHttpServer())
      .patch('/api/tasks/2')
      .send({ completed: true })
      .expect(200)
      .expect(({ body }) => {
        const task = body as Task;
        expect(task.completed).toBe(true);
      });
  });

  it('DELETE /api/tasks/:id deve remover uma tarefa', async () => {
    await request(app.getHttpServer())
      .delete('/api/tasks/3')
      .expect(200)
      .expect(({ body }) => {
        const task = body as Task;
        expect(task.id).toBe(3);
      });

    await request(app.getHttpServer()).get('/api/tasks/3').expect(404);
  });
});
