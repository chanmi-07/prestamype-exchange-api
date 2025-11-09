import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserMongoRepository } from './userMongo.repository';
import { UserCreate } from '@/user/application/userCreate';
import { UserRepository } from '@/user/domain/user.repository';
import { UserGetAll } from '@/user/application/userGetAll';

@Module({
  controllers: [UserController],
  providers: [
    // Provide the repository using a token so it can satisfy the domain contract
    { provide: 'UserRepository', useClass: UserMongoRepository },
    // Provide the application service and inject the repository token
    {
      provide: UserCreate,
      useFactory: (repo: UserRepository) => new UserCreate(repo),
      inject: ['UserRepository'],
    },
    {
      provide: UserGetAll,
      useFactory: (repo: UserRepository) => new UserGetAll(repo),
      inject: ['UserRepository'],
    },
  ],
  exports: [UserCreate, UserGetAll],
})
export class UserModule {}
