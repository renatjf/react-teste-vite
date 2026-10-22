import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Estudar os fundamentos do NestJS',
      description: 'Módulos, controllers, providers e injeção de dependência.',
      completed: true,
      createdAt: '2026-10-01T10:00:00.000Z',
      updatedAt: '2026-10-01T10:00:00.000Z',
    },
    {
      id: 2,
      title: 'Criar uma API com validação de dados',
      description: 'Usar DTOs, class-validator e ValidationPipe.',
      completed: false,
      createdAt: '2026-10-02T10:00:00.000Z',
      updatedAt: '2026-10-02T10:00:00.000Z',
    },
    {
      id: 3,
      title: 'Escrever testes unitários e E2E',
      description: 'Cobrir o service com Jest e a API com Supertest.',
      completed: false,
      createdAt: '2026-10-03T10:00:00.000Z',
      updatedAt: '2026-10-03T10:00:00.000Z',
    },
  ];

  private nextId = 4;

  findAll(status?: string): Task[] {
    if (status === 'completed') {
      return this.tasks.filter((task) => task.completed);
    }

    if (status === 'pending') {
      return this.tasks.filter((task) => !task.completed);
    }

    return this.tasks;
  }

  findOne(id: number): Task {
    const task = this.tasks.find((item) => item.id === id);

    if (!task) {
      throw new NotFoundException(`Tarefa #${id} não encontrada.`);
    }

    return task;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const now = new Date().toISOString();
    const task: Task = {
      id: this.nextId++,
      title: createTaskDto.title.trim(),
      description: createTaskDto.description?.trim() || null,
      completed: false,
      createdAt: now,
      updatedAt: now,
    };

    this.tasks.push(task);

    return task;
  }

  update(id: number, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);

    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title.trim();
    }

    if (updateTaskDto.description !== undefined) {
      task.description = updateTaskDto.description.trim() || null;
    }

    if (updateTaskDto.completed !== undefined) {
      task.completed = updateTaskDto.completed;
    }

    task.updatedAt = new Date().toISOString();

    return task;
  }

  remove(id: number): Task {
    const task = this.findOne(id);

    this.tasks = this.tasks.filter((item) => item.id !== id);

    return task;
  }

  getStats(): TaskStats {
    const completed = this.tasks.filter((task) => task.completed).length;

    return {
      total: this.tasks.length,
      completed,
      pending: this.tasks.length - completed,
    };
  }
}
