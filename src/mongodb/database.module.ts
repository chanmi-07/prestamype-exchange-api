import { Global, Module } from '@nestjs/common';
import { MongoConnection } from '@/mongodb/services/mongodb.connection.service';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE',
      useFactory: async () => {
        const conn = await MongoConnection.getInstance();
        return conn.getDatabase();
      },
    },
  ],
  exports: ['DATABASE'],
})
export class DatabaseModule {}
