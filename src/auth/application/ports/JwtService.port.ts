import { JwtPayloadInterface } from "@/auth/domain/types/credentials.interface";
import { JwtSignOptions } from "@nestjs/jwt";

export interface JwtServicePort {
    sign(payload: JwtPayloadInterface, options?: JwtSignOptions): Promise<string>;
    verify<T extends object = JwtPayloadInterface>(token: string): Promise<T>;
    decode<T = JwtPayloadInterface>(token: string): T;
}