import { Injectable } from '@nestjs/common';

export interface AppInfo {
  name: string;
  description: string;
  endpoints: Record<string, string>;
}

@Injectable()
export class AppService {
  getInfo(): AppInfo {
    return {
      name: 'NestJS Exemplos API',
      description:
        'API de tarefas criada para estudar os fundamentos do NestJS.',
      endpoints: {
        listTasks: 'GET /api/tasks',
        filterTasks: 'GET /api/tasks?status=pending|completed',
        taskStats: 'GET /api/tasks/stats',
        getTask: 'GET /api/tasks/:id',
        createTask: 'POST /api/tasks',
        updateTask: 'PATCH /api/tasks/:id',
        deleteTask: 'DELETE /api/tasks/:id',
      },
    };
  }
}
