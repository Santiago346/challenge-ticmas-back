import { User } from "../user"

export interface UserRepository {

    save(user: User): Promise<void>

    getById(id: string): Promise<Omit<User, "password"> | null>

    getPassword(id: string): Promise<string | undefined>;

    getAllUser(): Promise<User[]>

    getByEmail(email: string): Promise<User | null>

}