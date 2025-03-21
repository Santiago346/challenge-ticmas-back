import { Task } from "../task"

export interface TaskRepository {

    save(task: Task): Promise<void>

    getAllTaskByUser(id: string): Promise<Task[]>

    delete(taskId: string): Promise<void>

    updateStatus(taskId: string, status: boolean): Promise<void>
}