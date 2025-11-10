import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { UserCreate } from '@/user/application/userCreate';
import type { UserInterface } from '@/user/domain/types/user.interface';
import { CreateUserDto } from '../application/dto/createUser.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userCreate: UserCreate
) {}
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateUserDto): Promise<UserInterface> {
    return await this.userCreate.execute(payload);
  }
}
