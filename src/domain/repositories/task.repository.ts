import { Task } from "../task"

export interface TaskRepository {

    save(task: Task): Promise<void>

    getById(id: string): Promise<Task | null>

    getAllTaskByUser(userId: string): Promise<Task[]>

    delete(taskId: string): Promise<void>
}