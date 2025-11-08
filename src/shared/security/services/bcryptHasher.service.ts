/**
 * BcryptHasherService
 * Implements PasswordHasher port using bcrypt for hashing and comparing passwords
 */
import { PasswordHasher } from "@/shared/security/ports/passwordHasher.port";
import * as bcrypt from 'bcrypt';


export class BcryptHasherService implements PasswordHasher {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async comparePasswords(password: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(password, hashed);
    }
}