import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/user";
import { UserModel } from "./models/userModel";
import { Repository } from "typeorm";
import { UserRepository } from "src/domain/repositories/user.repository";
import { Task } from "src/domain/task";
import { NotFoundException } from "@nestjs/common";

export class UserRepositoryInTypeOrm implements UserRepository {
    constructor(@InjectRepository(UserModel) private repository: Repository<UserModel>) { }

    async getAllTaskByUser(id: string): Promise<Task[]> {
        const user = await this.repository.findOne({
            where: { id: id },
            relations: ['tasks']
        })
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return user.tasks
    }

    async save(user: User): Promise<void> {
        await this.repository.save(user);
    }

    async getById(id: string): Promise<Omit<User, "password">> {
        const user = await this.repository.findOne({
            where: { id },
            select: {id: true, name: true, email: true}
        })
        if (!user) {
            throw new NotFoundException();
        }
        return user
    }

}