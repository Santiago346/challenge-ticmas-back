import { Inject } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";
import { Task } from "src/domain/task";
import { User } from "src/domain/user";
import { v4 } from "uuid";


export class UserService {
    constructor(@Inject("repository") private repository: UserRepository) { }
 
     async saveUser(user: Omit<User, "id">): Promise<void> {
         const userCreate: User = {
             id: v4(),
             ...user
         }
         await this.repository.save(userCreate);
     }
 
     async getUserById(id: string): Promise<Omit<User, "password">>  {
         return this.repository.getById(id);
     }

     async getTasksById(id: string): Promise<Task[]> {
        return this.repository.getAllTaskByUser(id);
     }
}