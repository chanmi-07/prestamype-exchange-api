import { JwtServicePort } from "@/auth/application/ports/JwtService.port";
import { JwtPayloadInterface } from "@/auth/domain/types/credentials.interface";
import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";

@Injectable()
export class JwtAdapter implements JwtServicePort {
    constructor(private readonly jwtService: JwtService) {}
    async sign(payload: JwtPayloadInterface, options?: JwtSignOptions): Promise<string> {
        return this.jwtService.signAsync(payload, options);
    }

    async verify<T extends object = JwtPayloadInterface>(token: string): Promise<T> {
        // delegate verification to Nest's JwtService
        return this.jwtService.verifyAsync<T>(token);
    }

    decode<T = JwtPayloadInterface>(token: string): T {
        // jwtService.decode returns null | object | string; cast to T for the port
        return this.jwtService.decode(token) as unknown as T;
    }
}