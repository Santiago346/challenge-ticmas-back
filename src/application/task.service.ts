import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { TaskRepository } from "src/domain/repositories/task.repository";
import { Task } from "src/domain/task";
import { v4 } from "uuid";


@Injectable()
export class TaskService {
    constructor(@Inject("repository") private repository: TaskRepository) { }

    async getTasksByUser(id: string): Promise<Task[]> {
        return this.repository.getAllTaskByUser(id);
     }

    async saveTask(task: Omit<Task, "id">): Promise<void> {
        const taskCreate: Task = {
            id: v4(),
            ...task
        }
        await this.repository.save(taskCreate);
    }

    async deleteTask(id: string): Promise<void> {
        await this.getTaskByIdOrFail(id);
        await this.repository.delete(id);
    }

    async changeStatusOk(id: string, status: boolean): Promise<void> {
        const task = await this.getTaskByIdOrFail(id);
        if (task?.isDone !== false) {
            throw new NotFoundException('Task status cannot be changed');
        }
        await this.repository.updateStatus(id, status);
    }

    private async getTaskByIdOrFail(id: string): Promise<Task | null> {
        const tasks: Task[] = await this.repository.getAllTaskByUser(id);
        const task = tasks.find(task => task.id === id)
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return task;
    }

}