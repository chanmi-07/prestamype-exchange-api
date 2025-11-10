import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { UserCreate } from '@/user/application/userCreate';
import type { UserInterface } from '@/user/domain/types/user.interface';

@Controller('users')
export class UserController {
  constructor(
    private readonly userCreate: UserCreate
) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: UserInterface): Promise<UserInterface> {
    return await this.userCreate.execute(payload);
  }
}
