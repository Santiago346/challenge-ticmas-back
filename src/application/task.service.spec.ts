import { TaskRepository } from "src/domain/repositories/task.repository";
import { Task } from "src/domain/task";
import { TaskService } from "./task.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

class TaskRepositoryClass implements TaskRepository {
    
    private tasks: Task[] = [
        {
            id: "123",
            title: "Hacer compras",
            isDone: false,
            userId: "12"
        },
        {
            id: "345",
            title: "Trabajar",
            isDone: true,
            userId: "12345"
        }
    ];
    
    async getById(id: string): Promise<Task | null> {
        const task = this.tasks.find(task => task.id === id);
        return Promise.resolve(task ?? null);
    }

    async save(task: Task): Promise<void> {
        this.tasks.push(task);
        return Promise.resolve();
    }

    async getAllTaskByUser(userId: string): Promise<Task[]> {
        const userTasks: Task[] = this.tasks.filter(task => task.userId === userId);
        return Promise.resolve(userTasks);
    }

    async delete(taskId: string): Promise<void> {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        return Promise.resolve();
    }

    async updateStatus(taskId: string, status: boolean): Promise<void> {
        const task: Task | undefined = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.isDone = status;
        }
        return Promise.resolve();
    }
}

const repository = new TaskRepositoryClass();

describe("TaskService", () => {
    let taskService: TaskService;

    beforeEach(async () => {
        taskService = new TaskService(repository);
    })

    it('should return all tasks by one user id', async () => {
        const userId = "12";
        const tasks: Task[] = await taskService.getTasksByUser(userId)
        const expectedTasks: Task[] = [
            {
                id: "123",
                title: "Hacer compras",
                isDone: false,
                userId: "12"
            }
        ];
        expect(tasks).toEqual(expectedTasks);
    })

    it('should add task', async () => {
        const userId = "12"
        const foundTask = "678"
        const task: Task = {
            id: "678",
            title: "Ir al gimnasio",
            isDone: false,
            userId: "12"
        }
        await taskService.saveTask(task, userId);
        const tasks = await taskService.getTasksByUser(userId)
        const taskSelected = tasks.find(task => task.id === foundTask);
        expect(task).toEqual(taskSelected)
    })

    it('should not let task be added without a title and throw BadRequestException', async () => {
        const userId = "12"
        const task: Task = {
            id: "543",
            title: "",
            isDone: false,
            userId: "12"
        }
        await expect(taskService.saveTask(task, userId)).rejects.toThrow(new BadRequestException("The title is required"))
    })

    it("should change the status of the task", async () => {
        const taskId = "123";
        const userId = "12";
        await taskService.changeStatusOk(taskId, userId)
        const tasks = await taskService.getTasksByUser(userId)
        const taskSelected = tasks.find(task => task.id === taskId);
        expect(taskSelected?.isDone).toBe(true)
    });

    it("should not change the status of the task when the task is already done and throw BadRequestException", async () => {
        const taskId = "345";
        const userId = "12345";
        await expect(taskService.changeStatusOk(taskId, userId)).rejects.toThrow(new BadRequestException('Task status cannot be changed'));
    });

    it("should not change the status of the task when the task is not found and throw NotFoundException", async () => {
        const taskId = "745";
        const userId = "12";
        await expect(taskService.changeStatusOk(taskId, userId)).rejects.toThrow(new NotFoundException('Task not found'));
    });

    it('should delete task by id', async () => {
        const taskId = "345"
        const userId = "12345"
        await taskService.deleteTask(taskId, userId);
        const task = await repository.getById(taskId);
        expect(task).toBeNull();
    })

    it('should not delete task by id when is not found and throw NotFoundException', async () => {
        const taskId = "9098"
        const userId = "198"
        await expect(taskService.deleteTask(taskId, userId)).rejects.toThrow(new NotFoundException('Task not found'));
    })
})