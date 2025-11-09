import { CredentialsInterface } from "@/auth/domain/types/credentials.interface";
import { BcryptHasherService } from "@/shared/security/services/bcryptHasher.service";
import { UserRepository } from "@/user/domain/user.repository";
import { JwtServicePort } from "@/auth/application/ports/JwtService.port";

export class LoginUseCase {
    constructor(
        private userRepository: UserRepository,
        private bcryptHasherService: BcryptHasherService,
        private readonly jwtService: JwtServicePort,
    ) {}
    async execute(credentials: CredentialsInterface) {
        const user = await this.userRepository.findByEmail(credentials.email);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await this.bcryptHasherService.comparePasswords(
            credentials.password,
            user.password
        );
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const payload = {
            sub: user._id,
            email: user.email,
            name: user.firstName,
        }

        const accessToken = await this.jwtService.sign(payload, { expiresIn: '1h' });

        return { accessToken };
    }
}