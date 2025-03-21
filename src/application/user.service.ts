import { Inject, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";
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

    async getUserById(id: string): Promise<Omit<User, "password">> {
        const user = await this.repository.getById(id)
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async getUserPassword(id: string): Promise<string | undefined> {
        const password = await this.repository.getPassword(id)
        return password;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.repository.getByEmail(email);
    }

}