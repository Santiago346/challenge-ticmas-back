import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserRepository } from "src/domain/repositories/user.repository";
import { User } from "src/domain/user";

class UserRepositoryClass implements UserRepository {
    private users: User[] = [
        {
            id: "12345",
            name: "Ejemplo",
            email: "ejemplo@gmail.com",
            password: "1234"
        },
        {
            id: "12",
            name: "Ejemplo2",
            email: "ejemplo2@gmail.com",
            password: "ejemplo2"
        }
    ];

    async save(user: User): Promise<void> {
        this.users.push(user);
        return Promise.resolve();
    }

    async getById(id: string): Promise<Omit<User, "password"> | null> {
        const user = this.users.find(user => user.id === id);
        if (!user) return null;
        const { password, ...userWithoutPassword } = user;
        return Promise.resolve(userWithoutPassword);
    }

    async getPassword(id: string): Promise<string | undefined> {
        const user = this.users.find(user => user.id === id);
        const password = user?.password;
        return Promise.resolve(password)
    }

    async getByEmail(email: string): Promise<User | null> {
        const user = this.users.find(user => user.email === email);
        return Promise.resolve(user ?? null);
    }
}

const repository = new UserRepositoryClass();


describe('UserService', () => {
    let userService: UserService;

    beforeEach(async () => {
        userService = new UserService(repository)
    })

    it('should return a user', async () => {
        const id: string = "12"
        const userSelected: Omit<User, "password"> = {
            id: "12",
            name: "Ejemplo2",
            email: "ejemplo2@gmail.com",
        }
        const user = await userService.getUserById(id);
        expect(user).toStrictEqual(userSelected)
    })

    it('should not return a user and throw a NotFoundException error', async () => {
        const id: string = "123456"
        await expect(userService.getUserById(id)).rejects.toThrow(new NotFoundException('User not found'));
    })

    it('sholud find a user and return the password of him', async () => {
        const id = "12";
        const password = await userService.getUserPassword(id);
        expect(password).toBe("ejemplo2");
    })

    it('sholud not find a user and throw NotFoundException', async () => {
        const id: string = "123456"
        await expect(userService.getUserPassword(id)).rejects.toThrow(new NotFoundException('User not found'));
    })

    it('should return a user', async () => {
        const email = "ejemplo@gmail.com";
        const userSelected = {
            id: "12345",
            name: "Ejemplo",
            email: "ejemplo@gmail.com",
            password: "1234"
        }
        const user = await userService.getUserByEmail(email)
        expect(user).toStrictEqual(userSelected);
    })

    it('should not return a user and throw a NotFoundException error', async () => {
        const email: string = "ejemplo3@gmail.com"
        await expect(userService.getUserByEmail(email)).rejects.toThrow(new NotFoundException('User not found'));
    })

    it('should add user', async () => {
        const user: User = {
            id: "4567",
            name: "Prueba",
            email: "prueba@gmail.com",
            password: "1234"
        };
        await userService.saveUser(user);
        const savedUser = await userService.getUserByEmail(user.email);
        expect(savedUser).toEqual(user); 
    })

    it('should not let user be added without any required fields and throw BadRequestException ', async () => {
        const user: User= {
            id: "45678",
            name: "Prueba2",
            email: "prueba2@gmail.com",
            password: ""
        }
        await expect(userService.saveUser(user)).rejects.toThrow(new BadRequestException("All fields (name, email, password) are required."));
    })

})
