/**
 * Abstract class for MongoDB operations.
 * Provides a base for specific collection operations.
 */
import { Db } from "mongodb";
import { COLLECTION } from "@/mongodb/enums/collection.enum";
import { MongoConnection } from "@/mongodb/services/mongodb.connection.service";

export abstract class MongoOperation<T> {
    protected db!: Db;
    protected collection: COLLECTION;

    constructor(collection: COLLECTION) {
        this.collection = collection;

        // Initialize the shared Db instance using the MongoConnection singleton.
        // We intentionally don't await here to keep the constructor synchronous;
        // operations should still call `getDb()` which will return the db if
        // already initialized or await the singleton when needed.
        MongoConnection.getInstance()
            .then(conn => {
                this.db = conn.getDatabase();
            })
            .catch(err => {
                // Log initialization errors; operations will still surface errors if used before ready.
                // Keep silent here to avoid throwing during class construction.
                console.error('Failed to initialize MongoOperation db in constructor:', err);
            });
    }

    protected async getDb(): Promise<Db> {
        if (this.db) return this.db;
        const conn = await MongoConnection.getInstance();
        this.db = conn.getDatabase();
        return this.db;
    }
}