/**
 * Use case to find a user by their email address.
 */
import { UserRepository } from "@/user/domain/user.repository";

export class UserFindByEMail {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string) {
        return this.userRepository.findByEmail(email);
    }
}