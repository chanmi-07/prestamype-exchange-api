import { UserInterface } from "@/user/domain/types/user.interface";

export interface UserRepository {
    createUser(userData: UserInterface): Promise<UserInterface>;
    findAllUsers(): Promise<UserInterface[]>;
    findByEmail(email: string): Promise<UserInterface | null>;
}