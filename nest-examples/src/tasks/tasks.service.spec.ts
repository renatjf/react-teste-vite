import { NotFoundException } from '@nestjs/common';
import { TasksService } from './tasks.service';

describe('TasksService', () => {
  let service: TasksService;

  beforeEach(() => {
    service = new TasksService();
  });

  it('deve listar todas as tarefas', () => {
    expect(service.findAll()).toHaveLength(3);
  });

  it('deve filtrar tarefas concluídas e pendentes', () => {
    expect(service.findAll('completed')).toHaveLength(1);
    expect(service.findAll('pending')).toHaveLength(2);
  });

  it('deve buscar uma tarefa pelo id', () => {
    expect(service.findOne(1)).toEqual(
      expect.objectContaining({ id: 1, completed: true }),
    );
  });

  it('deve lançar NotFoundException para tarefa inexistente', () => {
    expect(() => service.findOne(999)).toThrow(NotFoundException);
  });

  it('deve criar uma tarefa', () => {
    const task = service.create({
      title: '  Aprender injeção de dependência  ',
      description: '  Providers do NestJS  ',
    });

    expect(task).toEqual(
      expect.objectContaining({
        id: 4,
        title: 'Aprender injeção de dependência',
        description: 'Providers do NestJS',
        completed: false,
      }),
    );
    expect(service.findAll()).toHaveLength(4);
  });

  it('deve atualizar uma tarefa', () => {
    const task = service.update(2, {
      title: 'Título atualizado',
      completed: true,
    });

    expect(task.title).toBe('Título atualizado');
    expect(task.completed).toBe(true);
    expect(task.description).toBe(
      'Usar DTOs, class-validator e ValidationPipe.',
    );
  });

  it('deve remover uma tarefa', () => {
    const removed = service.remove(3);

    expect(removed.id).toBe(3);
    expect(service.findAll()).toHaveLength(2);
    expect(() => service.findOne(3)).toThrow(NotFoundException);
  });

  it('deve retornar estatísticas', () => {
    expect(service.getStats()).toEqual({
      total: 3,
      completed: 1,
      pending: 2,
    });
  });
});
