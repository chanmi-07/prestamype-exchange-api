/**
 * Use Case: Create a new user
 */
import { UserRepository } from "@/user/domain/user.repository";
import { UserInterface } from "@/user/domain/types/user.interface";
import { WelcomeMailerService } from "@/shared/mailer/services/welcomeMailer.service";
import { User } from "@/user/domain/user.entity";
import { BcryptHasherService } from "@/shared/security/services/bcryptHasher.service";

export class UserCreate {
    constructor(private userRepository: UserRepository) {}

    async execute(userData: UserInterface): Promise<UserInterface> {
        const bcryptHasherService = new BcryptHasherService();
        const hashedPassword = await bcryptHasherService.hashPassword(userData.password)
        userData.password = hashedPassword;
        const user = await this.userRepository.createUser(userData);
        if (!user) {
            throw new Error('User creation failed');
        }

        const newUser = new User(user);

        // Send welcome email
        const mailerData = {
            firstName: newUser.getFirstName(),
            email: newUser.getEmail()
        };
        const emailService = new WelcomeMailerService(mailerData);
        emailService.sendWelcomeEmail();
        return user;
    }
}