import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/user";
import { UserModel } from "./models/userModel";
import { Repository } from "typeorm";
import { UserRepository } from "src/domain/repositories/user.repository";

export class UserRepositorySQL implements UserRepository {
    constructor(@InjectRepository(UserModel) private repository: Repository<UserModel>) { }

    async getByEmail(email: string): Promise<User | null> {
        const user = await this.repository.findOne({
            where: { email }
        })
        return user
    }

    async getPassword(id: string): Promise<string | undefined> {
        const user = await this.repository.findOne({
            where: { id },
            select: { password: true }
        })
        return user?.password
    }

    async save(user: User): Promise<void> {
        await this.repository.save(user);
    }

    async getById(id: string): Promise<Omit<User, "password"> | null> {
        const user = await this.repository.findOne({
            where: { id },
            select: { id: true, name: true, email: true }
        })
        return user
    }

}