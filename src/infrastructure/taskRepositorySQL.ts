import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "src/domain/task";
import { TaskRepository } from "src/domain/repositories/task.repository";
import { Repository } from "typeorm";
import { TaskModel } from "./models/taskModel";

export class TaskRepositorySQL implements TaskRepository {
    constructor(@InjectRepository(TaskModel) private repository: Repository<TaskModel>) { }
    
    async getById(id: string): Promise<Task | null> {
        const task = await this.repository.findOne({
            where: { id }
        })
        return task;
    }

    async getAllTaskByUser(id: string): Promise<Task[]> {
        const tasks = await this.repository.find({
            where: { userId: id },
        });
        return tasks;
    }

    async save(task: Task): Promise<void> {
        await this.repository.save(task)
    }

    async delete(taskId: string): Promise<void> {
        await this.repository.delete(taskId)
    }

}