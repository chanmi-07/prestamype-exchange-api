import { Module } from '@nestjs/common';
import { UserModule } from '@/user/infrastructure/user.module';
import { DatabaseModule } from '@/mongodb/database.module';
import { AuthModule } from '@/auth/infrastructure/auth.module';
import { ExchangeModule } from '@/exchange/infrastructure/exchange.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule, ExchangeModule],
})
export class AppModule {}
