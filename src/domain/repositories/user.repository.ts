import { Task } from "../task"
import { User } from "../user"

export interface UserRepository {

    save(user: User): Promise<void>

    getById(id: string): Promise<Omit<User, "password">> 

    getAllTaskByUser(id: string): Promise<Task[]>

}