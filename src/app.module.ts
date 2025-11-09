import { Module } from '@nestjs/common';
import { UserModule } from '@/user/infrastructure/user.module';
import { DatabaseModule } from '@/mongodb/database.module';

@Module({
  imports: [DatabaseModule, UserModule],
})
export class AppModule {}
