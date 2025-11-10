import { UserInterface } from "@/user/domain/types/user.interface";
import { CreateUserDto } from "@/user/application/dto/createUser.dto";

export interface UserRepository {
    createUser(userData: CreateUserDto): Promise<UserInterface>;
    findAllUsers(): Promise<UserInterface[]>;
    findByEmail(email: string): Promise<UserInterface | null>;
}