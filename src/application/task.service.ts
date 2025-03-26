import { BadRequestException, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "src/domain/repositories/task.repository";
import { Task } from "src/domain/task";
import { v4 } from "uuid";


@Injectable()
export class TaskService {
    constructor(@Inject("repository") private repository: TaskRepository) { }

    async getTasksByUser(id: string): Promise<Task[]> {
        const tasks: Task[] = await this.repository.getAllTaskByUser(id);
        return tasks
    }

    async saveTask(task: Omit<Task, "id" | "userId">, userId: string): Promise<void> {
        if (!task.title) {
            throw new BadRequestException("The title is required");
        }
        const taskCreate: Task = {
            id: v4(),
            ...task,
            userId: userId
        }
        await this.repository.save(taskCreate);
    }

    async deleteTask(id: string, userId: string): Promise<void> {
        const task = await this.getTaskByIdOrFail(id);
        this.validateUserTask(task, userId);
        await this.repository.delete(id);
    }

    async changeStatusOk(id: string, userId: string): Promise<void> {
        const task = await this.getTaskByIdOrFail(id);
        this.validateUserTask(task, userId);
        if (task.isDone) {
            throw new BadRequestException('Task status cannot be changed');
        }
        task.isDone = true;
        await this.repository.save(task);
    }

    private async getTaskByIdOrFail(id: string): Promise<Task> {
        const task = await this.repository.getById(id);
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

    private validateUserTask(task: Task, userId: string): void {
        if(task.userId !== userId){
            throw new ForbiddenException();
        }
    }

}