import { Environment } from '@/shared/config/classes/environment';
import { ENVIRONMENT } from '@/shared/config/enums/environment.enum';
import { OnApplicationShutdown } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

export class MongoConnection {
    private readonly uri = Environment.get(ENVIRONMENT.MONGO_URI);
    private readonly dbName = Environment.get(ENVIRONMENT.MONGO_DB);
    private static instance: MongoConnection;
    private client: MongoClient;
    private db!: Db;

    private constructor() {
        this.client = new MongoClient(this.uri);
    }

    static async getInstance(): Promise<MongoConnection> {
        const uri = Environment.get(ENVIRONMENT.MONGO_URI);
        const dbName = Environment.get(ENVIRONMENT.MONGO_DB);

        if (!uri || !dbName) {
            throw new Error('MongoDB uri and dbName must be provided either as arguments or set on MongoConnection');
        }

        if (!MongoConnection.instance) {
            const connection = new MongoConnection();
            await connection.connect();
            MongoConnection.instance = connection;
        }
        return MongoConnection.instance;
    }

    private async connect(): Promise<void> {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
    }

    getDatabase(): Db {
        return this.db;
    }

    async disconnect(): Promise<void> {
        await this.client.close();
    }
}
