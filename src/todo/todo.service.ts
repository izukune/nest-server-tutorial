import { Injectable, ForbiddenException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@prisma/client';
import { UpdateTasksDto } from './dto/update-task.dto';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  getTasks(userId: number): Promise<Task[]> {
    return this.prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  getTaskById(userId: number, taskId: number): Promise<Task> {
    return this.prisma.task.findFirst({
      where: {
        userId,
        id: taskId,
      },
    });
  }

  async createTask(userId: number, dto: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({
      data: {
        userId,
        ...dto,
      },
    });
    return task;
  }

  async updateTaskById(
    userId: number,
    taskId: number,
    dto: UpdateTasksDto,
  ): Promise<Task> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permissioin to update');

    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteTask(userId: number, taskId: number): Promise<void> {
    const task = await this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
    if (!task || task.userId !== userId)
      throw new ForbiddenException('No permissioin to update');

    await this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
