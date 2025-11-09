/**
 * Abstract class for MongoDB operations.
 * Provides a base for specific collection operations.
 */
import { Db, MongoClient } from "mongodb";
import { COLLECTION } from "@/mongodb/enums/collection.enum";

export abstract class MongoOperation<T> {
    protected db: Db;
    protected collection: COLLECTION;
    private client: MongoClient

    constructor(collection: COLLECTION) {
        this.collection = collection;
        this.db = this.client.db();
    }
}