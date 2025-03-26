import { BadRequestException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "src/domain/repositories/user.repository";
import { User } from "src/domain/user";
import { v4 } from "uuid";

@Injectable()
export class UserService {
    constructor(@Inject("repository") private repository: UserRepository) { }

    async saveUser(user: Omit<User, "id">): Promise<void> {
        if(!user.name || !user.email || !user.password) {
            throw new BadRequestException("All fields (name, email, password) are required.")
        }
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
        if (!password) {
            throw new NotFoundException('User not found');
        }
        return password;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.repository.getByEmail(email);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

}