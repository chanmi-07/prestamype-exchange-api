import { UserRepository } from "@/user/domain/user.repository";
import { UserInterface } from "@/user/domain/types/user.interface";

export class UserGetAll {
    constructor(private readonly userRepository: UserRepository) {}

    async execute(): Promise<UserInterface[]> {
        return await this.userRepository.findAllUsers();
    }
}