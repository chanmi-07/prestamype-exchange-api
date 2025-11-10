import { Controller, Post, Body, HttpCode, HttpStatus} from '@nestjs/common';
import { LoginUseCase } from '@/auth/application/useCases/login.use-case';
import type { CredentialsInterface } from '@/auth/domain/types/credentials.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginUserUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() credentials: CredentialsInterface) {
    return this.loginUserUseCase.execute(credentials);
  }
}
