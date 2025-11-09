import { Db, MongoClient } from "mongodb";

export abstract class MongoOperation<T> {
    protected db: Db;
    protected collection: string;

    constructor(collection: string, private client: MongoClient) {
        this.collection = collection;
        this.db = this.client.db();
    }
}