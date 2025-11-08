/**
 * PasswordHasher port interface
 * Defines methods for hashing and comparing passwords
 */
export interface PasswordHasher {
    hashPassword(password: string): Promise<string>;
    comparePasswords(password: string, hashed: string): Promise<boolean>;
}