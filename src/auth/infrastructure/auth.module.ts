import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@/auth/infrastructure/strategies/jwt.strategy";
import { JwtAdapter } from "@/auth/infrastructure/adapters/jwt.adapter";
import { AuthController } from "@/auth/infrastructure/auth.controller";
import { LoginUseCase } from "@/auth/application/useCases/login.use-case";
import { UserModule } from "@/user/infrastructure/user.module";
import { BcryptHasherService } from "@/shared/security/services/bcryptHasher.service";
import { UserRepository } from "@/user/domain/user.repository";

@Module({
    imports: [
        ConfigModule,
        UserModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [AuthController],
    providers: [
        JwtStrategy,
        BcryptHasherService,
        {
            provide: 'JwtServicePort',
            useClass: JwtAdapter
        }
        ,
        {
            provide: LoginUseCase,
            useFactory: (repo: UserRepository, bcrypt: BcryptHasherService, jwtPort: any) => new LoginUseCase(repo, bcrypt, jwtPort),
            inject: ['UserRepository', BcryptHasherService, 'JwtServicePort']
        }
    ],
    exports: ['JwtServicePort'],
})
export class AuthModule {
    constructor() {
    console.log('✅ AuthModule initialized');
  }
}